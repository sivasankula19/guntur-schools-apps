import React from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

const Profile: React.FC = () => {
  const location = useLocation()
  const { id, name } = useParams<{ id: string, name:string }>();

  console.log('loca', location, id)

  return (
    <div>{"Profile"}= {id}</div>
  );
};

export default Profile;
