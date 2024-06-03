import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonItem,
} from '@ionic/react';
import { expandOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router';
import { setPreLoginPublicView } from '../../redux/reducers/schoolSlice';

const Home: React.FC = () => {
  const preLoginBtns = [
    { name: 'About', redirectTo: '/about' },
    { name: 'Courses', redirectTo: '/courses' },
    { name: 'Contact-Us', redirectTo: '/contact-us' },
    { name: 'Achievement', redirectTo: '/achievements' },
    { name: 'Gallery', redirectTo: '/gallery' },
    { name: 'Ex-Circular', redirectTo: '/ex-circular' },
  ];

  const [userName, setUserName] = useState('Y248B039');
  const [password, setPassword] = useState('someKey@123');
  const selectedSchool = useSelector((state:any)=>state.school.selectedSchool)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('e submitted', userName, password);
    // perform login API call fetch the user auth token
    const payload = {
      token: 'someTokenValue',
      role:'Student',
      user:{
        fullName:'Siva Sankula',
        classOfStudy:'8th Class',
        section:'A Section',
        mobileNumber:'7995954105',
        emailAddress:'sivauser@gvtschool.com',
        regNumber:'Y248A039',
        dob:'01/01/2000',
        gender:'male'
      }
    }
    dispatch(authenticateUser(payload))
    navigate('/dashboard')
  };

  const handleUserName = (e: any) => {
    setUserName(e.detail.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.detail.value);
  };

  const handleNavigate = (path:string, module:string) => {
    dispatch(setPreLoginPublicView(module))
    navigate(path)
  }

  return (
    <div className="home_container">
      <div className="school_logo_image_hoem custom_g_height_10">
        <div className="logo_contain">School Logo</div>
      </div>
      <div className="g_map_school_location">
        <div>Google Map</div>
        <div className="map_logo_expand">
          <IonIcon icon={expandOutline}></IonIcon>
        </div>
      </div>
      <div className="g_txt_center custom_g_height_10 g_flex g_align_cntr">
        <div className="home_info_continer">
          <p>Welecome to {selectedSchool?.schoolName || "SomeScl"},</p>
          <p>Please Login</p>
        </div>
      </div>
      <div className="login_form_content">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonInput
                  value={userName}
                  onIonInput={handleUserName}
                  className="custom-ion-input_home"
                  label={'User ID'}
                  labelPlacement="floating"
                  fill="outline"
                  placeholder={`Enter User ID`}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  value={password}
                  type="password"
                  onIonInput={handlePassword}
                  className="custom-ion-input_home"
                  label={'Password'}
                  labelPlacement="floating"
                  fill="outline"
                  placeholder={`Enter Password`}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonButton type="submit">Login</IonButton>
              </IonItem>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
      <IonItem className="custom_btns_item">
        <div className="pre_login_btns">
          {preLoginBtns.map((btnItem) => (
            <IonButton onClick={()=>handleNavigate(btnItem.redirectTo, btnItem.name)} key={btnItem.name}>{btnItem.name}</IonButton>
          ))}
        </div>
      </IonItem>
    </div>
  );
};

export default Home;
