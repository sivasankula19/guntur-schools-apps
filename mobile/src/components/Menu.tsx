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
} from '@ionic/react';

import { useLocation, useNavigate } from 'react-router-dom';
import { bookmarkOutline } from 'ionicons/icons';
import './Menu.css';
import { AppPage } from '../common/common-interface';
import { RoutesListDynamic } from '../common/common-routes-list';

const appPages: AppPage[] = RoutesListDynamic;

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonItem>
          <IonAvatar className='menu_avatar'>
            <img
              alt="Silhouette of a person's head"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png"
            />
          </IonAvatar>
          <IonText className='menu_user_name'>
            <h3>{'<StudentName>'}</h3>
            <p>View Profile</p>
          </IonText>
        </IonItem>
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

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
