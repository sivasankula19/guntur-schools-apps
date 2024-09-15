import React, { useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonIcon } from '@ionic/react';
import { listSharp, appsSharp } from 'ionicons/icons';

const TimeTable: React.FC = () => {

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Calendar', path: '/calendar' }]
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="g_flex g-space-between g-align-center bread_toggle_container">
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <IonIcon
        onClick={() => {
          setViewMode('list');
        }}
        className={`list-view-icon ${viewMode === 'list' ? 'selected' : ''}`}
        icon={listSharp}
      ></IonIcon>
      <IonIcon
        onClick={() => {
          // setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
          // setViewMode('grid');
        }}
        className={`grid-view-icon ${viewMode === 'grid' ? 'selected' : ''}`}
        icon={appsSharp}
      ></IonIcon>
    </div>
  );
};

export default TimeTable;
