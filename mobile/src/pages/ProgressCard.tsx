import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { convertToMultipleWords, unitMarksData } from '../common/utility';
import {
  appsSharp,
  gridSharp,
  listCircleOutline,
  listSharp,
} from 'ionicons/icons';

const ProgressCard: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [
    { bName: 'Home', path: '/' },
    { bName: 'Progress Card', path: '/progress-card' },
  ];

  const [selectedTab, setSelectedTab] = useState('unit1');
  const [viewMode, setViewMode] = useState('list');

  const studentInfo: any = {
    fullName: 'Siva S User',
    Rank: '01',
    classTeacher: 'Some Teacher ',
    year: '2024 - 2025',
    classOfStudy: '8 Class - A Section',
    signOn: false,
  };

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
      <div className='breadcrumbs_progress'>
        <GBreadCrumbs  data={breadCrumbsValue}></GBreadCrumbs>
      </div>
      <div className="progress_card">
      <IonCard>
        <IonCardContent className="progerss_student_content">
          {Object.keys(studentInfo).map((key: string) => (
            <IonItem key={key}>
              <div className="g_flex student_info_item">
                <IonText className="over_text">
                  <span>{convertToMultipleWords(key)}</span>
                </IonText>
                <IonText>
                  {studentInfo[key] === true ? (
                    <>
                      <IonText>
                        <h5 className="success">Signed</h5>
                      </IonText>
                    </>
                  ) : studentInfo[key] === false ? (
                    <>
                      <IonText>
                        <h5 className="danger">Non Signed</h5>
                      </IonText>
                    </>
                  ) : (
                    <p>{studentInfo[key]}</p>
                  )}
                </IonText>
              </div>
            </IonItem>
          ))}
        </IonCardContent>
      </IonCard>

      <div className="g_flex tabs_container_custom">
        <div className="tabs_progress_card">
          {viewMode === 'list' && (
            <>
              <div className="g_custom_tabs">
                {tabUnitsData.map((tabItem, index: number) => (
                  <button
                    key={index}
                    className={`g_custom_tab ${
                      selectedTab === tabItem.id && 'selected_segment_btn'
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
          <RenderSelectedTable
            selectedItem={tabUnitsData.find(
              (tItem) => tItem.id === selectedTab
            )}
            selectedTab={selectedTab}
          />
        </IonCardContent>
      </IonCard>
    </div>
    </>
   
  );
};

export default ProgressCard;

const RenderSelectedTable: React.FC<IBreadCrumbsProps> = ({
  selectedTab,
  selectedItem,
}) => {
  useEffect(() => {
    // make rest API call for fetching unit data
    // make sure previous response data if exists dont call another api untill there was a change in that back response
  }, []);

  const columnData = [
    { name: 'Subject', field: 'subjectName' },
    {name:'Total', field:'total'},
    { name: 'Grade', field: 'grade' },
    { name: 'Marks', field: 'marks' },
    { name: 'Remarks', field: 'remarks' },
  ];

  const [unitData, setUnitData] = useState(unitMarksData);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{selectedItem?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div>
        <div className="g_flex">
          {columnData.map((headItem, hIndex) => (
            <div
              key={hIndex}
              style={{
                width: `${100 / columnData.length}%`,
                borderRight:
                  hIndex !== columnData.length - 1 ? '1px solid' : 'none',
                height: '40px',
              }}
              className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr"
            >
              {headItem.name}
            </div>
          ))}
        </div>
        {unitData.map((unitItem: any, index: number) => (
          <div className="g_flex" key={index}>
            {columnData.map((bodyItem: any, bIndex) => (
              <div
                key={bIndex}
                style={{
                  width: `${100 / columnData.length}%`,
                  borderRight:
                    bIndex !== columnData.length - 1 ? '1px solid' : 'none',
                  color: unitItem[bodyItem.field] === 'Pass' ? 'green' : unitItem[bodyItem.field] === 'Fail' ? 'red' : '',
                  fontWeight: bodyItem.field === 'remarks' ? 'bold' : 'normal',
                }}
                className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr cell_marks"
              >
                {unitItem[bodyItem.field]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <IonFooter>
        <IonToolbar>
          <IonText>
            <p>Total</p>
          </IonText>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

interface IBreadCrumbsProps {
  selectedTab: string;
  selectedItem: { id: string; title: string } | undefined;
}
