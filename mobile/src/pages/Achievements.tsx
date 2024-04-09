import React from 'react';
import { useParams } from 'react-router';

const Achievements: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Achievements"}= {name}</div>
  );
};

export default Achievements;
