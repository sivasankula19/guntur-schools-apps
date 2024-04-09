import React from 'react';
import { useParams } from 'react-router';

const TimeTable: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"TimeTable"}= {name}</div>
  );
};

export default TimeTable;
