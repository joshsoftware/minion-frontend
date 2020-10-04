import React, { useState, useEffect } from 'react'

import clsx from 'clsx'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Divider,
  IconButton,
  Box,
  Menu,
  List,
  ListItem
} from '@material-ui/core'

import { connect } from 'react-redux'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import LogService from '../../services/log.service'
import TelemetryService from '../../services/telemetry.service'

const SidebarUserbox = props => {
  const { sidebarToggle, sidebarHover } = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const openUserMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [logCount, setLogCount] = useState(null)
  const [telemetryCount, setTelemetryCount] = useState(null)

  useEffect(() => {
    const getLogCount = async () => {
      const count = await LogService.count()
      console.log(count)
      setLogCount(count)
    }

    const interval = setInterval(() => {
      getLogCount()
    }, 15000)

    getLogCount()

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const getTelemetryCount = async () => {
      const count = await TelemetryService.count()
      console.log(count)
      setTelemetryCount(count)
    }

    const interval = setInterval(() => {
      getTelemetryCount()
    }, 15033)

    getTelemetryCount()

    return () => clearInterval(interval)
  }, [])

  const in_admin_dashboard = () => {
    let match_re = /DashboardAdmin/i
    return match_re.exec(window.location.pathname)
  }

  return (
    <>
      <Box
        className={clsx('app-sidebar-userbox', {
          'app-sidebar-userbox--collapsed': sidebarToggle && !sidebarHover
        })}>
        <IconButton
          aria-controls='userMenu'
          onClick={openUserMenu}
          className='app-sidebar-userbox-btn'
          size='small'>
          <MoreVertIcon fontSize='inherit' />
        </IconButton>
        <Menu
          id='userMenu'
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          classes={{ list: 'p-0' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <div className='dropdown-menu-right dropdown-menu-xl p-0'>
            <div className='bg-composed-wrapper bg-vicious-stance mt-0'>
              <div className='bg-composed-wrapper--image bg-composed-img-5' />
              <div className='bg-composed-wrapper--content text-light text-center p-4'>
                <h5 className='mb-1'>My Servers Summary</h5>
              </div>
            </div>
            <div className='scroll-area-sm shadow-overflow'>
              <PerfectScrollbar>
                <List className='flex-column'>
                  <ListItem button>
                    <div className='nav-link-icon opacity-6'>
                      <FontAwesomeIcon icon={['fas', 'check']} />
                    </div>
                    <span>Servers Operating Normally</span>
                    <span className='ml-auto badge badge-success'>3</span>
                  </ListItem>
                  <ListItem button>
                    <div className='nav-link-icon opacity-6'>
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </div>
                    <span>Servers In Alert Status</span>
                    <span className='ml-auto badge badge-info'>1</span>
                  </ListItem>
                  <ListItem button>
                    <div className='nav-link-icon opacity-6'>
                      <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
                    </div>
                    <span>Offline</span>
                    <span className='ml-auto badge badge-warning'>0</span>
                  </ListItem>
                </List>
	  	<Divider />
              </PerfectScrollbar>
            </div>
          </div>
        </Menu>

        <Box className='app-sidebar-userbox-name'>
          <div className='text-black font-weight-bold text-primary font-size-lg pr-2'>
            Data Summary
          </div>
          <div>&nbsp;</div>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex'>
              <div className='d-flex align-items-center'>
                <div>Total Log Records</div>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='font-weight-bold text-success font-size-lg pr-2'>
                {logCount ? logCount : 0}
              </div>
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex'>
              <div className='d-flex align-items-center'>
                <div>Total Telemetry Records</div>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='font-weight-bold text-success font-size-lg pr-2'>
                {telemetryCount ? telemetryCount : 0}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  )
}

const mapStateToProps = state => ({
  sidebarToggle: state.ThemeOptions.sidebarToggle,
  sidebarHover: state.ThemeOptions.sidebarHover
})

export default connect(mapStateToProps)(SidebarUserbox)
