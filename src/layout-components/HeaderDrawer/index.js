import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Grid,
  Hidden,
  Drawer,
  IconButton,
  Box,
  Checkbox,
  Badge,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';

import notificationMock from '../../assets/images/notification_drawer.png';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';

import ListIcon from '@material-ui/icons/List';

function HeaderDrawer() {

  const [open, setOpen] = React.useState(false);

  function handleDrawerClose() {
    setOpen(true);
  }

  function handleDrawerOpen() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Hidden smDown>
        <Box className="ml-2">
          <Tooltip title="Open Notifications Drawer" placement="right">
            <IconButton
              color="inherit"
              onClick={handleDrawerClose}
              size="medium"
              className="btn-inverse">
              {open ? <MenuOpenRoundedIcon /> : <ListIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Drawer
          anchor="right"
          open={open}
          variant="temporary"
          elevation={4}
          onClose={handleDrawerOpen}>
          <Box className="app-header-drawer">
            <PerfectScrollbar>
              <div className="p-4">
                <div className="text-center">
                  <div className="font-weight-bold font-size-lg mb-0 text-black">
                    Notifications
                  </div>
                  <p className="text-black-50">
                    View and manage your alert and notification settings.
                  </p>
	          <img src={notificationMock} />
                </div>
              </div>
              <Divider />
              <div className="p-4 text-center">
	        <p>This is currently a blank slate, but TODO is to make it look something like the above design.</p>
              </div>
            </PerfectScrollbar>
          </Box>
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

export default HeaderDrawer;
