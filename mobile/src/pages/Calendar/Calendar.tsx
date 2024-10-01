import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';

const Calendar = () => {
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' },{ bName: 'Calendar', path: '/calendar' },];
  return (
    <div>
      <GBreadCrumbs data={breadCrumbsValue}/>
    </div>
  )
}

export default Calendar