import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Card, CardContent, Divider, Grid } from '@material-ui/core'
import ServerService from '../../services/server.service'

const UserDashboardServerActionsCard = props => {
  const [serverNames, setServerNames] = useState({})

  const toggleLogs = () => {
    props.setDisplay('logs')
  }

  const toggleTelemetry = () => {
    props.setDisplay('telemetry')
  }

  useEffect(() => {
    const get_server_names = async () => {
      const names = await ServerService.names(props.selectedServers)
      setServerNames(names.data)
      props.setServerNames && props.setServerNames(names.data)
    }

    get_server_names()
  }, [props.selectedServers])

  return (
    <>
      <Grid item xs={12} md={5}>
        <Card className='card-box mb-4'>
          <div className='card-header py-3'>
            <div className='card-header--title font-size-lg'>
              <h4 className='font-size-lg mb-0 py-2 font-weight-bold'>
                Server Actions
              </h4>
            </div>
          </div>
          <div className='card-header py-3'>
            <div className='card-header--actions'>
              <Button
                size='small'
                variant='outlined'
                color='secondary'
                style={{ marginRight: '3px' }}>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'cogs']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Settings</span>
              </Button>
              <Button
                onClick={toggleLogs}
                size='small'
                variant='outlined'
                color='secondary'
                style={{ marginRight: '3px' }}>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'database']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Logs</span>
              </Button>
              <Button
                onClick={toggleTelemetry}
                size='small'
                variant='outlined'
                color='secondary'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['far', 'chart-bar']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Telemetry</span>
              </Button>
              <Button
                size='small'
                variant='outlined'
                color='secondary'
                style={{ marginRight: '3px' }}>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'terminal']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Commands</span>
              </Button>
            </div>
          </div>
          <CardContent className='p-3'>
            {props.selectedServers &&
              props.selectedServers.map(s => (
                <React.Fragment key={s}>
                  <div
                    data-user={s}
                    className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <span className='text-black-50 d-block'>
                            {serverNames[s] ? serverNames[s] : s}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider className='my-3' />
                </React.Fragment>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default UserDashboardServerActionsCard
