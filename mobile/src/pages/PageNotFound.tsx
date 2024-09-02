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
        <button style={{border:'1px solid blue', height:'40px', width:'auto', padding:'0 8px', margin:'0 10px'}} className='btn' onClick={handleNavigate}>Home</button>
    </div>
  )
}

export default PageNotFound