import {
  IonButton,
  IonCard,
  IonCardContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/react';
import React, { useState } from 'react';
import { studentDummyData } from '../common/utility';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../redux/reducers/counterSlice';
import { useNavigate } from 'react-router';

const StudentList: React.FC = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const [search, setSearch] = useState('');
  const studentsDataList = studentDummyData;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const count = useSelector((state:any) => state.counter);

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be excuted!!! here
  };

  const navigateToUser = (id:string) => {
    navigate(`/user/${id}`)
  }

  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'Students List', path:'/students-list'}]

  return (
    <div>
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
      <div className={`${isFilterEnabled && 'filter_container'}`}>
        {isFilterEnabled && (
          <IonCard className="filter-card">
            <IonCardContent className="filter_card_content">
              <IonSearchbar
                showClearButton="focus"
                value={search}
                debounce={500}
                onIonInput={(ev) => handleInput(ev)}
              ></IonSearchbar>
              <div className="g_flex g_space_btwn select_conatainer">
                <div style={{ width: '47%' }}>
                  <IonSelect
                    className="custome_select"
                    multiple={true}
                    label="Select Class"
                    labelPlacement="floating"
                    fill="outline"
                    interface="popover"
                    onIonChange={(e) =>
                      console.log(
                        `ionChange fired with value: ${e.detail.value}`
                      )
                    }
                    onIonCancel={() => console.log('ionCancel fired')}
                    onIonDismiss={() => console.log('ionDismiss fired')}
                  >
                    <IonSelectOption value="class-8">Class 8</IonSelectOption>
                    <IonSelectOption value="class-9">Class 9</IonSelectOption>
                    <IonSelectOption value="class-10">Class 10</IonSelectOption>
                    <IonSelectOption value="class-0">Class 0</IonSelectOption>
                  </IonSelect>
                </div>
                <div style={{ width: '47%' }}>
                  <IonSelect
                    multiple={true}
                    className="custome_select"
                    label="Select Section"
                    labelPlacement="floating"
                    fill="outline"
                    interface="popover"
                  >
                    <IonSelectOption value="A-Section">
                      A Section
                    </IonSelectOption>
                    <IonSelectOption value="B-Section">
                      B Section
                    </IonSelectOption>
                    <IonSelectOption value="C-Section">
                      C section
                    </IonSelectOption>
                  </IonSelect>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </div>
      <div className={`students_cards_container ${!isFilterEnabled ? 'with_filter_off' : ''}`}>
        {studentsDataList.map((item) => (
          <IonCard key={item.id} className="student_card">
            <IonCardContent className="card_content">
              <div className="g_flex g_space_btwn g_align_cntr">
                <div className="g_flex first_container g_align_cntr">
                  <div className="profile_item">
                    <img
                    onClick={()=>navigateToUser(item.id)}
                      className="prifile_image"
                      src={item.profileImage}
                      alt="profile"
                    />
                  </div>
                  <div className="title_designation">
                    <h2 onClick={()=>navigateToUser(item.id)} className="title_name">{item.studentName}</h2>
                    <p>
                      <span>{`${item.class} ${item.section}`}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="user_id">
                    Student Id : <span className="user_id_data">{item.id}</span>
                  </div>
                  <div className="g_flex">
                    <IonButton className="card_btn">Add Friend</IonButton>
                    <IonButton className="card_btn message_btn">
                      Message
                    </IonButton>
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
