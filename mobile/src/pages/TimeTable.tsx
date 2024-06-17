import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';

const TimeTable: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{bName:'Home', path:'/dashboard'},{bName:'Calendar', path:'/calendar'}]

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
    </div>
  );
};

export default TimeTable;
