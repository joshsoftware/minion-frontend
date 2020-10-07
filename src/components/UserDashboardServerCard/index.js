import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import TableSortLabel from '@material-ui/core/TableSortLabel'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import TablePagination from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles'

import ServerService from '../../services/server.service'

const createData = (uuid, name, heartbeat, ip, load, organization) => {
  return { uuid, name, heartbeat, ip, load, organization }
}

const rowdata = [createData(' ', ' ', ' ', 0, ' ')]

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'server',
    numeric: false,
    disablePadding: true,
    label: 'Server Name'
  },
  {
    id: 'heartbeat',
    numeric: false,
    disablePadding: false,
    label: 'Last Heartbeat'
  },
  { id: 'ip', numeric: false, disablePadding: false, label: 'IP' },
  { id: 'load', numeric: true, disablePadding: false, label: 'Load' },
  {
    id: 'organization',
    numeric: false,
    disablePadding: false,
    label: 'Organization'
  }
]

function EnhancedTableHead (props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}))

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h6' id='tableTitle'>
          Servers
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    //minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

const EnhancedTable = props => {
  const classes = useStyles()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('heartbeat')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const lightRow = [false]

  const row_decoration = row => {
    const decoration = {}
    if (lightRow[0]) {
      decoration['opacity'] = '0.85'
    }
    lightRow[0] = !lightRow[0]

    let bgcolor = '#c3e3c5'
    if (row.load < 0) {
      decoration['opacity'] = '0.5'
    } else if (row.load >= 4 && row.load < 8) {
      bgcolor = '#F7BE75'
    } else if (row.load >= 8) {
      bgcolor = '#ffafaf'
    }
    decoration['background-color'] = bgcolor

    if (Date.now() - Date.parse(row.heartbeat) > 600000) {
      decoration[
        'background-image'
      ] = `repeating-linear-gradient( 65deg, #ccc, #ccc 1px, ${bgcolor} 3px, ${bgcolor} 15px )`
      decoration['background-repeat'] = 'no-repeat'
    }
    return decoration
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.uuid)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, uuid) => {
    const selectedIndex = selected.indexOf(uuid)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uuid)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    props.handleSelected(newSelected)
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = uuid => selected.indexOf(uuid) !== -1

  const [rows, setRows] = useState(rowdata)

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const getServers = async () => {
      const data = await ServerService.summary()
      // If there is an error with the server data, treat it as no data.
      try {
        const adjusted_data = data.map(d => {
          let row = {
            uuid: d[0],
            name: d[1],
            heartbeat: d[2],
            ip: d[3],
            load: d[4] && d[4][1] ? d[4][1] : -1,
            organization: d[6]
          }
          return row
        })
        setRows(adjusted_data)
      } catch (err) {
        setRows([])
      }
      setTrigger(Date.now)
    }

    const interval = setInterval(() => {
      getServers()
    }, 60000)

    getServers()

    return () => clearInterval(interval)
  }, [])

  return (
    <Grid item xs={12} md={7}>
      <Card className='card-box mb-4'>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
                aria-label='enhanced table'>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const isItemSelected = isSelected(row.uuid)
                      const labelId = 'enhanced-table-checkbox'
                      return (
                        <TableRow
                          hover
                          onClick={event => handleClick(event, row.uuid)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.uuid}
                          style={row_decoration(row)}
                          selected={isItemSelected}>
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'>
                            {row.name || row.uuid}
                          </TableCell>
                          <TableCell align='right'>{row.heartbeat}</TableCell>
                          <TableCell align='right'>{row.ip}</TableCell>
                          <TableCell align='right'>{row.load}</TableCell>
                          <TableCell align='right'>
                            {row.organization}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
          <div style={{paddingLeft: "12px"}} className={classes.root}>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label='Compact'
            />
	  </div>
        </div>
      </Card>
    </Grid>
  )
}

export default EnhancedTable
