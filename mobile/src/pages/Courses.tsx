import React from 'react';
import { useParams } from 'react-router';

const Courses: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Courses"}= {name}</div>
  );
};

export default Courses;
