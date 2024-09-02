import React, { useEffect } from 'react';
import './ExploreContainer.css';
import Attendance from '../pages/Attendance/Attendance';
import StudentList from '../pages/StudentList';
import StaffList from '../pages/StaffList';
import ProgressCard from '../pages/ProgressCard/ProgressCard';
import Subjects from '../pages/Subjects/Subjects';
// import FeesDues from '../pages/FeesDues';
import TimeTable from '../pages/TimeTable/TimeTable';
import ExCircularActivities from '../pages/ExCircularActivities';
import Gallery from '../pages/Gallery';
import About from '../pages/About/About';
import ContactUs from '../pages/ContactUs/ContactUs';
import Achievements from '../pages/Achievements';
import SchoolWibe from '../pages/wibe/SchoolWibe';
import Messages from '../pages/messages/Messages';
import ExamSchedule from '../pages/ExamSchedule';
import SchoolAssets from '../pages/SchoolAssets/SchoolAssets';
import HomeWork from '../pages/Homework/HomeWork';
import Dairy from '../pages/Dairy';
import AcedamicSubject from '../pages/AcedamicSubjects';
import Documents from '../pages/Documents';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/Home/Home';
import { useSelector } from 'react-redux';
import AboutSuperAdmin from '../pages/About/AboutSuperAdmin';
import Courses from '../pages/Courses/Courses';
import { CoursesSuperAdmin } from '../pages/Courses/CoursesSuperAdmin';
import { DashboardSA } from '../pages/dashboard/DashboardSA';
import ContactUsSa from '../pages/ContactUs/ContactUsSa';
import TimeTableSA from '../pages/TimeTable/TimeTableSA';
import Calendar from '../pages/Calendar/Calendar';
import CalendarSA from '../pages/Calendar/CalendarSA';
import FeesDues from '../pages/Fees/FeesDues';
import FeesDuesSA from '../pages/Fees/FeesDuesSA';
// import AttendanceClassSelect from '../pages/Attendance/AttendanceClassSelect';
// import AttendanceContainer from '../pages/Attendance/AttendanceContainer';


interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const isStudent = useSelector((state:any)=>state.auth.role) === 'Student' || useSelector((state:any)=>state.auth.role) === '';
  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <GetComponent name={name} isStudent={isStudent}/>
    </React.Fragment>
  );
};

const GetComponent = ({ name, isStudent }: any) => {
 
  switch (name) {
    case 'dashboard':
      return isStudent ? <Dashboard /> : <DashboardSA />;
    case 'home':
      return <Home />;
    // case 'attendance':
    //   return isStudent ? <Attendance editable={false} /> : <AttendanceContainer />;
    case 'progress-card':
      return <ProgressCard />;
    case 'students-list':
      return <StudentList />;
    case 'staff-list':
      return <StaffList />;
    case 'subjects':
      return <Subjects />;
    case 'documents':
      return <Documents />;
    case 'fee-structure':
      return isStudent ? <FeesDues /> : <FeesDuesSA />;
    case 'calendar':
      return isStudent ? <Calendar /> : <CalendarSA />;
    case 'time-table':
      return isStudent ? <TimeTable /> : <TimeTableSA />;
    case 'gallery':
      return <Gallery isStudent={isStudent}/>;
    case 'ex-circular':
      return <ExCircularActivities />;
    case 'about':
      return isStudent ? <About /> : <AboutSuperAdmin />;
    case 'academic-subjects':
      return <AcedamicSubject />;
    case 'contact-us':
      return isStudent ? <ContactUs /> : <ContactUsSa />;
    case 'courses':
      return isStudent ? <Courses /> : <CoursesSuperAdmin />;
    case 'achievements':
      return <Achievements />;
    case 'school-wibe':
      return <SchoolWibe />;
    case 'messages':
      return <Messages />;
    case 'exam-schedules':
      return <ExamSchedule />;
    case 'assets':
      return <SchoolAssets />;
    case 'home-work':
      return <HomeWork />;
    case 'diary':
      return <Dairy />;
  }
};

export default ExploreContainer;
