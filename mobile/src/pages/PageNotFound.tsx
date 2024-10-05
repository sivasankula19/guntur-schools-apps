import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'

function PageNotFound() {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(isAuthenticated ? '/dashboard' : '/select-school')
  }

  return (
    <div className='page-not-found'>
      <p>Something went wrong !</p>
      <button style={{ border: '1px solid blue', height: '40px', width: 'auto', padding: '0 8px', margin: '0 10px' }} className='btn' onClick={handleNavigate}>Home</button>
    </div>
  )
}

export default PageNotFound