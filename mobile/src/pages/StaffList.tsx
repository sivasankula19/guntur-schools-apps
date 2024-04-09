import React from 'react';
import { useParams } from 'react-router';

const StaffList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"StaffList"}= {name}</div>
  );
};

export default StaffList;
