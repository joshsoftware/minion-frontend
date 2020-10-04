import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Grid, Card, CardContent, Button, Divider } from '@material-ui/core'

import OrganizationService from '../../services/organization.service'

import CountUp from 'react-countup'

const AdminDashboardOrganizationCard = () => {
  const [organizations, setOrganizations] = useState(null)
  useEffect(() => {
    const getOrganizations = async () => {
      const orgs = await OrganizationService.organizations()
      setOrganizations(orgs)
    }

    getOrganizations()
  }, [])

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card className='card-box mb-4'>
          <div className='card-header py-3'>
            <div className='card-header--title font-size-lg'>
              <h4 className='font-size-lg mb-0 py-2 font-weight-bold'>
                Organizations
              </h4>
            </div>
            <div className='card-header--actions'>
              <Button size='small' variant='outlined' color='secondary'>
                <span className='btn-wrapper--icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'plus-circle']}
                    className='text-success'
                  />
                </span>
                <span className='btn-wrapper--label'>Add Organization</span>
              </Button>
            </div>
          </div>
          <CardContent className='p-3'>
            {organizations &&
              organizations.map(org => (
                <React.Fragment key={org.uuid}>
                  <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex'>
                      <div className='d-flex align-items-center'>
                        <div>
                          <a
                            href='#/'
                            onClick={e => e.preventDefault()}
                            className='font-weight-bold text-black'
                            title='...'>
                            {org.name}
                          </a>
                          <span className='text-black-50 d-block'>
                            {org.uuid}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex align-items-center'>
                      <div className='font-weight-bold text-success font-size-lg pr-2'>
                        <span className='text-black-50'>Server count:</span>{' '}
                        <CountUp
                          start={0}
                          end={org.server_count}
                          duration={6}
                          deplay={2}
                          separator=''
                          decimals={0}
                          decimal=','
                        />
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

export default AdminDashboardOrganizationCard
