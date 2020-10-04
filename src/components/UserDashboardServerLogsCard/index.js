import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Box,
  Card,
  Divider,
  Grid,
  MenuItem,
  Slider,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core'

import VolumeUp from '@material-ui/icons/VolumeUp'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ComputerIcon from '@material-ui/icons/Computer'
import Filter from 'lodash/filter'
import Reject from 'lodash/reject'
import ForEach from 'lodash/forEach'

import UserDashboardServerLogPanel from '../UserDashboardServerLogPanel'
import LogService from '../../services/log.service'

const ServerIcon = ComputerIcon

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

// ##### PrettySlider Component
// Component for a decorative slider for selecting the number of data points.
const PrettySlider = withStyles({
  root: {
    color: '#08AF7A',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider)

const MaxDataSlider = props => {
  const minData = 10
  const maxData = 4032 // Enough for 5 minute intervals over 2 weeks.
  const [value, setValue] = useState(props.sliderValue || 500)
  const [sliderTimeout, setSliderTimeout] = useState([null])

  const marks = [
    { value: 504 },
    { value: 1008 },
    { value: 1512 },
    { value: 2016 },
    { value: 2520 },
    { value: 3024 },
    { value: 3528 }
  ]
  const handleSliderChange = (event, newValue) => {
    setValue(newValue)

    if (sliderTimeout[0]) clearTimeout(sliderTimeout[0])
    const timer = setTimeout(event => {
      props.setSliderValue && props.setSliderValue(newValue)
    }, 1200)
    sliderTimeout[0] = timer
  }

  // Pass the default value up to whomever may own this slider.
  useEffect(() => {
    props.setSliderValue && props.setSliderValue(value)
  }, [])

  return (
    <>
      <Typography id='input-slider' gutterBottom>
        Maximum # of Log Lines to Retrieve
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <PrettySlider
            value={typeof value === 'number' ? value : minData}
            onChange={handleSliderChange}
            aria-labelledby='input-slider'
            min={minData}
            max={maxData}
            valueLabelDisplay='auto'
            marks={marks}
          />
        </Grid>
      </Grid>
    </>
  )
}
// ##### End of PrettySlider Component

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

const UserDashboardServerLogCard = props => {
  const criteriaLabels = {
    fulltext: {
      order: 1,
      label: 'Fulltext Search',
      var: {
        select: false,
        label: 'Search Phrase',
        helperText: 'Enter the search phrase; and/or/not and prefix (foo*) permitted'
      }
    },
    keyword: {
      order: 2,
      label: 'Keyword Search',
      var: {
        select: false,
        label: 'Search Terms',
        helperText: 'Enter search terms; and/or/not permitted'
      }
    },
    service: {
      order: 3,
      label: 'Limit by Log Service Type',
      var: {
        select: true,
        label: 'Service',
        helperText: 'Select the data type to display'
      }
    },
    after: {
      order: 4,
      label: 'After Date/Time',
      var: {
        type: 'datetime-local',
        label: '',
        helperText: 'Show data after this date/time'
      }
    },
    before: {
      order: 5,
      label: 'Before Date/Time',
      var: {
        type: 'datetime-local',
        label: '',
        helperText: 'Show data before this date/time'
      }
    },
    on: {
      order: 6,
      label: 'On Specific Date/Time',
      var: {
        type: 'date',
        label: '',
        helperText: 'Show data on this specific date/time'
      }
    },
    limit: {
      order: -1,
      label: 'Data Limit',
      var: {}
    }
  }
  ForEach(Object.keys(criteriaLabels), key => {
    criteriaLabels[key].key = key
  })

  const handleClose = () => {
    props.toggle()
  }

  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [criteria, setCriteria] = useState('')
  const handleCriteriaChange = event => {
    setCriteria(event.target.value)
  }

  // Filter value data and helper functions.
  const [filterValue, setFilterValue] = useState('')
  const handleFilterValueChange = event => {
    setFilterValue(event.target.value)
  }
  const filterValueHelperText = () => {
    return `Enter the "${criteria}" value to filter on`
  }
  const validateFilterValue = () => {
    if (filterValue === '') return false
    if (
      isRedundantCriteria(
        criteriaKey({ criteria: criteria, value: filterValue })
      )
    )
      return false
    return true
  }

  // Max logging lines data and helper functions.
  const [maxPoints, setMaxPoints] = useState(500)

  // The list of applied criteria, and related functions.
  const [appliedCriteria, setAppliedCriteria] = useState([])
  const [criteriaTrigger, setCriteriaTrigger] = useState(null)
  const criteriaKey = crt => {
    return `${crt['criteria']}:${crt['value']}`
  }
  const isRedundantCriteria = key => {
    return Filter(appliedCriteria, { key: key }).length > 0
  }
  const saveCriteria = () => {
    const newCriteria = {
      criteria: criteria,
      value: filterValue
    }
    newCriteria['key'] = criteriaKey(newCriteria)

    if (isRedundantCriteria(newCriteria['key'])) {
    } else {
      appliedCriteria.push(newCriteria)
      setAppliedCriteria(appliedCriteria)
      setCriteriaTrigger(Date.now())
      setFilterValue('')
    }
  }
  const handleApplyCriteria = () => {
    saveCriteria()
  }
  // Generate a function to delete the given criteria from the list.
  const deleteCriteria = crt => {
    return () => {
      Reject(appliedCriteria, {
        key: criteriaKey({ criteria: crt.criteria, value: crt.value })
      })

      setAppliedCriteria(
        Reject(appliedCriteria, {
          key: criteriaKey({ criteria: crt.criteria, value: crt.value })
        })
      )
      setCriteriaTrigger(Date.now())
    }
  }

  const replaceCriteria = crt => {
    const new_criteria = appliedCriteria.filter(comp => {
      // TODO: As soon as we support graphing multiple lines, this will have to allow multiple "type" criteria.
      return crt.criteria !== comp.criteria
    })
    new_criteria.push(crt)

    setAppliedCriteria(new_criteria)
    setCriteriaTrigger(Date.now())
  }

  const [services, setServices] = useState([])
  useEffect(() => {
    const getServices = async () => {
      console.log('calling get_unique_services')
      const srvc = await LogService.get_unique_services(
        props.selectedServers
      )
      console.log(srvc)
      setServices(srvc.data)
    }

    getServices()
  }, [])

  const setCriteriaForLimit = limit => {
    setMaxPoints(limit)

    const newCriteria = {
      criteria: 'limit',
      value: limit
    }
    newCriteria['key'] = criteriaKey(newCriteria)

    replaceCriteria(newCriteria)
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card className='card-box mb-4'>
            <div className='card-header py-3'>
              <div className='card-header--title font-size-lg'>
                <h4 className='font-size-lg mb-0 py-2 font-weight-bold'>
                  Server Log Filters
                </h4>
              </div>
            </div>
            <Divider />
            <Box className='rounded card-body mb-4'>
              <div className='card-header--title font-size-lg'>
                Choose Filtration Criteria
              </div>
              <Divider className='my-3' />
              <div className='card-text mb-4'>
                <MaxDataSlider
                  sliderValue={maxPoints}
                  setSliderValue={setCriteriaForLimit}
                />
              </div>
              <Divider className='my-3' />
              <div className='card-text mb-4'>
                <TextField
                  id='outlined-select-options'
                  select
                  label='Log Selection Criteria'
                  value={criteria}
                  onChange={handleCriteriaChange}
                  helperText='Please choose the telemetry data to display'
                  variant='outlined'>
                  {Object.keys(criteriaLabels)
                    .sort(
                      (a, b) =>
                        criteriaLabels[a].order - criteriaLabels[b].order
                    )
                    .filter(key => criteriaLabels[key].order >= 0)
                    .map(key => (
                      <MenuItem
                        key={criteriaLabels[key].key}
                        value={criteriaLabels[key].key}>
                        {criteriaLabels[key].label}
                      </MenuItem>
                    ))}
                </TextField>
                {criteria !== '' && (
                  <TextField
                    fullWidth
                    id='filter-value'
                    label='Value'
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    helperText={filterValueHelperText()}
                    {...criteriaLabels[criteria].var}>
                    {criteria === 'service' &&
                      services.length > 0 &&
                      services
                        .filter(crt => crt.criteria !== 'limit')
                        .map(k => (
                          <MenuItem key={k} value={k}>
                            {k}
                          </MenuItem>
                        ))}
                  </TextField>
                )}
                {validateFilterValue() && (
                  <Box display='flex' justifyContent='center' m={1} p={1}>
                    <Button
                      onClick={handleApplyCriteria}
                      size='large'
                      variant='outlined'
                      color='secondary'>
                      <span className='btn-wrapper--icon'>
                        <FontAwesomeIcon
                          icon={['fas', 'check-double']}
                          className='text-success'
                        />
                      </span>
                      <span className='btn-wrapper--label'>Apply Criteria</span>
                    </Button>
                  </Box>
                )}
              </div>
            </Box>
            <Divider />
            <Box className='rounded card-body mb-4'>
              <div className='card-header--title font-size-lg'>
                Selected Criteria
              </div>
              <Divider />
              {appliedCriteria &&
                appliedCriteria.length > 0 &&
                appliedCriteria.map(crt => (
                  <Button
                    key={crt.key}
                    onClick={deleteCriteria(crt)}
                    size='small'
                    variant='outlined'
                    color='secondary'
                    style={{ marginRight: '3px' }}>
                    <span className='btn-wrapper--icon'>
                      <FontAwesomeIcon
                        icon={['fas', 'times-circle']}
                        className='text-warning'
                      />
                    </span>
                    <span className='btn-wrapper--label'>
                      {criteriaLabels[crt.criteria].label} :{' '}
                      {crt.value ? crt.value : crt.value}
                    </span>
                  </Button>
                ))}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card className='card-box mb-4'>
            <div className='card-header py-3'>
              <div className='card-header--title font-size-lg'>
                <h4 className='font-size-lg mb-0 py-2 font-weight-bold'>
                  Server Logs
                </h4>
              </div>
            </div>
            <div className='card-header py-3'>
              <div className='card-header--actions'>
                <Button
                  onClick={handleClose}
                  size='small'
                  variant='outlined'
                  color='secondary'
                  style={{ marginRight: '3px' }}>
                  <span className='btn-wrapper--icon'>
                    <FontAwesomeIcon
                      icon={['fas', 'times-circle']}
                      className='text-warning'
                    />
                  </span>
                  <span className='btn-wrapper--label'>Close Logs</span>
                </Button>
              </div>
            </div>
          </Card>
          <div className={classes.root}>
            <AppBar position='static' color='default'>
              <Tabs
                value={value}
                onChange={handleChange}
                variant='scrollable'
                scrollButtons='on'
                indicatorColor='primary'
                textColor='primary'
                aria-label='scrollable force tabs example'>
                {props.selectedServers &&
                  props.selectedServers.length > 0 &&
                  props.selectedServers.map(server => (
                    <Tab
                      label={
                        props.serverNames[server]
                          ? props.serverNames[server]
                          : server
                      }
                      key={server}
                      icon={<ServerIcon />}
                      {...a11yProps(0)}
                    />
                  ))}
              </Tabs>
            </AppBar>
            {props.selectedServers &&
              props.selectedServers.length > 0 &&
              props.selectedServers.map((server, index) => (
                <TabPanel key={server} value={value} index={index}>
                  <UserDashboardServerLogPanel
                    server={server}
                    criteria={appliedCriteria}
                    criteriaTrigger={criteriaTrigger}
                    typeLabels={{}}
                  />
                </TabPanel>
              ))}
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default UserDashboardServerLogCard
