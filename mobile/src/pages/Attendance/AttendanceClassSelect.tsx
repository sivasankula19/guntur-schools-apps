import React, { useState } from 'react'

interface IClassData {
    className:string,
    classId:string
}

interface ISectionData {
    sectionName:string,
    sectionId:string
}

interface IContinuedInfo {
    class: IClassData,
    section: ISectionData,
    date: string
}

function AttendanceClassSelect() {
  return (
    <div className=''>
        hi class
    </div>
  )
}

export default AttendanceClassSelect