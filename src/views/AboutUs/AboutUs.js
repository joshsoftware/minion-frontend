import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import Table from 'components/Table/Table.js'

function AboutUs () {
  const styles = {
    cardCategoryWhite: {
      '&,& a,& a:hover,& a:focus': {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0'
      },
      '& a,& a:hover,& a:focus': {
        color: '#FFFFFF'
      }
    },
    cardTitleWhite: {
      color: '#FFFFFF',
      marginTop: '0px',
      minHeight: 'auto',
      fontWeight: '300',
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: '3px',
      textDecoration: 'none',
      '& small': {
        color: '#777',
        fontSize: '65%',
        fontWeight: '400',
        lineHeight: '1'
      }
    },
    table: {
      width: '100%',
      maxWidth: '100%',
      marginBottom: '1rem',
      backgroundColor: 'transparent',
      borderCollapse: 'collapse',
      display: 'table',
      borderSpacing: '2px',
      borderColor: 'grey',
      '& thdead tr th': {
        fontSize: '1.063rem',
        padding: '12px 8px',
        verticalAlign: 'middle',
        fontWeight: '300',
        borderTopWidth: '0',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        textAlign: 'inherit'
      },
      '& tbody tr td': {
        padding: '12px 8px',
        verticalAlign: 'middle',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)'
      },
      '& td, & th': {
        display: 'table-cell'
      }
    },
    center: {
      textAlign: 'center'
    }
  }

  const useStyles = makeStyles(styles)
  const classes = useStyles()

  return (
    <GridContainer justify='center'>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color='info'>
            <h4 className={classes.cardTitleWhite}>
              About Minion
            </h4>
            <p className={classes.cardCategoryWhite}>
              Minion gives your Support staff clear visibility into the health of your systems, and easy
              access when there is a problem.
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.tableUpgradeWrapper}>
              Disruption is not the future, it is the present. In an ever evolving technological landscape, it is
              imperative for innovation to win over the mundane, and that's exactly what we aim to achieve.
              <p>
                Minion gives your support organization a simple, clear, and easy to use dashboard with which
                to view the health of your environments.
              </p>
              <Table
                tableHeaderColor='info'
                tableHead={['Features']}
                tableData={[
                  ['The intelligent agent architecture and fault tolerant cluster membership architecture provides reliable, current information about what is happening within your environments'],
                  ['When something does go wrong, Minion gives your support staff a way to manage it. Click on a server in the dashboard, and immediately open a connection with that server.'],
                  ['IO with the server is fully logged, providing an audit trail for your legal compliance, SOC II, incident forensics, or any other requirements.']
                ]}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default AboutUs
