import React, { useEffect } from 'react';
import './ExploreContainer.css';
import Dashboard from '../pages/Dashboard';
import Attendance from '../pages/Attendance';
import StudentList from '../pages/StudentList';
import StaffList from '../pages/StaffList';
import Profile from '../pages/Profile';
import ProgressCard from '../pages/ProgressCard';
import Subjects from '../pages/Subjects';
import FeesDues from '../pages/FeesDues';
import TimeTable from '../pages/TimeTable';
import ExCircularActivities from '../pages/ExCircularActivities';
import Gallery from '../pages/Gallery';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Courses from '../pages/Courses';
import Achievements from '../pages/Achievements';
import SchoolWibe from '../pages/SchoolWibe';
import Messages from '../pages/Messages';
import ExamSchedule from '../pages/ExamSchedule';
import SchoolAssets from '../pages/SchoolAssets';
import Remainders from '../pages/Remainders';
import Dairy from '../pages/Dairy';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {

  useEffect(() => {
    console.log('inside', name)
  }, [])
  const getComponent = (name: string) => {
    switch (name) {
      case "dashboard":
        return <Dashboard />
      case "my-attendance":
        return <Attendance />
      case "students-list":
        return <StudentList />
      case "staff-list":
        return <StaffList />
      case "profile":
        return <Profile />
      case "my-progress-card":
        return <ProgressCard />
      case "academic-subjects":
        return <Subjects />
      case "fee-structure":
        return <FeesDues />
      case "time-table":
        return <TimeTable />
      case "Gallery":
        return <Gallery />
      case "extra-curricular-activities":
        return <ExCircularActivities />
      case "about":
        return <About />
      case "contact-us":
        return <ContactUs />
      case "courses":
        return <Courses />
      case "achievements":
        return <Achievements />
      case "school-wibe":
        return <SchoolWibe />
      case "messages":
        return <Messages />
      case "exam-schedules":
        return <ExamSchedule />
      case "assets":
        return <SchoolAssets />
      case "remainders":
        return <Remainders />
      case "diary":
        return <Dairy />

    }
  }
  return (
    <React.Fragment>
      {
        getComponent(name)
      }
    </React.Fragment>
  );
};

export default ExploreContainer;
