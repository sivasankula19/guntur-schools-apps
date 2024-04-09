import React from 'react';
import { useParams } from 'react-router';

const ExCircularActivities: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"ExCircularActivities"}= {name}</div>
  );
};

export default ExCircularActivities;
