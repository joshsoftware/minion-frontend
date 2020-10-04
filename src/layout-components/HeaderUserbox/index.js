import React from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Avatar,
  Box,
  Badge,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core'

import userAvatar from '../../assets/images/avatars/user.svg'
import { withStyles } from '@material-ui/core/styles'

import AuthService from '../../services/auth.service'
import Join from 'lodash/join'

const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge)

const HeaderUserbox = () => {
  const user = AuthService.getCurrentUser()
  console.log(user)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const history = useHistory()

  const handleLogout = () => {
    AuthService.logout()
    history.push('/AdminLogin')
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        color='inherit'
        onClick={handleClick}
        className='text-capitalize px-3 text-left btn-inverse d-flex align-items-center'>
        <Box>
          <StyledBadge
            overlap='rectangle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant='standard'>
            <Avatar
              style={{ height: '44px' }}
              variant='rounded'
              sizes='44'
              alt={user.name}
              src={userAvatar}
            />
          </StyledBadge>
        </Box>
        <div className='d-none d-xl-block pl-3'>
          <div className='font-weight-bold pt-2 line-height-1'>{user.name}</div>
        </div>
        <span className='pl-1 pl-xl-3'>
          <FontAwesomeIcon icon={['fas', 'angle-down']} className='opacity-5' />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className='ml-2'>
        <div className='dropdown-menu-right dropdown-menu-lg overflow-hidden p-0'>
          <List className='text-left bg-transparent d-flex align-items-center flex-column pt-0'>
            <Box>
              <StyledBadge
                overlap='rectangle'
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                variant='standard'>
                <Avatar sizes='44' alt={user.name} src={userAvatar} />
              </StyledBadge>
            </Box>
            <div className='pl-3 '>
              <div className='font-weight-bold text-center pt-2 line-height-1'>
                {user.name}
              </div>
              <span className='text-black-50 text-center'>
                {user.organizations &&
                  Join(user.organizations.map(org => org.name).sort(), ', ')}
              </span>
            </div>
            <Divider className='w-100 mt-2' />
            <ListItem onClick={handleLogout} button>
              Logout
            </ListItem>
          </List>
        </div>
      </Menu>
    </>
  )
}

export default HeaderUserbox
