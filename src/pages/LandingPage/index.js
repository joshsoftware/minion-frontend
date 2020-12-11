import React from 'react'

import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core'

import minionLogo from '../../assets/images/logos/minion-on-white.png'
import projectLogo from '../../assets/images/logos/Minion-Logo-on-white.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-router-dom'

import vanityImg from '../../assets/images/landingpage/vanity.png'

const LandingPage = () => {
  return (
    <>
      <div className='hero-wrapper bg-composed-wrapper bg-white'>
        <div className='header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark'>
          <Container className='d-flex' fixed>
            <div className='header-nav-logo align-items-center d-flex justify-content-start'>
              <div className='nav-logo'>
                <Link to='/Login' title='User Login to Minion'>
                  <i className='bg-white'>
                    <img alt='User Login to Minion' src={minionLogo} />
                  </i>
                  <span>Login</span>
                  <Tooltip
                    arrow
                    placement='right'
                    title='If you have an account, click here to login to your Minion Dashboard.'>
                    <span className='text-black-50 pl-2'>
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </span>
                  </Tooltip>
                </Link>
              </div>
            </div>
            <div className='header-nav-menu d-none d-lg-block'>
              <div className='d-flex justify-content-center text-white'>
                <Button
                  color='inherit'
                  className='btn-inverse px-3 mx-1 py-2 text-capitalize'
                  component={Link}
                  to='/Features'>
                  Features
                </Button>
                <Button
                  color='inherit'
                  className='btn-inverse px-3 mx-1 py-2 text-capitalize'
                  component={Link}
                  to='/FAQ'>
                  FAQ
                </Button>
                <Button
                  color='inherit'
                  className='btn-inverse px-3 mx-1 py-2 text-capitalize'
                  component={Link}
                  to='/Contact'>
                  Contact
                </Button>
              </div>
            </div>
            {/*             <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
              <span className="d-none d-lg-block">
                <Button
                  component={Link}
                  to="/DashboardDefault"
                  className="px-3"
                  color="primary"
                  variant="contained">
                  Right Callout
                </Button>
              </span>
              <span className="d-block d-lg-none">
                <Fab
                  onClick={toggleDrawer('right', true)}
                  color="secondary"
                  size="medium">
                  <MenuRoundedIcon />
                </Fab>
              </span>
            </div> */}
          </Container>
        </div>

        <div className='flex-grow-1 w-100 d-flex align-items-center'>
          {/*           <div
            className='bg-composed-wrapper--image bg-composed-filter-rm opacity-9'
            style={{ backgroundImage: 'url(' + hero6 + ')' }}
          /> */}
          <div className='bg-composed-wrapper--content pt-5 pb-2 py-lg-5'>
            <Container fixed className='pb-5'>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  lg={7}
                  xl={6}
                  className='d-flex align-items-center'>
                  <div>
                    <div className='text-black mt-3'>
                      <h1 className='display-2 mb-3 font-weight-bold'>
                        Minion
                      </h1>
                      <p className='font-size-lg text-black-50'>
                        You have compute resources running in cloud data
                        centers, on premises, in various container
                        architectures, or more likely, in some combination of
                        all of these things.
                      </p>
                      <p className='font-size-lg text-black-50'>
                        You want to be able to know the status of all of your
                        systems at a glance, on demand. More than that, though,
                        you want to be able to control what sort of metrics are
                        gathered on your systems, and you want important logs
                        from those systems aggregated for you at the same time.
                      </p>

                      <p className='font-size-lg text-black-50'>
                        You also want a way for your staff to securely access
                        those systems to diagnose or fix problems, but because
                        of various compliance requirements, you need to have a
                        log of all such accesses.
                      </p>

                      <p className='font-size-lg text-black-50'>
                        And you want all of this from a single
                        product/dashboard/interface.
                      </p>

                      <p className='font-size-lg text-black-80'>
                        Minion gives you all of this and more.
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  xl={6}
                  className='px-0 d-none d-lg-flex align-items-center'>
                  <img
                    alt='...'
                    className='w-50 mx-auto d-block img-fluid'
                    src={vanityImg}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
        <div className='hero-footer py-3 py-lg-5'>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <Card className='card-box-hover-rise card-box-hover card-box-alt card-border-top border-primary mb-4 p-3'>
                  <h3 className='font-size-lg font-weight-bold mb-4'>
                    Flexible, Configurable Operation
                  </h3>
                  <p className='card-text mb-0'>
                    We collect all of the standard information out of the box,
                    but you can configure your Minions to collect any specific
                    metrics that you want for your use case.
                  </p>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card className='card-box-hover-rise card-box-hover card-box-alt card-border-top border-success mb-4 p-3'>
                  <h3 className='font-size-lg font-weight-bold mb-4'>
                    Simple and Attractive User Interface
                  </h3>
                  <p className='card-text mb-0'>
                    We give you a modern, responsive, attractive client that is
                    designed to make it easy to monitor your systems, get alerts
                    for important things, and act on that information.
                  </p>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card className='card-box-hover-rise card-box-hover card-box-alt card-border-top border-info mb-4 p-3'>
                  <h3 className='font-size-lg font-weight-bold mb-4'>
                    APIs and CLIs
                  </h3>
                  <p className='card-text mb-0'>
                    It's your data. It's your compute resources. In addition to
                    our web based interfaces, we provide you with a CLI tool and
                    an API that you can use to access and use your data at any
                    time, outside of the web interface.
                  </p>
                </Card>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Card className='card-box-hover-rise card-box-hover card-box-alt card-border-top border-warning mb-4 p-3'>
                  <h3 className='font-size-lg font-weight-bold mb-4'>
                    No Black Boxes
                  </h3>
                  <p className='card-text mb-0'>
                    You deserve to know what is running on your resources. The
                    Minion Agent code is completely open source. You can read
                    it. You can understand it. And if anyone finds a bug, they
                    can submit a pull request to have it fixed.
                  </p>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div className='bg-first py-5'>
        <div>
          <Container maxWidth='md' className='text-center'>
            <a href='https://github.com/joshsoftware/minion-frontend/blob/master/README.md' title='Minion'>
              <img alt='Minion' src={minionLogo} />
              <Tooltip
                arrow
                placement='right'
                title="Disruption is not the future, it is the present. In an ever evolving technological landscape, it is imperative for innovation to win over the mundane, and that's exactly what we aim to achieve.">
                <span className='text-black-50 pl-2'>
                  <FontAwesomeIcon icon={['far', 'question-circle']} />
                </span>
              </Tooltip>
            </a>
          </Container>
          <div className='divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-1 mx-auto mb-4 mt-5 w-50' />
          <div className='d-flex justify-content-center'>
            <Tooltip arrow title='Facebook'>
              <IconButton
                className='nav-link text-white-50'
                href='#'
                rel='noopener nofollow'
                target='_blank'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fab', 'facebook']}
                    className='font-size-xxl'
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title='Twitter'>
              <IconButton
                className='nav-link text-white-50'
                href='#'
                rel='noopener nofollow'
                target='_blank'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fab', 'twitter']}
                    className='font-size-xxl'
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title='Github'>
              <IconButton
                className='nav-link text-white-50'
                href='#'
                rel='noopener nofollow'
                target='_blank'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fab', 'github']}
                    className='font-size-xxl'
                  />
                </span>
              </IconButton>
            </Tooltip>
          </div>
          <div className='divider border-2 d-sm-none d-md-block rounded-circle border-white bg-white opacity-1 mx-auto my-4 w-50' />

          <div className='mt-5'>
            <span className='text-center d-block text-white-50'>
              Copyright &copy; {new Date().getFullYear()}&nbsp;-&nbsp;
              <a
                className='text-white'
                href='https://github.com/joshsoftware/minion-frontend/blob/master/README.md'
                title='Minion'>
                Minion Team
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
