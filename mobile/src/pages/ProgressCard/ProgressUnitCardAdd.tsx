import React, { useEffect, useRef, useState } from 'react'
import GBreadCrumbs from '../../components/GBreadCrumbs';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { classListDummy, sectionListDummy, studentMarksDetails } from '../../common/utility';
import { IonCard, IonCardContent, IonIcon, IonLabel } from '@ionic/react';
import { appsSharp, listSharp } from 'ionicons/icons';

function ProgressUnitCardAdd() {
  const [breadCrumbState, setBreadCrumbState] = useState<any>([{ bName: 'Home', path: '/dashboard' },
  { bName: 'Progress Card', path: '/progress-card-unit-add' }]);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const [selectedTab, setSelectedTab] = useState('unit1');
  const [viewMode, setViewMode] = useState('list');
  const [studentUnitMarks, setStudentUnitMarks] = useState<any>([]);
  const [studentUnitSubjects, setStudentUnitSubjects] = useState<any>([]);
  const unitsScrollRef = useRef<any>(null);
  const parentContainerRef = useRef<any>();

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const tabUnitsData = [
    { id: 'unit1', title: 'Unit 1' },
    { id: 'unit2', title: 'Unit 2' },
    { id: 'unit3', title: 'Unit 3' },
    { id: 'unit4', title: 'Unit 4' },
    { id: 'unit5', title: 'Unit 5' },
  ];

  const handleTabChange = (e: any) => {
    setSelectedTab(e.target.name);
  };

  useEffect(() => {
    if (selectedTab && unitsScrollRef.current) {
      const container = unitsScrollRef.current;
      const selectedButton = container.querySelector(`.${selectedTab}`);

      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();
        const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;

        requestAnimationFrame(() => {
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        });
      }
    }
  }, [selectedTab, viewMode]);


  useEffect(() => {
    setStudentUnitMarks(studentMarksDetails.data);
    setStudentUnitSubjects(studentMarksDetails.subjectsList)
  }, [])

  const handleSubjectMarksChange = (e: any, subjectItem: any, studentItem: any) => {
    debugger
    setStudentUnitMarks(studentUnitMarks.map((stdI: any) => {
      if (stdI.regNumber === studentItem.regNumber) {
        debugger
        const updatedMarks = { ...stdI.marks };
        updatedMarks[subjectItem.subjectId] = e.target.value;
        return { ...stdI, marks: updatedMarks }
      }
      return { ...stdI }
    }))
  }

  return (
    <div className='progress-card-sa'>
      <GBreadCrumbs data={breadCrumbState} />
      <div className='g_flex g-space-between p-12-16'>
        <div className='m-right-6 width-50'>
          <GCustomSelectDrop options={classDummyData} name='classId'
            value={filterValues.classId} label="Select Class"
            handleOnChange={handleChange} classNames='custom-select' />
        </div>
        <div className='m-left-6 width-50'>
          <GCustomSelectDrop options={sectionDummyData} name='sectionId'
            value={filterValues.sectionId} label="Select Section"
            handleOnChange={handleChange} classNames='custom-select' />
        </div>
      </div>
      <div className="g_flex tabs_container_custom">
        <div className="tabs_progress_card" ref={unitsScrollRef}>
          {viewMode === 'list' && (
            <>
              <div className="g_custom_tabs">
                {tabUnitsData.map((tabItem, index: number) => (
                  <button
                    key={index}
                    className={`${tabItem.id} g_custom_tab ${selectedTab === tabItem.id ? 'selected_segment_btn' : ''
                      }`}
                    name={tabItem.id}
                    onClick={handleTabChange}
                  >
                    <IonLabel>{tabItem.title}</IonLabel>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="g_flex g-align-center progress_icons_container">
          <IonIcon
            onClick={() => {
              setViewMode('list');
            }}
            className={`list-view-icon ${viewMode === 'list' && 'selected'}`}
            icon={listSharp}
          ></IonIcon>
          <IonIcon
            onClick={() => {
              setViewMode('grid');
            }}
            className={`grid-view-icon ${viewMode === 'grid' && 'selected'}`}
            icon={appsSharp}
          ></IonIcon>
        </div>
      </div>
      <div className='pr-editable-container'>
        <IonCard className='g_full_height br-8'>
          <IonCardContent className='g_full_height br-8'>
            <div className='table-wrap'>
              <div className="g_flex">
                <div
                  ref={parentContainerRef}
                  style={{
                    width: `25%`,
                    borderRight: '1px solid',
                  }}
                >
                  <div
                    style={{ minHeight: '40px', }}
                    className="g_txt_center g_flex g-align-center g-justify-center marks_column_header"
                  >
                    {'Student Name'}
                  </div>
                  {studentUnitMarks.map((studentItem: any) => (
                    <div
                      key={studentItem.regNumber}
                      style={{
                        minHeight: '40px', lineHeight: '2rem', borderBottom: '1px solid',
                        borderColor: 'rgba(29, 122, 245, 0.25)'
                      }}
                      className="g_txt_center g_flex g-align-center g-justify-center p-h-4"
                    >
                      <div className='g_text_ellipses g_full_width' style={{ lineHeight: '2rem' }}>
                        {studentItem.studentName}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="horizontal_marks_container g_flex g-flex-direction-clm">
                  <div className="g_flex">
                    {studentUnitSubjects.map((subject: any, index: number) => (
                      <div
                        key={subject.subjectId}
                        style={{
                          minWidth: `${(parentContainerRef?.current?.offsetWidth) - 10}px`,
                          width: `${(parentContainerRef?.current?.offsetWidth) - 10 < 50 ? 50 : (parentContainerRef?.current?.offsetWidth) - 10}px`,
                          borderRight:
                            index !== studentUnitSubjects.length - 1 ? '1px solid' : 'none',
                          height: '40px',
                        }}
                        className="g_txt_center g_flex g-align-center g-justify-center marks_column_header p-h-4"
                      >
                        <div style={{ lineHeight: '2rem' }} className='g_text_ellipses g_full_width'>{subject.subjectName}</div>
                      </div>
                    ))}
                  </div>
                  <div className="g_flex">
                    {studentUnitSubjects.map((subjectItem: any, index: number) => (
                      <div
                        key={`sub-${subjectItem.subjectId}`}
                        style={{
                          minWidth: `${(parentContainerRef?.current?.offsetWidth) - 10}px`,
                          width: `${(parentContainerRef?.current?.offsetWidth) - 10 < 50 ? 50 : (parentContainerRef?.current?.offsetWidth) - 10}px`,
                          borderRight:
                            index !== studentUnitSubjects.length - 1 ? '1px solid' : 'none',
                        }}
                      >
                        {studentUnitMarks.map((student: any) => (
                          <div
                            key={`mark-${student.regNumber}-sub-${subjectItem.subjectId}`}
                            style={{
                              minHeight: '40px',
                              borderBottom: '1px solid',
                              borderColor: 'rgba(29, 122, 245, 0.25)'
                            }}
                            className="g_flex g-align-center text-enter-input"
                          >
                            <input onChange={(e: any) => handleSubjectMarksChange(e, subjectItem, student)} id={student.regNumber + subjectItem.subjectId} value={student.marks[subjectItem.subjectId] || ''} placeholder='marks' />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  )
}

export default ProgressUnitCardAdd