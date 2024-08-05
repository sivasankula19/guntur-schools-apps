import React, { useState } from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonText } from '@ionic/react';
import { listSharp, appsSharp } from 'ionicons/icons';
import { transformListToGrid, getDatesForMonth } from '../../common/utility';

const TimeTable: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{bName:'Home', path:'/dashboard'},{bName:'Calendar', path:'/calendar'}]
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs> 
      <IonIcon 
            onClick={() => {
              setViewMode('list');
            }}
            className={`list_viwe_icon ${viewMode === 'list' ? 'selected' : ''}`}
            icon={listSharp}
          ></IonIcon>
        <IonIcon
            onClick={() => {
              // setGridAttendance(transformListToGrid(getDatesForMonth(currentMY.month, currentMY.year)))
              // setViewMode('grid');
            }}
            className={`grdi_view_icon ${viewMode === 'grid' ? 'selected' : ''}`}
            icon={appsSharp}
          ></IonIcon>
    </div>
  );
};

export default TimeTable;
