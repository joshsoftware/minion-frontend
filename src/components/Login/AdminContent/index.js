import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel
} from '@material-ui/core'

import MuiAlert from '@material-ui/lab/Alert'

import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone'
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone'

import loginImage from '../../../assets/images/illustrations/together.svg'

import AuthService from '../../../services/auth.service'

const AdminContent = props => {
  const history = useHistory()
  const [checked1, setChecked1] = React.useState(true)

  const handleChange1 = event => {
    setChecked1(event.target.checked)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const Alert = props => {
    return <MuiAlert elevation={6} variant='filled' {...props} />
  }

  const onChangeEmail = e => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = e => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = e => {
    e.preventDefault()

    setMessage('')

    AuthService.login(email, password).then(
      () => {
        history.push('/DashboardAdmin')
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setMessage(resMessage)
      }
    )
  }

  return (
    <>
      <div className='app-wrapper min-vh-100'>
        <div className='app-main flex-column'>
          <div className='app-content p-0'>
            <div className='app-content--inner d-flex align-items-center'>
              <div className='flex-grow-1 w-100 d-flex align-items-center'>
                <div className='bg-composed-wrapper--content py-5'>
                  <Container maxWidth='lg'>
                    <Grid container spacing={4}>
                      <Grid
                        item
                        xs={12}
                        lg={5}
                        className='d-none d-xl-flex align-items-center'>
                        <img
                          alt='...'
                          className='w-100 mx-auto d-block img-fluid'
                          src={loginImage}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        lg={7}
                        className='d-flex flex-column align-items-center'>
                        <span className='w-100 text-left text-md-center pb-4'>
                          <h1 className='display-3 text-xl-left text-center mb-3 font-weight-bold'>
                            Access Minion Administration
                          </h1>
                          <p className='font-size-lg text-xl-left text-center mb-0 text-black-50'>
                            Monitor your compute assets, identify problems, and
                            resolve them, all from here.
                          </p>
                        </span>
                        <Card className='m-0 w-100 p-0 border-0'>
                          <div className='card-header d-block p-3 mx-2 mb-0 mt-2 rounded border-0'>
                            <div className='text-muted text-center mb-3'>
                              <span>Sign in with</span>
                            </div>
                            <div className='text-center'>
                              <Button
                                variant='outlined'
                                className='mr-2 text-google'>
                                <span className='btn-wrapper--icon'>
                                  <FontAwesomeIcon icon={['fab', 'google']} />
                                </span>
                                <span className='btn-wrapper--label'>
                                  Google
                                </span>
                              </Button>
                              <Button
                                variant='outlined'
                                className='ml-2 text-github'>
                                <span className='btn-wrapper--icon'>
                                  <FontAwesomeIcon icon={['fab', 'github']} />
                                </span>
                                <span className='btn-wrapper--label'>
                                  GitHub
                                </span>
                              </Button>
                            </div>
                          </div>
                          <CardContent className='p-3'>
                            <div className='text-center text-black-50 mb-3'>
                              <span>Or</span>
                            </div>
                            <form onSubmit={handleLogin} className='px-5'>
                              <div className='mb-3'>
                                <FormControl className='w-100'>
                                  <InputLabel htmlFor='input-with-icon-adornment'>
                                    Email address
                                  </InputLabel>
                                  <Input
                                    fullWidth
                                    id='input-with-icon-adornment'
                                    required={true}
                                    onChange={onChangeEmail}
                                    startAdornment={
                                      <InputAdornment position='start'>
                                        <MailOutlineTwoToneIcon />
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </div>
                              <div className='mb-3'>
                                <FormControl className='w-100'>
                                  <InputLabel htmlFor='standard-adornment-password'>
                                    Password
                                  </InputLabel>
                                  <Input
                                    id='standard-adornment-password'
                                    fullWidth
                                    required={true}
                                    type='password'
                                    onChange={onChangePassword}
                                    startAdornment={
                                      <InputAdornment position='start'>
                                        <LockTwoToneIcon />
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </div>
                              {message && message != '' ? (
                                <Alert severity='error'>{message}</Alert>
                              ) : (
                                ''
                              )}
                              <div className='w-100'>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={checked1}
                                      onChange={handleChange1}
                                      value='checked1'
                                      color='primary'
                                    />
                                  }
                                  label='Remember me'
                                />
                              </div>
                              <div className='text-center'>
                                <Button
                                  type='submit'
                                  color='primary'
                                  variant='contained'
                                  size='large'
                                  className='my-2'>
                                  Sign in
                                </Button>
                              </div>
                            </form>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminContent
