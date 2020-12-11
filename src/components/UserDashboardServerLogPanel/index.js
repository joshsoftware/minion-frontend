import React, { useState, useEffect } from 'react'

import { Card } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'

import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableColumnResizing,
  TableFixedColumns
} from '@devexpress/dx-react-grid-material-ui'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'

import LogService from '../../services/log.service'

const UserDashboardServerLogPanel = props => {
  const useStyles = makeStyles({
    root: {
      width: '100%'
    }
  })

  const BorderLinearProgress = withStyles(theme => ({
    colorPrimary: {
      backgroundColor: '#f4f5fd'
    },
    dashedColorPrimary: {
      backgroundColor: '#f4f5fd'
    },
    bar: {
      backgroundColor: '#f4f5fd'
    }
  }))(LinearProgress)

  const progressClasses = useStyles()
  const [loading, setLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState({})
  const [logData, setLogData] = useState({
    logs: [],
    lastLog: null,
    rows: []
  })
  const [columns] = useState([
    { name: 'service', title: 'Service' },
    { name: 'message', title: 'Message' },
    { name: 'timestamp', title: 'Timestamp' }
  ])
  const [tableColumnExtensions] = useState([
    { columnName: 'message', wordWrapEnabled: true }
  ])
  const [defaultColumnWidths] = useState([
    { columnName: 'service', width: 90 },
    { columnName: 'timestamp', width: 180 },
    { columnName: 'message', width: 'auto' }
  ])
  const [columnLimits] = useState([
    { columnName: 'service', minWidth: 90, maxWidth: 150 },
    { columnName: 'timestamp', minWidth: 140, maxWidth: 200 },
    { columnName: 'message', minWidth: 300, maxWidth: 3000 }
  ])
  const [leftColumns] = useState(['service'])
  const [rightColumns] = useState(['timestamp'])
  const [pollFlag, setPollFlag] = useState(null)
  const [timerFlag, setTimerFlag] = useState(null)
  const pollScalingBase = 1
  const [pollIntervalScalingFactor, setPollIntervalScalingFactor] = useState(
    pollScalingBase
  )
  const [progress, setProgress] = useState(0)
  const [buffer, setBuffer] = useState(0)
  const [intervalProgressId, setIntervalProgressId] = useState(0)
  const [pollTimeoutId, setPollTimeoutId] = useState(0)
  const [
    intervalProgressCounterTarget,
    setIntervalProgressCounterTarget
  ] = useState([0, 0])
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now())

  const criteriaType = crt => {
    const ary =
      crt ||
      props.criteria.filter(
        item =>
          item.criteria == 'service' ||
          item.criteria == 'fulltext' ||
          item.criteria == 'keyword'
      )
    return ary && ary.length > 0 ? ary[0].value : null
  }

  // Determine the polling interval to use to check for new logs
  // by analyzing recent message intervals and using that to guess
  // how long it is reasonable to wait for new logs.
  const longSampleExponent = 2 / 3.0
  const midSampleExponent = 0.5
  const scalingExponent = 0.8
  const shortSampleLimit = 4
  const pollInterval = () => {
    let interval = 60000
    let short_period_interval = interval
    let mid_period_interval = interval
    let long_period_interval = interval
    if (logData.logs.length > shortSampleLimit) {
      short_period_interval = intervalSample(
        logData.logs.slice(0, shortSampleLimit).map(item => {
          return item[4]
        })
      )
    }

    if (Math.pow(logData.logs.length, midSampleExponent) > shortSampleLimit) {
      mid_period_interval = intervalSample(
        logData.logs
          .slice(
            0,
            1 + Math.trunc(Math.pow(logData.logs.length, midSampleExponent))
          )
          .map(item => {
            return item[4]
          })
      )
    }

    if (Math.pow(logData.logs.length, longSampleExponent) > shortSampleLimit) {
      long_period_interval = intervalSample(
        logData.logs
          .slice(
            0,
            1 + Math.trunc(Math.pow(logData.logs.length, longSampleExponent))
          )
          .map(item => {
            return item[4]
          })
      )
    }

    return [
      short_period_interval,
      mid_period_interval,
      long_period_interval
    ].sort((a, b) => a - b)[0]
  }

  const intervalSample = timestamps => {
    if (timestamps.length < 2) {
      console.log('timestamps length < 2')
      return null
    }

    timestamps.unshift(Date.now()/1000) // Estimate polling interval from now.

    const intervals = []
    for (let idx = 0; idx < timestamps.length - 1; idx++) {
      const now = timestamps[idx]
      const earlier = timestamps[idx + 1]
      const diff = now - earlier
      if (diff < 1) {
        intervals.push(1)
      } else {
        intervals.push(now - earlier)
      }
    }

    const base_interval =
      intervals.reduce((a, b) => a + b, 0) / intervals.length
    const scaled_interval =
      Math.pow(base_interval, scalingExponent) *
      Math.log10(10 * Math.pow(1.1, pollIntervalScalingFactor))
    return scaled_interval
  }

  const styles = theme => ({
    tableStriped: {
      '& tbody tr:nth-of-type(odd)': {
        backgroundColor: fade(theme.palette.primary.main, 0.15)
      }
    }
  })

  const TableComponentBase = ({ classes, ...restProps }) => (
    <VirtualTable.Table {...restProps} className={classes.tableStriped} />
  )

  const TableComponent = withStyles(styles, { name: 'TableComponent' })(
    TableComponentBase
  )

  const progressRef = React.useRef(() => {})
  useEffect(() => {
    progressRef.current = () => {
      const now = Date.now()
      const percent =
        ((now - intervalProgressCounterTarget[0]) /
          (intervalProgressCounterTarget[1] -
            intervalProgressCounterTarget[0])) *
        100
      setBuffer(percent)
      setProgress(percent)
    }
  })

  useEffect(() => {
    setLoading(true)
  }, [props.criteria, props.criteriaTrigger, refreshTrigger])

  useEffect(() => {
    const getLogs = async () => {
      const data = await LogService.get(props.server, props.criteria)
      await setLogData({
        logs: data && data.data,
        lastLog: data && data.data[0],
        rows: data.data.map(log => {
          return {
            service: log[1],
            timestamp: log[3],
            message: log[2]
          }
        })
      })

      setTimerFlag(Date.now())
      setLoading(false)
    }

    if (criteriaType()) {
      intervalProgressId && clearInterval(intervalProgressId)
      pollTimeoutId && clearTimeout(pollTimeoutId)
      setIntervalProgressCounterTarget([0, 0])
      getLogs()
    }
  }, [props.criteria, props.criteriaTrigger, refreshTrigger])

  // Triggered via pollFlag
  useEffect(() => {
    const getLogs = async () => {
      const data = await LogService.get(
        props.server,
        props.criteria,
        [],
        logData.lastLog[0]
      )

      if (data.data && data.data.length > 0) {
        const newLogs = data.data.concat(
          logData.logs.slice(0, logData.logs.length - data.data.length)
        )

        setPollIntervalScalingFactor(pollScalingBase)
        await setLogData({
          logs: newLogs,
          lastLog: newLogs[0],
          rows: newLogs.map(log => {
            return {
              service: log[1],
              timestamp: log[3],
              message: log[2]
            }
          })
        })
      } else {
        setPollIntervalScalingFactor(pollIntervalScalingFactor + 1)
      }
      setTimerFlag(Date.now())
    }

    if (pollFlag && logData.logs.length > 0 && logData.lastLog) {
      setIntervalProgressCounterTarget([0, 0])
      intervalProgressId && clearInterval(intervalProgressId)
      getLogs()
    }
  }, [pollFlag])

  // Triggered via timerFlag
  useEffect(() => {
    if (!timerFlag) {
      console.log('Bailing on the initial timer block run')
      return
    }

    const interval = pollInterval()
    setBuffer(0)
    setProgress(0)
    setIntervalProgressCounterTarget([Date.now(), Date.now() + interval * 1000])
    console.log(`Waiting ${interval} seconds to poll for new data.`)
    const intervalId = setTimeout(() => {
      progressRef.current()
      setPollFlag(Date.now())
    }, interval * 1000)
    setPollTimeoutId(intervalId)
    return () => clearInterval(intervalId)
  }, [timerFlag])

  useEffect(() => {
    if (intervalProgressCounterTarget[1]) {
      const now_id = Date.now()
      // Initialize the counter
      let progressCounterTimer = setInterval(() => {
        progressRef.current()
      }, 333)

      setIntervalProgressId(progressCounterTimer)
      return () => clearInterval(progressCounterTimer)
    }
  }, [intervalProgressCounterTarget])

  const triggerRefresh = () => {
    setRefreshTrigger(Date.now())
  }

  return (
    <>
      {!criteriaType() && (
        <div>Please select log options to search and filter by. : </div>
      )}
      {criteriaType() && loading && (
        <Card className='card-box mb-4'>
          <div className='card-header py-3'>
            <div
              className='card-header--title font-size-lg'
              style={{ height: '300px' }}>
              <span className='ribbon-horizontal ribbon-horizontal--info'>
                <span>Logs are Loading...</span>
              </span>
              <Skeleton
                style={{ height: '300px' }}
                variant='rect'
                animation='wave'></Skeleton>
            </div>
          </div>
        </Card>
      )}
      {criteriaType() && !loading && logData.rows && logData.rows.length == 0 && (
        <Card className='card-box mb-4'>
          <div className='card-header py-3'>
            <div
              className='card-header--title font-size-lg'
              style={{ height: '300px' }}>
              <span className='ribbon-horizontal ribbon-horizontal--warning'>
                <span>No Logs are Available for that Query</span>
              </span>
            </div>
          </div>
        </Card>
      )}
      {criteriaType() && !loading && logData.rows && logData.rows.length > 0 && (
        <Paper>
          <div>
            <IconButton aria-label='refresh-logs'>
              <RefreshIcon onClick={triggerRefresh} />
            </IconButton>
          </div>
          <div className={progressClasses.root}>
            <Box display='flex' alignItems='center'>
              <Box width='100%' mr={1}>
                <BorderLinearProgress
                  variant='buffer'
                  value={progress}
                  valueBuffer={buffer}
                />
              </Box>
              <Box minWidth={85}>
                <Typography variant='body2' color='textSecondary'>
                  {intervalProgressCounterTarget[1]
                    ? `${Math.round(
                        (intervalProgressCounterTarget[1] -
                          intervalProgressCounterTarget[0]) /
                          1000
                      )} seconds`
                    : `Polling...`}
                </Typography>
              </Box>
            </Box>
          </div>
          <Grid
            rows={logData.rows}
            columns={columns}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}>
            <VirtualTable
              tableComponent={TableComponent}
              columnExtensions={tableColumnExtensions}
            />

            <TableColumnResizing
              defaultColumnWidths={defaultColumnWidths}
              columnExtensions={columnLimits}
              resizingMode='nextColumn'
            />
            <TableHeaderRow />
            <TableFixedColumns
              leftColumns={leftColumns}
              rightColumns={rightColumns}
            />
          </Grid>
        </Paper>
      )}
    </>
  )
}

export default UserDashboardServerLogPanel
