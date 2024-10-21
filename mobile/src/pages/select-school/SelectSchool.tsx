import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonText,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Footer from '../../components/Footer';
import { schoolsListData } from '../../common/utility';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSchool } from '../../redux/reducers/schoolSlice';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

interface ISchoolObj {
  schoolId: string;
  schoolName: string;
}

const SelectSchool: React.FC = () => {
  const [search, setSearch] = useState('');
  const [schoolsList, setSchoolsList] = useState<ISchoolObj[]>([]);
  const getSelectedSchool = useSelector((state: any) => state.school.selectedSchool);
  // const [selectedSchoolVal, setSelectedSchoolVal] = useState<ISchoolObj | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectedSchool = (selectedScl: ISchoolObj) => {
    if (getSelectedSchool?.schoolId === selectedScl.schoolId) {
      // setSelectedSchoolVal(null)
      dispatch(setSelectedSchool(null));
    } else {
      dispatch(setSelectedSchool(selectedScl));
      // setSelectedSchoolVal(selectedScl);
    }
  };

  const handleProceed = () => {
    // dispatch(setSelectedSchool(selectedSchoolVal));
    navigate('/home');
  };

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    setSchoolsList(schoolsListData.filter((school) => ((school.schoolName).toLowerCase().includes((ev.target.value).toLowerCase())) || ev.target.value == ''))
    //  debounce function can be executed!!! here i.e api
  };

  useEffect(() => {
    setSchoolsList(schoolsListData);
  }, []);

  return (
    <IonPage className="my_page">
      <IonContent class='custom_content_view' fullscreen>
        <div className="select_school_page">
          <IonCard>
            <IonCardContent>
              <div className="container_full_select">
                <div className="g-justify-center g_flex g-app-logo-container">
                  <div className="g_app_logo"></div>
                </div>
                <div className="app_info_content">
                  <IonText>
                    <p>Welcome To Vyuham Please Search your School and Explore</p>
                  </IonText>
                </div>
                <div className="select_holder">
                  <IonSearchbar
                    placeholder="Please Search School"
                    animated={true}
                    color="primary"
                    showClearButton="focus"
                    value={search}
                    debounce={500}
                    onIonInput={handleInput}
                  ></IonSearchbar>
                  <div className="school_list_show_container">
                    <IonList>
                      {schoolsList.length ? (<>
                        {schoolsList.map((schoolItem, index) => (
                          <IonItem
                            onClick={() => handleSelectedSchool(schoolItem)}
                            className={`${index === 0 ? 'first_item' : ''} ${getSelectedSchool?.schoolId ===
                              schoolItem.schoolId ? 'school_item_selected' : ''
                              }`}
                            key={schoolItem.schoolId}
                          >
                            <div className='select_an_item'>
                              <IonText className={`${getSelectedSchool?.schoolId === schoolItem.schoolId ? 'is_icon_present' : ''}`}>
                                <p>{schoolItem.schoolName}</p>
                              </IonText>
                              {getSelectedSchool && getSelectedSchool?.schoolId === schoolItem.schoolId && <>
                                <IonIcon icon={checkmarkCircleOutline}></IonIcon>
                              </>}
                            </div>
                          </IonItem>
                        ))}
                      </>) : (<>
                        {search.length ? <>
                          <IonText className='g_txt_center'><p>{`No Schools With ${search} Keyword!.`}</p></IonText>
                        </> : <>
                          <IonText className='g_txt_center'><p>Please Try Again Later!.</p></IonText>
                        </>}
                      </>)}

                    </IonList>
                  </div>
                </div>
                <div className="select_btn_holder">
                  <IonButton
                    onClick={handleProceed}
                    disabled={getSelectedSchool === null}
                  >
                    Proceed
                  </IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default SelectSchool;
