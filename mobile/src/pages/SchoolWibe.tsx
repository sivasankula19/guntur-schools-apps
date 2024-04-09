import React from 'react';
import { useParams } from 'react-router';

const SchoolWibe: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"SchoolWibe"}= {name}</div>
  );
};

export default SchoolWibe;
