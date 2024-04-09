import React from 'react';
import { useParams } from 'react-router';

const Dashboard: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Dashboard"}= {name}</div>
  );
};

export default Dashboard;
