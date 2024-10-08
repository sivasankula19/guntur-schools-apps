import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'

function AppConfigurations() {
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Configurations', path: '/app-configurations' }];
    return (
        <div className='g_full_height'>
            <GBreadCrumbs data={breadCrumbsValue} />
        </div>
    )
}

export default AppConfigurations