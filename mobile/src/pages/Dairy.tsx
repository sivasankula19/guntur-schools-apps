import React from 'react';
import GBreadCrumbs from '../components/GBreadCrumbs';

const Dairy: React.FC = () => {

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Dairy', path: '/dairy' }];

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue} />
    </div>
  );
};

export default Dairy;
