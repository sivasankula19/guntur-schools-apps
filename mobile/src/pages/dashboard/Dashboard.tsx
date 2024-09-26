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
import { studentsChipsData } from '../../common/common-routes-list';

const dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboardRef = useRef<any>(null);

  const chipsData = studentsChipsData

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
