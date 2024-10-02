import React from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'

function AppConfigurations() {
    const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Configurations', path: '/app-configurations' }];
    return (
        <div>
            <GBreadCrumbs data={breadCrumbsValue} />
        </div>
    )
}

export default AppConfigurations