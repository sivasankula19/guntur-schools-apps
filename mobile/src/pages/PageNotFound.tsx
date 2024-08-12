import React from 'react'
import { useNavigate } from 'react-router'

function PageNotFound() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard')
  }

  return (
    <div>
        <p>Something went wrong !</p>
        <button className='btn' onClick={handleNavigate}>Home</button>
    </div>
  )
}

export default PageNotFound