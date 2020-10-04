import React from 'react';

import { PageTitle } from '../../layout-components';

import UserDashboardCards from '../../components/UserDashboardCards';

const DashboardUser = () => {
  return (
    <>
      <PageTitle
        titleHeading="Minion User Dashboard"
        titleDescription="View and manage your servers."
      />

      <UserDashboardCards />

    </>
  );
}
export default DashboardUser