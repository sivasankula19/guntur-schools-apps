import React from 'react';
import { useParams } from 'react-router';

const Gallery: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Gallery"}= {name}</div>
  );
};

export default Gallery;
