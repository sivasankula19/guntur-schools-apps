import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonText,
} from '@ionic/react';

import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css';
import { AppPage } from '../common/common-interface';
import { chipsDataPrivate, chipsDataPublic, RoutesListDynamic, studentsChipsData } from '../common/common-routes-list';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/reducers/darkModeSlice';
import React, { useEffect, useState } from 'react';
import { setPreLoginPublicView } from '../redux/reducers/schoolSlice';
import GCustomToggle from './GCustomToggle';
import { cogOutline, handRightOutline, homeOutline, keyOutline, settingsOutline } from 'ionicons/icons';

const appPages: AppPage[] = RoutesListDynamic;

const Menu: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state?.darkMode.isDarkMode);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const authInfo = useSelector((state: any) => state.auth);
  const authUserId = useSelector((state: any) => state?.auth?.user?.regNumber);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chipsToRender, setChipsRender] = useState<any>([]);
  const [privateChipsToRender, setPrivateChipsToRender] = useState<any>([]);
  const currentRole = useSelector((state: any) => state.auth.role);

  const chipsDataPrivate1 = chipsDataPrivate;
  const chipsDataPublic1 = chipsDataPublic;

  useEffect(() => {
    if (currentRole === "Student") {
      const updatedStudentChips = [...studentsChipsData];
      const dashboardItem = { id: Math.random(), moduleName: 'Dashboard', icon: homeOutline, redirectTo: '/dashboard' }
      updatedStudentChips.unshift(dashboardItem);
      setChipsRender([...updatedStudentChips])
    } else if (currentRole === 'Parent') {

    } else {
      let chipsData = [...chipsDataPrivate1];
      if (currentRole === 'SuperAdmin') {
        chipsData.unshift({ id: 997, moduleName: 'Requests', icon: handRightOutline, redirectTo: '/raised-requests' });
        chipsData.unshift({ id: 998, moduleName: 'Configurations', icon: cogOutline, redirectTo: '/app-configurations' });
        chipsData.unshift({ id: 999, moduleName: 'Access Control', icon: keyOutline, redirectTo: '/access-control' });
      }
      const dashboardItem = { id: Math.random(), moduleName: 'Dashboard', icon: homeOutline, redirectTo: '/dashboard' }
      chipsData.unshift(dashboardItem);
      const chipsDataPrivateVal = [...chipsDataPublic1]
      setChipsRender(chipsData);
      setPrivateChipsToRender(chipsDataPrivateVal);
    }
  }, [currentRole]);

  const handleToggleChange = (event: any) => {
    dispatch(setMode(event.detail.checked))
  };

  const publicModules = [{ module: 'About', path: 'about' }, { module: 'Courses', path: 'courses' }, { module: "Contact-Us", path: "contact-us" }, { module: 'Achievements', path: 'achievements' }, { module: 'Gallery', path: 'gallery' }, { module: 'Ex-Circular', path: 'ex-circular' },]

  const handleNavigation = (path: string) => {
    const selectedPath = publicModules.find(pathItem => pathItem.path === path.slice(1));
    if (selectedPath)
      dispatch(setPreLoginPublicView(selectedPath.module))
    navigate(path);
  };

  const navigateProfile = () => {
    navigate(`/user/${authInfo.user.regNumber}`)
  }

  const handleSettingScreen = () => {
    navigate('/settings')
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent className='custom_side_content'>
        <div className='side_menu_container'>
          {
            isAuthenticated ? <>
              <div className='profile_menu'>
                <IonMenuToggle autoHide={false}>
                  <IonItem className='menu_user_info' onClick={navigateProfile}>
                    <div className='g_flex'>
                      <IonAvatar className={`menu_avatar ${location.pathname.includes(authUserId) ? 'active_img' : ''}`}>
                        <img
                          alt="Silhouette of a person's head"
                          src="https://avatars.githubusercontent.com/u/93701195?s=60&v=4"
                        />
                      </IonAvatar>
                      <IonText className="menu_user_name">
                        <h3>{authInfo?.user?.fullName || 'Name'}</h3>
                        <p className={`${location.pathname.includes(authUserId) ? 'active_txt' : ''}`}>View Profile</p>
                      </IonText>
                    </div>
                  </IonItem>
                </IonMenuToggle>
              </div>
              <div className='menu_items_holder'>
                <IonList id="inbox-list">
                  {[...chipsToRender, ...privateChipsToRender].map((appPage, index) => {
                    return (
                      <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                          className={`menu_item_con ${location.pathname === appPage.redirectTo ? 'selected selected_app' : ''}`}
                          lines="none"
                          onClick={() => handleNavigation(appPage.redirectTo)}
                          detail={false}
                        >
                          <IonIcon
                            aria-hidden="true"
                            slot="start"
                            icon={appPage.icon}
                          />
                          <IonLabel>{appPage.moduleName}</IonLabel>
                        </IonItem>
                      </IonMenuToggle>
                    );
                  })}
                </IonList>
              </div>
              <div className='g_flex g-space-between g-align-center menu_dark_mode_holder'>
                <div className="g_flex dark-mode-container">
                  <div className='g_flex g-align-center'><IonLabel>Dark Mode</IonLabel> </div>
                  <GCustomToggle checked={isDarkMode} onHandleChange={handleToggleChange} />
                </div>
                <div className='menu-settings'>
                  <IonMenuToggle autoHide={false}>
                    <IonIcon onClick={handleSettingScreen} icon={settingsOutline}></IonIcon>
                  </IonMenuToggle>
                </div>
              </div>
            </> : <>
              Not Auth
            </>
          }

        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
