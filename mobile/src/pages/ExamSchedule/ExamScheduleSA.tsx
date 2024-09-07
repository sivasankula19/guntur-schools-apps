import React, { useState } from 'react'
import { examSchedulesData } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';

function ExamScheduleSA() {
  const [examsList, setExamsList] = useState<any[]>([])
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Exam Schedules', path: '/exam-schedules' }];
  const examScheduleJson = examSchedulesData
  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='exams'></div>
    </div>
  )
}

export default ExamScheduleSA