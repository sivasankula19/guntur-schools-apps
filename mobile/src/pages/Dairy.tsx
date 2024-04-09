import React from 'react';
import { useParams } from 'react-router';

const Dairy: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Dairy"}= {name}</div>
  );
};

export default Dairy;
