import React, { lazy, Suspense, Fragment } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { ThemeProvider } from '@material-ui/styles'

import { ClimbingBoxLoader } from 'react-spinners'

import MuiTheme from './theme'

import {
  LeftSidebar,
  CollapsedSidebar,
  MinimalLayout,
  PresentationLayout
} from './layout-blueprints'

import AdminLogin from './pages/AdminLogin'
import UserLogin from './pages/UserLogin'
import PagesRegister from './pages/PagesRegister'
import PagesRecoverPassword from './pages/PagesRecoverPassword'
import PagesError404 from './pages/PagesError404'
import PagesError500 from './pages/PagesError500'
import PagesError505 from './pages/PagesError505'

import DashboardAdmin from './pages/DashboardAdmin'
import DashboardUser from './pages/DashboardUser'
import LandingPage from './pages/LandingPage'
import HeroSections from './pages/HeroSections'

const Routes = () => {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  }

  const SuspenseLoading = () => {
    return (
      <Fragment>
        <div className='d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3'>
          <div className='d-flex align-items-center flex-column px-4'>
            <ClimbingBoxLoader color={'#5383ff'} loading={true} />{' '}
          </div>{' '}
          <div className='text-muted font-size-xl text-center pt-3'>
            Loading...
            <span className='font-size-lg d-block text-dark'>
              Your Minion Dashboard will be available shortly.{' '}
            </span>{' '}
          </div>{' '}
        </div>{' '}
      </Fragment>
    )
  }
  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense fallback={<SuspenseLoading />}>
          <Switch>
            <Redirect exact from='/' to='/Home' />
            <Route path={['/Home']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial='initial'
                    animate='in'
                    exit='out'
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path='/Home' component={LandingPage} />{' '}
                  </motion.div>{' '}
                </Switch>{' '}
              </PresentationLayout>{' '}
            </Route>
            <Route
              path={[
                '/AdminLogin',
                '/Login',
                '/PagesRegister',
                '/PagesRecoverPassword',
                '/PagesError404',
                '/PagesError500',
                '/PagesError505'
              ]}>
              <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial='initial'
                    animate='in'
                    exit='out'
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path='/AdminLogin' component={AdminLogin} />{' '}
                    <Route path='/Login' component={UserLogin} />{' '}
                    {/* <Route path="/PagesRegister" component={PagesRegister} />
                          <Route
                            path="/PagesRecoverPassword"
                            component={PagesRecoverPassword}
                          />
                          <Route path="/PagesError404" component={PagesError404} />
                          <Route path="/PagesError500" component={PagesError500} />
                          <Route path="/PagesError505" component={PagesError505} /> */}{' '}
                  </motion.div>{' '}
                </Switch>{' '}
              </MinimalLayout>{' '}
            </Route>
            <Route
              path={[
                '/DashboardAdmin',
                '/DashboardUser'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial='initial'
                    animate='in'
                    exit='out'
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path='/DashboardAdmin' component={DashboardAdmin} />
                    <Route path='/DashboardUser' component={DashboardUser} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>{' '}
          </Switch>{' '}
        </Suspense>{' '}
      </AnimatePresence>{' '}
    </ThemeProvider>
  )
}

export default Routes
