import React from 'react';
import { useParams } from 'react-router';

const SchoolAssets: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"SchoolAssets"}= {name}</div>
  );
};

export default SchoolAssets;
