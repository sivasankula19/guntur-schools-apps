import React, { useEffect, useRef, useState } from 'react';
import NavChipCard from '../../components/NavChipsCard';
import './Dashboard.css';
import {
  bookOutline,
  businessOutline,
  calendarOutline,
  callOutline,
  chatboxOutline,
  documentOutline,
  documentTextOutline,
  imageOutline,
  informationCircleOutline,
  newspaperOutline,
  peopleOutline,
  ribbonOutline,
  schoolOutline,
  trophyOutline,
  walletOutline,
} from 'ionicons/icons';
import DashboardTimeView from './DashboardTimeView';

const dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboardRef = useRef<any>(null);

  const chipsData = [
    { id: 1, moduleName: 'Attendance', icon: calendarOutline, redirectTo: '/attendance' },
    { id: 2, moduleName: 'Progress Card', icon: documentTextOutline, redirectTo: '/progress-card' },
    { id: 3, moduleName: 'Home Work', icon: bookOutline, redirectTo: '/home-work' },
    { id: 4, moduleName: 'My Subjects', icon: schoolOutline, redirectTo: '/subjects' },
    { id: 5, moduleName: 'Messages', icon: chatboxOutline, redirectTo: '/messages' },
    { id: 6, moduleName: 'Documents', icon: documentOutline, redirectTo: '/documents' },
    { id: 7, moduleName: 'My Staff', icon: peopleOutline, redirectTo: '/staff-list' },
    { id: 8, moduleName: 'My Friends', icon: peopleOutline, redirectTo: '/students-list' },
    { id: 9, moduleName: 'Calendar', icon: calendarOutline, redirectTo: '/calendar' },
    { id: 10, moduleName: 'Vibe', icon: newspaperOutline, redirectTo: '/school-vibe' },
    { id: 11, moduleName: 'Exam Schedules', icon: calendarOutline, redirectTo: '/exam-schedules' },
    { id: 12, moduleName: 'My Dues', icon: walletOutline, redirectTo: '/fee-structure' },
    { id: 13, moduleName: 'Assets', icon: businessOutline, redirectTo: '/assets' },
    { id: 14, moduleName: 'Ex-Circular', icon: ribbonOutline, redirectTo: '/ex-circular' },
    { id: 15, moduleName: 'Gallery', icon: imageOutline, redirectTo: '/gallery' },
    { id: 16, moduleName: 'Achievements', icon: trophyOutline, redirectTo: '/achievements' },
    { id: 17, moduleName: 'Contact-Us', icon: callOutline, redirectTo: '/contact-us' },
    { id: 18, moduleName: 'About', icon: informationCircleOutline, redirectTo: '/about' },
  ];

  const handleViewMode = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    scrollToTop()
  }, [isOpen])

  const scrollToTop = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollTop = 0;
    }
  };

  return (
    <div ref={dashboardRef} className='dashboard-container'>
      <div className="dashboard">
        <NavChipCard
          isOpen={isOpen}
          handleView={handleViewMode}
          chips={chipsData.slice(0, isOpen ? undefined : 9)}
        ></NavChipCard>
      </div>
      <DashboardTimeView dashboardRef={dashboardRef} />
    </div>
  );
};

export default dashboard;
