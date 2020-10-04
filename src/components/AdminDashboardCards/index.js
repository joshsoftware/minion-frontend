import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Grid
} from '@material-ui/core'

import AdminDashboardOrganizationCard from '../AdminDashboardOrganizationCard'
import AdminDashboardUserCard from '../AdminDashboardUserCard'

import CountUp from 'react-countup'

import { Settings, Briefcase, Users, Layers } from 'react-feather'

const AdminDashboardCards = () => {
  return (
    <>
      <Grid container spacing={4}>
        <AdminDashboardOrganizationCard />
        <AdminDashboardUserCard />
      </Grid>
    </>
  )
}

export default AdminDashboardCards
