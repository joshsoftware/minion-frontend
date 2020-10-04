import React from 'react';

import { PageTitle } from '../../layout-components';

import AdminDashboardCards from '../../components/AdminDashboardCards';

const DashboardAdmin = () => {
  return (
    <>
      <PageTitle
        titleHeading="Minion Administrative Dashboard"
        titleDescription="Manage Minion itself; organizations, users, and Minion operational data."
      />

      <AdminDashboardCards />

    </>
  );
}

export default DashboardAdmin