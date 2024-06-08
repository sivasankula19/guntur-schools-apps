import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
  IonTab,
  IonText,
} from '@ionic/react';
import { alertCircleOutline, caretDownOutline, folderOutline } from 'ionicons/icons';
import React from 'react';

const Achievements: React.FC = () => {
  const colData = [
    { id: 'cl1', name: 'Title', key: 'title' },
    { id: 'cl2', name: 'Date', key: 'conductedOn' },
    { id: 'cl3', name: 'Level', key: 'level' },
    { id: 'cl4', name: 'Presented To', key: 'presentedTo' },
  ];

  const data = [
    {
      category: 'Academic Excellence',
      id: '01',
      data: [
        {
          id: 'item1',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item2',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item3',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item4',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
      ],
    },
    {
      category: 'Sports Achievements',
      id: '02',
      data: [
        {
          id: 'item2a1',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item2a2',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item2a3',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
        {
          id: 'item2a4',
          title: 'District Chess',
          conductedOn: '06/03/2024',
          conductedTo: '08/03/2024',
          location: 'Madugula gvtmdgl',
          locLat: '90.32',
          locLong: '43.33',
          level: 'School Level',
          presentedTo: 'Siva Y24C8A039 - 8th Class ',
          grandTotal: '589',
          grandTotalRequired: '600',
        },
      ],
    },
    {
      category: 'Cultural Events',
      id: '03',
      data: []
    },
  ];

  return (
    <div className="achievements">
      <IonAccordionGroup>
        {data.map((item) => (
          <IonAccordion
            key={item.id}
            value={item.id}
            toggleIcon={caretDownOutline}
            toggleIconSlot="end"
          >
            <IonItem slot="header" color="light">
              <IonLabel>{item.category}</IonLabel>
            </IonItem>
            <div className="achieve_doc" slot="content">
              {item.data.length ? <>
                <div className="achieve_table_data">
                  <div className="row first_row">
                    {colData.map((col) => (
                      <div
                        style={{ width: `${100 / colData.length}%` }}
                        className="head col"
                        key={`id-${col.id}`}
                      >
                        <IonText>
                          <p className="g_text_ellipses">{col.name}</p>
                        </IonText>
                      </div>
                    ))}
                  </div>
                  {item.data.map((row: any, index) => (
                    <div className={`row ${index === item.data.length - 1 ? 'last_row' : ''}`} key={row.id}>
                      {colData.map((col, ind: number) => (
                        <div
                          style={{ width: `${100 / colData.length}%` }}
                          className="head col"
                          key={`${row.id}-${col.id}`}
                        >
                          {
                            ind === 0 ? <>
                              <IonText>
                                <a className="two_lines_ellipsis">{row[col.key]}</a>
                              </IonText>
                            </> : <><IonText>
                              <p className="two_lines_ellipsis">{row[col.key]}</p>
                            </IonText></>
                          }

                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </> : <>
                  <IonItem className='achieve_no_data'>
                    <IonIcon icon={alertCircleOutline}></IonIcon>
                    <IonText>
                      <p>No Data Found!</p>
                    </IonText>
                  </IonItem>
              </>}

            </div>
          </IonAccordion>
        ))}
      </IonAccordionGroup>
    </div>
  );
};

export default Achievements;
