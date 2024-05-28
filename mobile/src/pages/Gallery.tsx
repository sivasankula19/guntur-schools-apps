import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';

const Gallery: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'Gallery', path:'/gallery'}];

  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
    </div>
  );
};

export default Gallery;
