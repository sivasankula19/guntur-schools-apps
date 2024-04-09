import React from 'react';
import { useParams } from 'react-router';

const About: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"About"}= {name}</div>
  );
};

export default About;
