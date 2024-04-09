import React from 'react';
import { useParams } from 'react-router';

const StudentList: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"StudentList"}= {name}</div>
  );
};

export default StudentList;
