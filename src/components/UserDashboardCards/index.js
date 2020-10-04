import React, { useState } from 'react'

import { Grid } from '@material-ui/core'

import UserDashboardServerCard from '../UserDashboardServerCard'
import UserDashboardServerActionsCard from '../UserDashboardServerActionsCard'
import UserDashboardServerLogsCard from '../UserDashboardServerLogsCard'
import UserDashboardServerTelemetryCard from '../UserDashboardServerTelemetryCard'

const UserDashboardCards = () => {
  const [display, setDisplay] = useState('serverlist')
  const [selected, setSelected] = useState([])
  const [trigger, setTrigger] = useState(null)
  const [serverNames, setServerNames] = useState({})

  const handleSelectedServers = s => {
    setSelected(s)
    setTrigger(Date.now())
  }

  const isSelected = () => {
    return selected.length > 0
  }

  const showServerList = () => {
    setDisplay('serverlist')
  }

  return (
    <>
      <Grid container spacing={4}>
        {display == 'serverlist' && [
          <UserDashboardServerCard handleSelected={handleSelectedServers} />,
          isSelected() && (
            <UserDashboardServerActionsCard
              selectedServers={selected}
              setDisplay={setDisplay}
              setServerNames={setServerNames}
            />
          )
        ]}
        {display == 'logs' && (
          <UserDashboardServerLogsCard
            toggle={showServerList}
            selectedServers={selected}
            serverNames={serverNames}
          />
        )}
        {display == 'telemetry' && (
          <UserDashboardServerTelemetryCard
            toggle={showServerList}
            selectedServers={selected}
            serverNames={serverNames}
          />
        )}
      </Grid>
    </>
  )
}

export default UserDashboardCards
