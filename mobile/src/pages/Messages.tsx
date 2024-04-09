import React from 'react';
import { useParams } from 'react-router';

const Messages: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"Messages"}= {name}</div>
  );
};

export default Messages;
