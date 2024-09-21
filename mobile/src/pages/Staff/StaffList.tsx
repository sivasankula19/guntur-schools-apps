import {
  IonCard,
  IonCardContent,
  IonSearchbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { classListDummy, sectionListDummy, staffDummyArr } from '../../common/utility';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { useNavigate } from 'react-router';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import GCustomToggle from '../../components/GCustomToggle';

const StaffList: React.FC = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const [search, setSearch] = useState('');
  const staffData = staffDummyArr;
  const navigate = useNavigate();
  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be excuted!!! here
  };

  const navigateToUser = (id: string) => {
    navigate(`/user/${id}`, {state:{parentRout:'/staff-list', parentName:'Staff List'}});
  }

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Staff List', path: '/staff-list' }]

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className='staff g_full_height'>
      <div className="g_flex g-space-between g-align-center bread_toggle_container">
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div>
          <GCustomToggle checked={isFilterEnabled} onHandleChange={handleToggleChange}/>
        </div>
      </div>
      <div className={`${isFilterEnabled ? 'filter_container' : ''}`}>
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
        {staffData.map((item) => (
          <IonCard key={item.id} className="student_card">
            <IonCardContent className="card_content">
              <div className="g_flex g-space-between g-align-center">
                <div className="g_flex first_container g-align-center">
                  <div className="profile_item">
                    <img
                      className="profile-image"
                      src={item.empImage}
                      alt="profile"
                      onClick={() => navigateToUser(item.id)}
                    />
                  </div>
                  <div className="title_designation">
                    <h2 onClick={() => navigateToUser(item.id)} className="title_name">{item.empName}</h2>
                    <p>
                      <span>{`${item.designation}`}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="user_id">
                    Sub : <span className="user_id_data">{item.subject}</span>
                  </div>
                  <div className="class_list_show">
                    Cl : {item.classList.map((cl, index) => <span key={index}>{cl},</span>)}
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

export default StaffList;
