import React, { useEffect } from 'react';
import './ExploreContainer.css';
import Attendance from '../pages/Attendance';
import StudentList from '../pages/StudentList';
import StaffList from '../pages/StaffList';
import ProgressCard from '../pages/ProgressCard/ProgressCard';
import Subjects from '../pages/Subjects';
import FeesDues from '../pages/FeesDues';
import TimeTable from '../pages/TimeTable';
import ExCircularActivities from '../pages/ExCircularActivities';
import Gallery from '../pages/Gallery';
import About from '../pages/About/About';
import ContactUs from '../pages/ContactUs';
import Achievements from '../pages/Achievements';
import SchoolWibe from '../pages/wibe/SchoolWibe';
import Messages from '../pages/messages/Messages';
import ExamSchedule from '../pages/ExamSchedule';
import SchoolAssets from '../pages/SchoolAssets';
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

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <GetComponent name={name} />
    </React.Fragment>
  );
};

const GetComponent = ({ name }: any) => {
  const isStudent = useSelector((state:any)=>state.auth.role) === 'Student'
  switch (name) {
    case 'dashboard':
      return <Dashboard />;
    case 'home':
      return <Home />;
    case 'attendance':
      return <Attendance />;
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
      return <FeesDues />;
    case 'calendar':
      return <TimeTable />;
    case 'gallery':
      return <Gallery />;
    case 'ex-circular':
      return <ExCircularActivities />;
    case 'about':
      return isStudent ? <About /> : <AboutSuperAdmin />;
    case 'academic-subjects':
      return <AcedamicSubject />;
    case 'contact-us':
      return <ContactUs />;
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
