import React from 'react';
import { useParams } from 'react-router';

const Attendance: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Attendance"}= {name}</div>
  );
};

export default Attendance;
