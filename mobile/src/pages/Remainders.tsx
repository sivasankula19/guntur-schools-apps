import React from 'react';
import { useParams } from 'react-router';

const Remainders: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Remainders"}= {name}</div>
  );
};

export default Remainders;
