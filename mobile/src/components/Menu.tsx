import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonText,
  IonToggle,
} from '@ionic/react';

import { useLocation, useNavigate } from 'react-router-dom';
import { bookmarkOutline, sunnyOutline } from 'ionicons/icons';
import './Menu.css';
import { AppPage } from '../common/common-interface';
import { RoutesListDynamic } from '../common/common-routes-list';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/reducers/darkModeSlice';

const appPages: AppPage[] = RoutesListDynamic;

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
console.log(',embdcgbdc')
const Menu: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state?.darkMode.isDarkMode);
  const authInfo = useSelector((state: any) => state.auth)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleToggleChange = (event: any) => {
    dispatch(setMode(event.detail.checked))
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const navigateProfile = () => {
    navigate(`/user/${authInfo.user.regNumber}`)
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent className='custom_side_content'>
        <div className='side_menu_container'>
          <div className='profile_menu'>
            <IonMenuToggle autoHide={false}>
              <IonItem className='menu_user_info' onClick={navigateProfile}>
                <div className='g_flex'>
                  <IonAvatar className="menu_avatar">
                    <img
                      alt="Silhouette of a person's head"
                      src="https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106"
                    />
                  </IonAvatar>
                  <IonText className="menu_user_name">
                    <h3>{authInfo?.user?.fullName || 'Name'}</h3>
                    <p>View Profile</p>
                  </IonText>
                </div>
              </IonItem>
            </IonMenuToggle>
          </div>
          <div className='menu_items_holder'>
            <IonList id="inbox-list">
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={`${location.pathname === appPage.url ? 'selected' : ''}`}
                      lines="none"
                      onClick={() => handleNavigation(appPage.url)}
                      detail={false}
                    >
                      <IonIcon
                        aria-hidden="true"
                        slot="start"
                        ios={appPage.iosIcon}
                        md={appPage.mdIcon}
                      />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </div>
          <div className='menu_dark_mode_holder'>
            <div className="g_flex dark_mode_container">
              <div className='g_flex g_align_cntr'><IonLabel>Dark Mode</IonLabel> </div>
              <div>
                <IonToggle
                  className="custom-toggle"
                  checked={isDarkMode}
                  onIonChange={handleToggleChange}
                >
                  <span
                    className={`toggle-text ${isDarkMode ? 'enabled_filter' : 'disabled_filter'
                      }`}
                  >
                    {isDarkMode ? 'On' : 'Off'}
                  </span>
                </IonToggle>
              </div>
            </div>
          </div>
        </div>
        {/* <IonMenuToggle autoHide={false}>
          <IonItem className='menu_user_info' onClick={navigateProfile}>
            <div className='g_flex'>
              <IonAvatar className="menu_avatar">
                <img
                  alt="Silhouette of a person's head"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png"
                />
              </IonAvatar>
              <IonText className="menu_user_name">
                <h3>{authInfo?.user?.fullName || 'Name'}</h3>
                <p>View Profile</p>
              </IonText>
            </div>
          </IonItem>
        </IonMenuToggle>
        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  lines="none"
                  onClick={() => handleNavigation(appPage.url)}
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <div className="g_flex dark_mode_container">
          <div className='g_flex g_align_cntr'><IonLabel>Dark Mode</IonLabel> </div>
          <div>
            <IonToggle
              className="custom-toggle"
              checked={isDarkMode}
              onIonChange={handleToggleChange}
            >
              <span
                className={`toggle-text ${
                  isDarkMode ? 'enabled_filter' : 'disabled_filter'
                }`}
              >
                {isDarkMode ? 'On' : 'Off'}
              </span>
            </IonToggle>
          </div>
        </div> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
