import React, { useState, useEffect } from 'react'

import { Card } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import Chart from 'react-apexcharts'
import ForEach from 'lodash/forEach'

import TelemetryService from '../../services/telemetry.service'

const UserDashboardServerTelemetryPanel = props => {
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState([])

  const criteriaType = crt => {
    const ary = crt || props.criteria.filter(item => item.criteria == 'type')
    return ary.length > 0
      ? props.typeLabels[ary[0].value] || ary[0].value
      : null
  }

  const colors = ['#008ffb', '#feb019', '#00e396', '#c95398', '#775dd0']

  const generateChartOptions = pnts => {
    if (!pnts) return null

    const series = []
    const yaxis = []
    let sidetoggle = false
    let coloridx = 0
    const colormax = 5
    ForEach(pnts, (set, key) => {
      if (set.length > 0) {
        const color = colors[coloridx % colormax]
        series.push({
          name: props.typeLabels[key] || key || 'data',
          data: set,
          type: 'area'
        })

        yaxis.push({
          opposite: sidetoggle,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: color
          },
          labels: {
            style: {
              colors: color
            }
          },
          title: {
            text: props.typeLabels[key] || key || 'data',
            style: {
              color: color
            }
          },
          tooltip: {
            enabled: true
          }
        })

        coloridx = coloridx + 1
        sidetoggle = !sidetoggle
      }
    })

    const y_title = () => {
      if (series.length == 0) return ''
      return series.length > 1 ? 'Data' : series[0].name
    }

    return {
      options: {
        colors: colors,
        stroke: {
          curve: 'smooth',
          width: 1
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: yaxis,
        tooltip: {
          x: {
            format: 'yyyy-MM-dd hh:mm:ss'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.0,
            type: 'vertical',
            stops: [0, 100]
          }
        },
        grid: {
          borderColor: '#f1f1f1',
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        chart: {
          type: 'line',
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            export: {
              csv: {
                filename: undefined,
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'value',
                dateFormatter (timestamp) {
                  return new Date(timestamp).toDateString()
                }
              }
            },
            autoSelected: 'zoom'
          }
        }
      },
      series: series
    }
  }

  const [chartOptions, setChartOptions] = useState(generateChartOptions())

  const trimData = data => {
    const new_data = {}
    ForEach(data.data, (set, key) => {
      new_data[key] = set.map(d => [d[1], d[0][1]])
    })

    return new_data
  }

  useEffect(() => {
    setLoading(true)
  }, [props.criteria, props.criteriaTrigger])

  useEffect(() => {
    const getPoints = async () => {
      const data = await TelemetryService.get(props.server, props.criteria)
      const new_data = trimData(data)
      await setPoints(new_data)
      setLoading(false)
    }

    if (criteriaType()) getPoints()
  }, [props.criteria, props.criteriaTrigger])

  useEffect(() => {
    setChartOptions(generateChartOptions(points))
  }, [points])

  return (
    <>
      <div>
        {!criteriaType() && (
          <div>Please select a telemetry type to display.</div>
        )}
        {criteriaType() && loading && (
          <Card className='card-box mb-4'>
            <div className='card-header py-3'>
              <div
                className='card-header--title font-size-lg'
                style={{ height: '300px' }}>
                <span className='ribbon-horizontal ribbon-horizontal--info'>
                  <span>Data is Loading</span>
                </span>
                <Skeleton
                  style={{ height: '300px' }}
                  variant='rect'
                  animation='wave'></Skeleton>
              </div>
            </div>
          </Card>
        )}
        {criteriaType() &&
          !loading &&
          chartOptions.series[0] &&
          chartOptions.series[0].data.length == 0 && (
            <Card className='card-box mb-4'>
              <div className='card-header py-3'>
                <div
                  className='card-header--title font-size-lg'
                  style={{ height: '300px' }}>
                  <span className='ribbon-horizontal ribbon-horizontal--warning'>
                    <span>No Data is Available</span>
                  </span>
                </div>
              </div>
            </Card>
          )}
        {criteriaType() &&
          !loading &&
          chartOptions.series[0] &&
          chartOptions.series[0].data.length > 0 && (
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
            />
          )}
      </div>
    </>
  )
}

export default UserDashboardServerTelemetryPanel
