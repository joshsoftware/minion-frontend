import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Card,
  Checkbox,
  Dialog,
  Divider,
  Grid,
  MenuItem,
  TextField
} from '@material-ui/core'

import OrganizationService from '../../services/organization.service'
import UserService from '../../services/user.service'

import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

const DialogUser = props => {
  const [loaded, setLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [uuid, setUuid] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [administration, setAdministration] = useState('')
  const [userOrganizations, setUserOrganizations] = useState([])
  const [organizations, setOrganizations] = useState(null)

  const setDefaults = () => {
    setEmail('')
    setUuid('')
    setName('')
    setMobile('')
    setUserOrganizations([])
    setAdministration(false)
    setLoaded(false)
  }

  useEffect(() => {
    const getOrganizations = async () => {
      const orgs = await OrganizationService.organizations()
      setOrganizations(orgs)
    }

    getOrganizations()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      console.log(props.uuid)
      console.log(loaded)
      if (props.uuid && !loaded) {
        setLoaded(true)
        const u = await UserService.user(props.uuid)
        console.log('boingy')
        console.log(u)
        setEmail(u.email)
        setUuid(u.uuid)
        setName(u.name)
        setMobile(u.mobile_number)
        setUserOrganizations(u.organizations)
        setAdministration(u.administration)
      }
    }

    getUser()
  })

  const handleOrganizationChange = event => {
    console.log('event')
    console.log(event.target.value)
    console.log('current orgs')
    console.log(userOrganizations)
    let org_hash = {}
    let options = event.target.value
    userOrganizations.forEach(u => {
      console.log(u)
      org_hash[u.uuid] = true
    })
    options.forEach(o => {
      if (org_hash[o]) {
        delete org_hash[o]
      } else {
        org_hash[o] = true
      }
    })
    let new_orgs = Object.keys(org_hash).map(k => {
      return { uuid: k }
    })
    console.log('new orgs')
    console.log(new_orgs)
    setUserOrganizations(new_orgs)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleMobileChange = event => {
    setMobile(event.target.value)
  }

  const handleClose = () => {
    console.log('closing')
    setDefaults()
    props.toggle()
  }
  return (
    <>
      <Dialog
        scroll='body'
        maxWidth='lg'
        open={props.open}
        onClose={handleClose}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Card className='p-4 mb-4'>
              <div className='font-size-lg font-weight-bold'>User</div>
              <Divider className='my-4' />
              <Grid container spacing={6}>
                <Grid item xs={12} lg={6}>
                  <div className='p-3'>
                    <TextField
                      fullWidth
                      disabled
                      className='m-2'
                      id='user-uuid'
                      label='UUID'
                      variant='filled'
                      value={uuid || ''}
                    />
                    <TextField
                      fullWidth
                      className='m-2'
                      id='user-name'
                      label='Full Name'
                      onChange={handleNameChange}
                      value={name || ''}
                    />
                    <TextField
                      fullWidth
                      className='m-2'
                      id='user-phone'
                      label='Phone Number'
                      onChange={handleMobileChange}
                      value={mobile || ''}
                    />
                    <TextField
                      fullWidth
                      className='m-2'
                      id='user-email'
                      label='Email Address'
                      variant='outlined'
                      onChange={handleEmailChange}
                      value={email || ''}
                    />
                    <Checkbox
                      id='user-administration'
                      label='Administrator?'
                      value={administration || false}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <div className='p-3'>
                    <TextField
                      fullWidth
                      variant='outlined'
                      className='m-2'
                      id='user-organizations'
                      select
                      label='Select'
                      onChange={handleOrganizationChange}
                      SelectProps={{
                        multiple: true,
                        value: userOrganizations.map(o => o.uuid),
                        multiliine: true
                      }}
                      helperText="Select User's Organization(s)">
                      {organizations &&
                        organizations.map(organization => (
                          <MenuItem
                            key={organization.uuid}
                            value={organization.uuid}>
                            {organization.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </div>
                </Grid>
              </Grid>
              <Divider className='my-3' />
              <Grid container spacing={6}>
                <Grid item xs={12} lg={9}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} lg={1}>
                  <Button
                    //onClick={toggleUserDialog}
                    size='small'
                    variant='outlined'
                    color='secondary'>
                    <span className='btn-wrapper--icon'>
                      <SaveIcon />
                    </span>
                    <span className='btn-wrapper--label'>Save</span>
                  </Button>
                </Grid>
                <Grid item xs={12} lg={1}>
                  <Button
                    onClick={handleClose}
                    size='small'
                    variant='outlined'
                    color='secondary'>
                    <span className='btn-wrapper--icon'>
                      <CloseIcon />
                    </span>
                    <span className='btn-wrapper--label'>Close</span>
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default DialogUser
