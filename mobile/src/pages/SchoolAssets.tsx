import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';

const SchoolAssets: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Assets', path: '/assets' }];


  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue} />
    </div>
  );
};

export default SchoolAssets;
