import React, { useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs'

function AttendanceByStudent() {

    const breadCrumbsValue = [
        { bName: 'Home', path: '/dashboard' },
        { bName: 'Student Attendance', path: '/attendance' },
    ];

    return (
        <div className='attendance_sa'>
            <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        </div>
    )
}

export default AttendanceByStudent