import React, { useState } from 'react'
import AttendanceDateSelect from './AttendanceDateSelect'
import AttendanceClassSelect from './AttendanceClassSelect'
import Attendance from './Attendance'

interface IClassData {
    className: string,
    classId: string
}

interface ISectionData {
    sectionName: string,
    sectionId: string
}

interface IContinuedInfo {
    class: IClassData,
    section: ISectionData,
    date: string
}

function AttendanceContainer() {
    const [continuedInfo, setContinuedInfo] = useState<IContinuedInfo>({
        class: {
            classId: '',
            className: '',
        },
        section: {
            sectionId: '',
            sectionName: '',
        },
        date: ''
    })
    const [selectedView, setSelectedView] = useState<'byDate' | 'byClass' | 'byStudentId'>('byDate');

    const handleChangeSelectedView = (view: 'byDate' | 'byClass' | 'byStudentId') => {
        setSelectedView(view)
    }

    return (
        <div className='attendance_sa'>
            {
                selectedView === 'byDate' ? (<>
                    <AttendanceDateSelect />
                </>) : selectedView === 'byClass' ? (<>
                    <AttendanceClassSelect />
                </>) : (<>
                    <Attendance editable={true}/>
                </>)
            }
        </div>
    )
}

export default AttendanceContainer