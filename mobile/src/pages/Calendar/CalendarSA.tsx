import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'

const CalendarSA = () => {
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' },{ bName: 'Calendar', path: '/calendar' },];

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}/>
    </div>
  )
}

export default CalendarSA