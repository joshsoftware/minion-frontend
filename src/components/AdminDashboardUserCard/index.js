import React, { useState, useEffect } from 'react'

import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core'

import UserService from '../../services/user.service'
import Join from 'lodash/join'
import DialogUser from '../DialogUser'

const AdminDashboardUserCard = () => {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    const getUsers = async () => {
      const u = await UserService.users()
      setUsers(u)
    }

    getUsers()
  }, [])

  const handleAddButton = () => {
    setUuid(null)
    toggleUserDialog()
  }
  const handleClick = event => {
    console.log(event.target.dataset.user)
    setUuid(event.target.dataset.user)
    toggleUserDialog()
  }

  const [modalUserDialog, setModalUserDialog] = useState(false)
  const toggleUserDialog = () => {
    setModalUserDialog(!modalUserDialog)
  }
  const [uuid, setUuid] = useState(false)

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card className='card-box mb-4'>
          <div className='card-header py-3'>
            <div className='card-header--title font-size-lg'>
              <h4 className='font-size-lg mb-0 py-2 font-weight-bold'>Users</h4>
            </div>
            <div className='card-header--actions'>
              <Button
                onClick={handleAddButton}
                size='small'
                variant='outlined'
                color='secondary'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'plus-circle']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Add User</span>
              </Button>
              <DialogUser
                open={modalUserDialog}
                uuid={uuid}
                toggle={toggleUserDialog}
              />
            </div>
          </div>
          <CardContent className='p-3'>
            {users &&
              users.map(u => (
                <React.Fragment key={u.uuid}>
                  <div
                    data-user={u.uuid}
                    onClick={handleClick}
                    className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <a
                            href='#/'
                            onClick={e => e.preventDefault()}
                            className='font-weight-bold text-black'
                            title='...'>
                            {u.name}
                          </a>
                          <span className='text-black-50 d-block'>
                            {u.organizations &&
                              Join(
                                u.organizations.map(org => org.name).sort(),
                                ', '
                              )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <a
                            href='#/'
                            onClick={e => e.preventDefault()}
                            className='font-weight-bold text-black'
                            title='...'>
                            {u.email}
                          </a>
                          <span className='text-black-50 d-block'>
                            {parsePhoneNumberFromString(
                              u.mobile_number
                            ).formatInternational()}
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

export default AdminDashboardUserCard
