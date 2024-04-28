import {
  IonAlert,
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './Main.css';
import UserByID from './pages/User';
import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserAcknowledgedMode, setMode } from './redux/reducers/darkModeSlice';

setupIonicReact();

const App: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState(true);
  const isDarkMode = useSelector((state: any) => state?.darkMode.isDarkMode);
  const isUserAcknowledgedMode = useSelector((state:any) => state?.darkMode.isUserAcknowledgedMode)
  console.log('---is dark mode', isDarkMode, isUserAcknowledgedMode);

  const dispatch = useDispatch();

  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );
  }, []);

  useEffect(() => {
    initializeDarkTheme(isDarkMode);
  }, [isDarkMode]);

  const handleDismissAlert = (ev: any) => {
    dispatch(setIsUserAcknowledgedMode())
    dispatch(setMode(ev.detail.role === 'confirm'));
  };

  return (
    <IonApp className="dark-theme">
      <IonAlert
        header="Dark Mode!"
        backdropDismiss={false}
        subHeader="Would you like to use Dark Mode ?"
        message="You can customise it later also in the menu!"
        isOpen={isUserAcknowledgedMode === false}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'confirm',
          },
        ]}
        onDidDismiss={handleDismissAlert}
      ></IonAlert>
      <BrowserRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Routes>
              <Route path="/" element={<Navigate to={'/dashboard'} />}></Route>
              <Route path={'/user/:id'} element={<UserByID />}></Route>
              <Route path="/:name" element={<Page />}></Route>
            </Routes>
          </IonRouterOutlet>
        </IonSplitPane>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
