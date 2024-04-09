import React from 'react';
import { useParams } from 'react-router';

const FeesDues: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"FeesDues"}= {name}</div>
  );
};

export default FeesDues;
