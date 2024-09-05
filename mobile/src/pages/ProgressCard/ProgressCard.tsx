import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import {
  appsSharp,
  listSharp,
} from 'ionicons/icons';
import StudentInfoProCard from '../../components/StudentInfoProCard';
import RenderSelectedTableUnit from '../../components/RenderSelectedTableUnit';
import RenderAllExams from '../../components/RenderAllExams';

const ProgressCard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('unit1');
  const [viewMode, setViewMode] = useState('list');

  const unitsScrollRef = useRef<any>(null);
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Progress Card', path: '/progress-card' },];

  const studentInfo: any = {
    fullName: 'Siva S User',
    Rank: '01',
    classTeacher: 'Some Teacher ',
    year: '2024 - 2025',
    classOfStudy: '8 Class - A Section',
    signOn: false,
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectedTab && unitsScrollRef.current) {
        const container = unitsScrollRef.current;
        const selectedButton = container.querySelector(`.${selectedTab}`);

        if (selectedButton) {
          const containerRect = container.getBoundingClientRect();
          const buttonRect = selectedButton.getBoundingClientRect();
          const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }, 1);

  }, [selectedTab, viewMode])

  useEffect(() => {
    setSelectedTab('unit1')
  }, [viewMode])

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

  return (
    <>
      <div className="breadcrumbs_progress">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      </div>
      <div className="progress_card">
        <StudentInfoProCard studentInfo={studentInfo} />
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
          <div className="g_flex g_align_cntr progress_icons_container">
            <IonIcon
              onClick={() => {
                setViewMode('list');
              }}
              className={`list_viwe_icon ${viewMode === 'list' && 'selected'}`}
              icon={listSharp}
            ></IonIcon>
            <IonIcon
              onClick={() => {
                setViewMode('grid');
              }}
              className={`grdi_view_icon ${viewMode === 'grid' && 'selected'}`}
              icon={appsSharp}
            ></IonIcon>
          </div>
        </div>
        <IonCard>
          <IonCardContent className="progress_marks_view">
            {viewMode === 'list' ? (
              <>
                <RenderSelectedTableUnit
                  selectedItem={tabUnitsData.find(
                    (tItem) => tItem.id === selectedTab
                  )}
                  selectedTab={selectedTab}
                />
              </>
            ) : (
              <>
                <RenderAllExams></RenderAllExams>
              </>
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </>
  );
};

export default ProgressCard;
