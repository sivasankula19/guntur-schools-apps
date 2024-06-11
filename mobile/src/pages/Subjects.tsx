import {
  IonBreadcrumb,
  IonBreadcrumbs,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from '@ionic/react';
import React, { useState } from 'react';
import { classSubjects } from '../common/utility';
import { calculatorOutline, starOutline } from 'ionicons/icons';
import ProgressBar from '../components/ProgressBar';
import GBreadCrumbs from '../components/GBreadCrumbs';

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
  
  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'Subjects', path:'/subjects'}]

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
              className={`toggle-text ${
                isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
              }`}
            >
              {isFilterEnabled ? 'On' : 'Off'}
            </span>
          </IonToggle>
        </div>
      </div>
      <IonItem className="custom_sub_item">
        <IonSelect
          className="custome_select subjects_cls_select"
          multiple={true}
          label="Select Class"
          labelPlacement="floating"
          fill="outline"
          interface="popover"
          onIonChange={(e) =>
            console.log(`ionChange fired with value: ${e.detail.value}`)
          }
          onIonCancel={() => console.log('ionCancel fired')}
          onIonDismiss={() => console.log('ionDismiss fired')}
        >
          <IonSelectOption value="class-8">Class 8</IonSelectOption>
          <IonSelectOption value="class-9">Class 9</IonSelectOption>
          <IonSelectOption value="class-10">Class 10</IonSelectOption>
          <IonSelectOption value="class-0">Class 0</IonSelectOption>
        </IonSelect>
        <IonSelect
          className="custome_select"
          multiple={true}
          label="Select Class"
          labelPlacement="floating"
          fill="outline"
          interface="popover"
          onIonChange={(e) =>
            console.log(`ionChange fired with value: ${e.detail.value}`)
          }
          onIonCancel={() => console.log('ionCancel fired')}
          onIonDismiss={() => console.log('ionDismiss fired')}
        >
          <IonSelectOption value="class-8">Class 8</IonSelectOption>
          <IonSelectOption value="class-9">Class 9</IonSelectOption>
          <IonSelectOption value="class-10">Class 10</IonSelectOption>
          <IonSelectOption value="class-0">Class 0</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem className="custom_sub_item">
        <IonSearchbar
          showClearButton="focus"
          value={search}
          debounce={500}
          onIonInput={(ev) => handleInput(ev)}
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
                      className={`${
                        item.isFavarouite ? 'subject_selected_icon' : ''
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
                    <a>Marks</a>
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
