import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';

function RaisedRequestSA() {
  
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Raised Requests', path: '/raised-requests' }];

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
    </div>
  )
}

export default RaisedRequestSA