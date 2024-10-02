import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';

function RaiseRequest() {
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Raise Request', path: '/raise-request' }];

    return (
        <div>
            <GBreadCrumbs data={breadCrumbsValue} />
        </div>
    )
}

export default RaiseRequest