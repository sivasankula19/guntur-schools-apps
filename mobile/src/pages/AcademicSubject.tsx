import React from 'react';
import GBreadCrumbs from '../components/GBreadCrumbs';

const AcademicSubject: React.FC = () => {

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Acedamic Subjects', path: '/' }];

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue} />
    </div>
  );
};

export default AcademicSubject;
