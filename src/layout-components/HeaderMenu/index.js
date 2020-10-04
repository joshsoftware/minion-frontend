import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Grid,
  Typography,
  Popover,
  Button,
  List,
  ListItem,
} from '@material-ui/core'

import { Settings, Briefcase, Users, Layers } from 'react-feather'

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'mega-menu-popover' : undefined

  const [anchorElMenu, setAnchorElMenu] = React.useState(null)

  const handleClickMenu = event => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  // TODO: Create a helper functions library so that this is not repeated
  // in multiple places in the codebase.
  const in_admin_dashboard = () => {
    let match_re = /DashboardAdmin/i
    return match_re.exec(window.location.pathname)
  }

  return (
    <Fragment>
      <div className='app-header-menu'>
        <Button
          size='medium'
          color='inherit'
          onClick={handleClick}
          className='btn-inverse font-size-xs mx-2'>
          Options
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}>
          <div className='popover-custom-xxl p-2'>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div className='divider-v divider-v-lg' />
                <List className='nav-neutral-first flex-column p-2'>
                  <Typography
                    color='primary'
                    component='div'
                    className='pb-2 text-capitalize font-size-lg font-weight-bold'>
                    <span>Dashboards</span>
                  </Typography>
                  {in_admin_dashboard() && (
                    <ListItem
                      button
                      className='rounded-sm'
                      component={Link}
                      to='/DashboardAdmin'>
                      <div className='nav-link-icon w-auto mr-2'>
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className='font-size-xs opacity-3'
                        />
                      </div>
                      <span>Admin Dashboard</span>
                    </ListItem>
                  )}
                  <ListItem
                    button
                    className='rounded-sm'
                    component={Link}
                    to='/DashboardUser'>
                    <div className='nav-link-icon w-auto mr-2'>
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className='font-size-xs opacity-3'
                      />
                    </div>
                    <span>User Dashboard</span>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={4}>
                <div className='divider-v divider-v-lg' />
                <List className='nav-neutral-success flex-column p-2'>
                  <Typography
                    color='primary'
                    className='pb-2 text-capitalize font-size-lg font-weight-bold'>
                    <span>More Stuff</span>
                  </Typography>
                  <ListItem
                    button
                    className='rounded-sm'
                    component={Link}
                    to='/ApplicationsCalendar'>
                    <div className='nav-link-icon w-auto mr-2'>
                      <FontAwesomeIcon
                        icon={['fas', 'chevron-right']}
                        className='font-size-xs opacity-3'
                      />
                    </div>
                    <span>TBD</span>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </div>
        </Popover>
      </div>
    </Fragment>
  )
}

export default HeaderMenu
