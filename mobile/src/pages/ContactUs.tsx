import React from 'react';
import { useParams } from 'react-router';

const ContactUs: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>{"ContactUs"}= {name}</div>
  );
};

export default ContactUs;
