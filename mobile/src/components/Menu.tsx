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
  IonToggle,
} from '@ionic/react';

import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css';
import { AppPage } from '../common/common-interface';
import { RoutesListDynamic } from '../common/common-routes-list';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/reducers/darkModeSlice';
import { useEffect } from 'react';
import { setPreLoginPublicView } from '../redux/reducers/schoolSlice';

const appPages: AppPage[] = RoutesListDynamic;

const Menu: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state?.darkMode.isDarkMode);
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const authInfo = useSelector((state: any) => state.auth);
  const authUserId = useSelector((state: any) => state?.auth?.user?.regNumber);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleToggleChange = (event: any) => {
    dispatch(setMode(event.detail.checked))
  };

  const publicModules = [{module:'About', path:'about'}, {module:'Courses', path:'courses'},  {module:"Contact-Us", path:"contact-us"},  {module:'Achievements', path:'achievements'},  {module:'Gallery', path:'gallery'},  {module:'Ex-Circular', path:'ex-circular'},]

  const handleNavigation = (path: string) => {
    const selectedPath = publicModules.find(pathItem => pathItem.path === path.slice(1));
    if(selectedPath)
      dispatch(setPreLoginPublicView(selectedPath.module))
    navigate(path);
  };

  const navigateProfile = () => {
    navigate(`/user/${authInfo.user.regNumber}`)
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
                  <IonAvatar className={`menu_avatar ${location.pathname.includes(authUserId)? 'active_img' : ''}`}>
                    <img
                      alt="Silhouette of a person's head"
                      src="https://avatars.githubusercontent.com/u/93701195?s=60&v=4"
                    />
                  </IonAvatar>
                  <IonText className="menu_user_name">
                    <h3>{authInfo?.user?.fullName || 'Name'}</h3>
                    <p className={`${location.pathname.includes(authUserId)? 'active_txt' : ''}`}>View Profile</p>
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
                      className={`${location.pathname === appPage.url ? 'selected selected_app' : ''}`}
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
