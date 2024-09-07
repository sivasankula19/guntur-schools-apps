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
import { classListDummy, sectionListDummy, studentDummyData } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';

const StudentList: React.FC = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const [search, setSearch] = useState('');
  const studentsDataList = studentDummyData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const count = useSelector((state: any) => state.counter);

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be executed!!! here
  };

  const navigateToUser = (id: string) => {
    navigate(`/user/${id}`)
  }

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Students List', path: '/students-list' }];

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className='g_full_height'>
      <div className="g_flex g-space-between g-align-center bread_toggle_container">
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
      <div className={`${isFilterEnabled && 'filter_container'}`}>
        {isFilterEnabled && (
          <IonCard className="filter-card">
            <IonCardContent className="filter_card_content">
              <IonSearchbar
                showClearButton="focus"
                value={search}
                debounce={500}
                onIonInput={handleInput}
              ></IonSearchbar>
              <div className="g_flex g-space-between select-container">
                <div style={{ width: '47%' }}>
                  <GCustomSelectDrop options={classDummyData} name='classId'
                    value={filterValues.classId} label="Select Class"
                    handleOnChange={handleChange} classNames='custom-select' />
                </div>
                <div style={{ width: '47%' }}>
                  <GCustomSelectDrop options={sectionDummyData} name='sectionId'
                    value={filterValues.sectionId} label="Select Section"
                    handleOnChange={handleChange} classNames='custom-select' />
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
              <div className="g_flex g-space-between g-align-center">
                <div className="g_flex first_container g-align-center">
                  <div className="profile_item">
                    <img
                      onClick={() => navigateToUser(item.id)}
                      className="profile-image"
                      src={item.profileImage}
                      alt="profile"
                    />
                  </div>
                  <div className="title_designation">
                    <h2 onClick={() => navigateToUser(item.id)} className="title_name">{item.studentName}</h2>
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
