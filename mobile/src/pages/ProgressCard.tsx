import React from 'react';
import { useParams } from 'react-router';

const ProgressCard: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"ProgressCard"}= {name}</div>
  );
};

export default ProgressCard;
