import {
  IonAlert,
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
  useIonRouter,
} from '@ionic/react';

import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import { App as CapacitorApp } from '@capacitor/app';

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
import {
  setIsUserAcknowledgedMode,
  setMode,
} from './redux/reducers/darkModeSlice';
import SelectSchool from './pages/select-school/SelectSchool';
import ChatScreen from './pages/messages/ChatScreen';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/Home/Home';
import Attendance from './pages/Attendance/Attendance';
import ProgressCard from './pages/ProgressCard/ProgressCard';
import Subjects from './pages/Subjects/Subjects';
import StaffList from './pages/Staff/StaffList';
import StudentList from './pages/Students/StudentList';
import Documents from './pages/Documents';
import FeesDues from './pages/FeesDues/FeesDues';
import FeesDuesSA from './pages/FeesDues/FeesDuesSA';
import Calendar from './pages/Calendar/Calendar';
import TimeTable from './pages/TimeTable/TimeTable';
import Gallery from './pages/Gallery';
import SchoolVibe from './pages/vibe/SchoolVibe';
import Achievements from './pages/Achievements';
import Courses from './pages/Courses/Courses';
import ContactUs from './pages/ContactUs/ContactUs';
import About from './pages/About/About';
import ExCircularActivities from './pages/ExCircularActivities';
import Dairy from './pages/Dairy';
import HomeWork from './pages/Homework/HomeWork';
import SchoolAssets from './pages/SchoolAssets/SchoolAssets';
import ExamSchedule from './pages/ExamSchedule/ExamSchedule';
import Messages from './pages/messages/Messages';
import PageNotFound from './pages/PageNotFound';
import AboutSuperAdmin from './pages/About/AboutSuperAdmin';
import ContactUsSa from './pages/ContactUs/ContactUsSa';
import { CoursesSuperAdmin } from './pages/Courses/CoursesSuperAdmin';
import TimeTableSA from './pages/TimeTable/TimeTableSA';
import CalendarSA from './pages/Calendar/CalendarSA';
import { DashboardSA } from './pages/dashboard/DashboardSA';
import SubjectsSA from './pages/Subjects/SubjectsSA';
import SchoolAssetsSA from './pages/SchoolAssets/SchoolAssetsSA';
import AttendanceByClass from './pages/Attendance/AttendanceByClass';
import AttendanceByStudent from './pages/Attendance/AttendanceByStudent';
import AttendanceClassView from './pages/Attendance/AttendanceClassView';
import SchoolClasses from './pages/Class-Sections/SchoolClasses';
import SchoolSections from './pages/Class-Sections/SchoolSections';
import StudentListSA from './pages/Students/StudentListSA';
import StaffListSA from './pages/Staff/StaffListSA';
import ProgressCardSA from './pages/ProgressCard/ProgressCardSA';
import ProgressCardSubjectAdd from './pages/ProgressCard/ProgressCardSubjectAdd';
import AcademicSubject from './pages/AcademicSubject';
import ExamScheduleSA from './pages/ExamSchedule/ExamScheduleSA';
import NotificationsList from './pages/NotificationsList';
import AccessControl from './pages/AccessControl/AccessControl';
import AccessPrivateModules from './pages/AccessControl/AccessPublicModules';
import ModuleAccess from './pages/AccessControl/ModuleAccess';
import Settings from './pages/AccessControl/Settings';
import PeopleTimeTable from './pages/TimeTable/PeopleTimeTable';
import ProgressUnitCardAdd from './pages/ProgressCard/ProgressUnitCardAdd';

setupIonicReact({
  animated: true,
  hardwareBackButton: true,
  experimentalCloseWatcher: true,
});

const App: React.FC = () => {
  const isDarkMode = useSelector((state: any) => state?.darkMode.isDarkMode);
  const [role, setRole] = useState('Student');
  const currentRole = useSelector((state: any) => state.auth.role);
  const isUserAcknowledgedMode = useSelector(
    (state: any) => state?.darkMode.isUserAcknowledgedMode
  );
  // const fullState = useSelector((state: any) => state);
  const school = useSelector((state: any) => state.school.selectedSchool);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  // console.log(fullState)
  // const preLoginModules = useSelector((state:any) => state.)
  const ionRouter = useIonRouter();

  const dispatch = useDispatch();

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  const initializeDarkTheme = (isDark: boolean) => {
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    initializeDarkTheme(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );
  }, []);

  useEffect(() => {
    initializeDarkTheme(isDarkMode);
  }, [isDarkMode]);

  const handleDismissAlert = (ev: any) => {
    dispatch(setIsUserAcknowledgedMode());
    dispatch(setMode(ev.detail.role === 'confirm'));
  };

  useEffect(() => {
    const handleBackButton = (ev: any) => {
      ev.detail.register(10, (processNextHandler: any) => {
        console.log('Handler was called!');
        // get the modal active state via store, if any active then close that modal and don't call processNextHandler 
        processNextHandler();
      });
      ev.detail.register(-1, () => {
        if (!ionRouter.canGoBack()) {
          CapacitorApp.exitApp();
        } else {
          ionRouter.goBack();
        }
      });
    };

    document.addEventListener('ionBackButton', handleBackButton);

    return () => {
      document.removeEventListener('ionBackButton', handleBackButton);
    };
  }, [ionRouter]);

  useEffect(() => {
    if (currentRole)
      setRole(currentRole);
  }, [currentRole]);

  return (
    <IonApp className="dark-theme">
      {/* un comment below after development!!! */}
      {/* <IonAlert
        header="Dark Mode!"
        backdropDismiss={false}
        subHeader="Would you like to use Dark Mode ?"
        message="You can customize it later also in the menu!"
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
      ></IonAlert> */}
      <BrowserRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path="/" element={<Navigate to={school === null ? '/select-school' : isAuthenticated ? '/dashboard' : '/home'} />}></Route>
                <Route path='/home' element={<Home />} />
                <Route path='/dashboard' element={role === 'Student' ? <Dashboard /> : <DashboardSA />} /> //both
                <Route path='/attendance' element={<Attendance />} /> //students
                <Route path='/attendance-by-class' element={<AttendanceByClass />} /> //SA
                <Route path='/attendance-by-class/:routeInfo' element={<AttendanceClassView />} /> //SA
                <Route path='/attendance-by-student' element={<AttendanceByStudent />} /> //SA
                <Route path='/attendance:id' element={<Attendance />} />
                <Route path='/progress-card' element={role === 'Student' ? <ProgressCard /> : <ProgressCardSA />} /> //both
                <Route path='/progress-card-class-subject' element={<ProgressCardSubjectAdd />} />
                <Route path='/progress-card-unit-add' element={<ProgressUnitCardAdd />} />
                <Route path='/time-table' element={role === 'Student' ? <TimeTable /> : <TimeTableSA />} /> //both
                <Route path='/people-time-table' element={<PeopleTimeTable />} />
                <Route path='/calendar' element={role === 'Student' ? <Calendar /> : <CalendarSA />} /> //both
                <Route path='/students-list' element={role === 'Student' ? <StudentList /> : <StudentListSA />} />
                <Route path='/staff-list' element={role === 'Student' ? <StaffList /> : <StaffListSA />} />
                <Route path='/subjects' element={role === 'Student' ? <Subjects /> : <SubjectsSA />} />
                <Route path='/school-vibe' element={<SchoolVibe />} />
                <Route path='/documents' element={<Documents />} />
                <Route path={'/user/:id'} element={<UserByID />} />
                <Route path='/messages' element={<Messages />} />
                <Route path={'/messages/:id'} element={<ChatScreen />} />
                <Route path='/fee-structure' element={role === 'Student' ? <FeesDues /> : <FeesDuesSA />} />
                <Route path='/exam-schedules' element={role === 'Student' ? <ExamSchedule /> : <ExamScheduleSA />} />
                <Route path='/home-work' element={<HomeWork />} />
                <Route path='/diary' element={<Dairy />} />
                <Route path='/school-classes' element={<SchoolClasses />} />
                <Route path='/school-sections' element={<SchoolSections />} />
                <Route path='/my-notifications' element={<NotificationsList />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/access-control' element={<AccessControl />} />
                <Route path='/access-public-modules' element={<AccessPrivateModules />} />
                <Route path='/module-access' element={<ModuleAccess />} />
                {/* public modules! */}
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/ex-circular' element={<ExCircularActivities />} />
                <Route path='/about' element={role === 'Student' ? <About /> : <AboutSuperAdmin />} />
                <Route path='/academic-subjects' element={<AcademicSubject />} />
                <Route path='/contact-us' element={role === 'Student' ? <ContactUs /> : <ContactUsSa />} />
                <Route path='/courses' element={role === 'Student' ? <Courses /> : <CoursesSuperAdmin />} />
                <Route path='/achievements' element={<Achievements />} />
                <Route path='/assets' element={role === 'Student' ? <SchoolAssets /> : <SchoolAssetsSA />} />
              </Route>
              <Route path={'/select-school'} element={<SelectSchool />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </IonRouterOutlet>
        </IonSplitPane>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
