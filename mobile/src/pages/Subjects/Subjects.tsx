import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonSearchbar,
  IonText,
  IonToggle,
} from '@ionic/react';
import React, { useState } from 'react';
import { classSubjects } from '../../common/utility';
import { starOutline } from 'ionicons/icons';
import ProgressBar from '../../components/ProgressBar';
import GBreadCrumbs from '../../components/GBreadCrumbs';

const Subjects: React.FC = () => {
  const [data, setData] = useState(classSubjects);
  const [search, setSearch] = useState('');
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be excuted!!! here
  };

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Subjects', path: '/subjects' }]

  return (
    <div className='subjects'>
      <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div>
          <IonToggle
            className="custom-toggle"
            checked={isFilterEnabled}
            onIonChange={handleToggleChange}
          >
            <span
              className={`toggle-text ${isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
                }`}
            >
              {isFilterEnabled ? 'On' : 'Off'}
            </span>
          </IonToggle>
        </div>
      </div>
      <IonItem className="custom_sub_item">
        <IonSearchbar
          showClearButton="focus"
          value={search}
          debounce={500}
          onIonInput={handleInput}
        ></IonSearchbar>
      </IonItem>
      <div className="subjects_cls_container">
        <IonList>
          {data.map((item) => (
            <IonCard key={item.subjectCode}>
              <IonCardContent className="subject_item_card_content">
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
                    <IonText className="subject_text_name">
                      <h3>{item.subjectName}</h3>
                    </IonText>
                    <div className="progress_container g_flex g_align_cntr">
                      <ProgressBar filled={item.percentCovered}></ProgressBar>
                    </div>
                    <IonIcon
                      className={`${item.isFavarouite ? 'subject_selected_icon' : ''
                        }`}
                      icon={starOutline}
                    ></IonIcon>
                  </div>
                </IonItem>
                <IonItem>
                  <div className="g_flex g_space_btwn g_full_width">
                    <IonText>
                      <a>{item.subjectTeacher}</a>
                    </IonText>
                    <IonText>
                      <a>Time Table</a>
                    </IonText>
                    <IonText>
                      <a>Marks</a>
                    </IonText>
                    <IonText>
                      <p>{item.class} - {item.section}</p>
                    </IonText>
                  </div>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </div>
    </div>
  );
};

export default Subjects;
