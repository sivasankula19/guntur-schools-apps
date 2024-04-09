import React from 'react';
import { useParams } from 'react-router';

const Subjects: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Subjects"}= {name}</div>
  );
};

export default Subjects;
