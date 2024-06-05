import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';

const TimeTable: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'Time Table', path:'/time-table'}]

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
    </div>
  );
};

export default TimeTable;
