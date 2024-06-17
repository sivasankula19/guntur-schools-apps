import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonText,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Footer from '../../components/Footer';
import { schoolsListData } from '../../common/utility';
import { useDispatch } from 'react-redux';
import { setSelectedSchool } from '../../redux/reducers/schoolSlice';
import { closeCircleOutline, cropOutline } from 'ionicons/icons';

interface ISchoolObj {
  schoolId: string;
  schoolName: string;
}

const SelectSchool: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const [schoolsList, setSchoolsList] = useState<ISchoolObj[]>(schoolsListData);
  const [selectedSchoolVal, setSelectedSchoolVal] = useState<ISchoolObj | null>(
    null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectedSchool = (selectedScl: ISchoolObj) => {
    if(selectedSchoolVal?.schoolId === selectedScl.schoolId){
      setSelectedSchoolVal(null)
    } else {
    setSelectedSchoolVal(selectedScl);
    }
  };

  const handleProceed = () => {
    dispatch(setSelectedSchool(selectedSchoolVal));
    navigate('/home');
  };

  return (
    <IonPage className="my_page">
      <IonContent class='custom_content_view' fullscreen>
        <div className="select_school_page">
          <IonCard>
            <IonCardContent>
              <div className="container_full_select">
                <div className="g_jstfy_content_cntr g_flex g_app_logo_conatiner">
                  <div className="g_app_logo"></div>
                </div>
                <div className="app_info_content">
                  <IonText>
                    <p>Welcome To *** Please Search your School and Explore</p>
                  </IonText>
                </div>
                <div className="select_holder">
                  <IonSearchbar
                    placeholder="Please Search School"
                    animated={true}
                    color="primary"
                  ></IonSearchbar>
                  <div className="school_list_show_container">
                    <IonList>
                      {schoolsList.map((schoolItem, index) => (
                        <IonItem
                          onClick={() => handleSelectedSchool(schoolItem)}
                          className={`${index === 0 ? 'first_item' : ''} ${
                            selectedSchoolVal?.schoolId ===
                              schoolItem.schoolId ? 'school_item_selected' : ''
                          }`}
                          key={schoolItem.schoolId}
                        >
                          <div className='select_an_item'>
                          <IonText className={`${selectedSchoolVal?.schoolId === schoolItem.schoolId ? 'is_icon_present' : ''}`}>
                            <p>{schoolItem.schoolName}</p>
                          </IonText>
                          {selectedSchoolVal && selectedSchoolVal.schoolId === schoolItem.schoolId && <>
                            <IonIcon icon={closeCircleOutline}></IonIcon>
                          </>}
                          </div>
                       
                        </IonItem>
                      ))}
                    </IonList>
                  </div>
                </div>
                <div className="select_btn_holder">
                  <IonButton
                    onClick={handleProceed}
                    disabled={selectedSchoolVal === null}
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
