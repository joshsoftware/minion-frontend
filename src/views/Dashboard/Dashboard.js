import React, { useState, useEffect, useRef } from 'react'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Happy from '@material-ui/icons/Mood'
import Sad from '@material-ui/icons/MoodBad'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Danger from 'components/Typography/Danger.js'
import Success from 'components/Typography/Success.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardIcon from 'components/Card/CardIcon.js'
import CardBody from 'components/Card/CardBody.js'
import CardFooter from 'components/Card/CardFooter.js'

import { loadAverageChart } from 'variables/charts.js'

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js'

const useStyles = makeStyles(styles)
const loadChartsData = {
  'https-1': [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.1, 0.05, 0.01], [0]],
  'app-1': [[2, 2, 2], [2, 2, 2], [1, 0.5, 0.1], [0]],
  'app-2': [[20, 15, 4], [20, 15, 4], [1, 0.5, 0.1], [0]],
  'app-3': [[2, 2, 2], [2, 2, 2], [1, 0.5, 0.1], [0]],
  'db-1': [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.1, 0.05, 0.01], [0]],
  'db-2': [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.1, 0.05, 0.01], [0]],
  'utility-1': [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.1, 0.05, 0.01], [0]]
}

export default function Dashboard () {
  const classes = useStyles()

  const [loads, setLoads] = useState(loadChartsData)
  const loadsRef = useRef(loads)
  loadsRef.current = loads

  const buildData = (label) => {
    const data = Object.assign({}, loadAverageChart.data)
    data.series = [loads[label][1]]
    return data
  }

  const buildOptions = (label) => {
    const opts = Object.assign({}, loadAverageChart.options)
    let max = 0
    for (let i = 0; i < 3; i++) {
      max = loads[label][1][i] > max ? loads[label][1][i] : max
    }
    opts.high = (Math.round(max * 1.333))

    return opts
  }

  useEffect(() => {
    const interval = setInterval(() => {
      Object.keys(loadsRef.current).forEach((k) => {
        let i
        for (i = 0; i < 3; i++) {
          const increase = Math.random() < 0.5
          if (increase) {
            const magnitude = loadsRef.current[k][2][i]
            loadsRef.current[k][3] = loadsRef.current[k][3] + 1
            loadsRef.current[k][1][i] = loadsRef.current[k][1][i] + (Math.random() * magnitude)
          } else {
            const baseline = loadsRef.current[k][0][i]
            const magnitude = loadsRef.current[k][2][i]

            loadsRef.current[k][3] = loadsRef.current[k][3] - 1
            if (loadsRef.current[k][1][i] < baseline) {
              loadsRef.current[k][3] = loadsRef.current[k][3] >= 0 ? -1 : loadsRef.current[k][3]
              loadsRef.current[k][1][i] =
                loadsRef.current[k][1][i] - (Math.pow(2, loadsRef.current[k][3]) * (Math.random() * magnitude))
            } else {
              loadsRef.current[k][1][i] =
                loadsRef.current[k][1][i] - (Math.random() * magnitude)
            }
            if (loadsRef.current[k][1][i] < 0) {
              loadsRef.current[k][1][i] = 0
            }
          }
        }
      })
      setLoads(Object.assign({}, loadsRef.current))
    }, 3000)
    return () => {
      clearTimeout(interval)
    }
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon>computer</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                https-1-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('https-1')}
                    type='Line'
                    options={buildOptions('https-1')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Happy />
                </Success>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  State is OK
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon>computer</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                app-1-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('app-1')}
                    type='Line'
                    options={buildOptions('app-1')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Happy />
                </Success>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  State is OK
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='warning' stats icon>
              <CardIcon color='warning'>
                <Icon>warning</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                app-2-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('app-2')}
                    type='Line'
                    options={buildOptions('app-2')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Sad />
                </Danger>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  Excessive Load
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon>computer</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                app-3-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('app-3')}
                    type='Line'
                    options={buildOptions('app-3')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Happy />
                </Success>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  State is OK
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon>computer</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                db-1-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('db-1')}
                    type='Line'
                    options={buildOptions('db-1')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Happy />
                </Success>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  State is OK
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='danger' stats icon>
              <CardIcon color='danger'>
                <Icon>disc_full</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                db-2-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('db-2')}
                    type='Line'
                    options={buildOptions('db-2')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Sad />
                </Danger>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  Filesystem is full
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Icon>computer</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Server Status</p>
              <h3 className={classes.cardTitle}>
                utility-1-nyc1.demo.joshminion.com
              </h3>
            </CardHeader>
            <CardBody>
              <Card chart>
                <CardHeader color='warning'>
                  <ChartistGraph
                    className='ct-chart'
                    data={buildData('utility-1')}
                    type='Line'
                    options={buildOptions('utility-1')}
                  />
                </CardHeader>
              </Card>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <Happy />
                </Success>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  State is OK
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
