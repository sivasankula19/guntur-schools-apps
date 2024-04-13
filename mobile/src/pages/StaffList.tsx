import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonInput,
  IonSearchbar,
} from '@ionic/react';
import React from 'react';

const StaffList: React.FC = () => {
  const staffarr = [
    {
      Emp_name: 'Siva',
      Emp_Image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png',
      id: '8A001',
      subject: '8th Class',
      degignation: 'A Section',
      class_List: [6, 7, 8, 10],
    },
    {
      Emp_name: 'Siva1',
      Emp_Image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png',
      id: '8A002',
      subject: '8th Class',
      degignation: 'A Section',
      class_List: [6, 7, 10],
    },
    {
      Emp_name: 'Siva1',
      Emp_Image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png',
      id: '8A003',
      subject: '8th Class',
      degignation: 'A Section',
      class_List: [6, 7, 10],
    },
    {
      Emp_name: 'Siva1',
      Emp_Image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Line-style-icons-profile-male.svg/864px-Line-style-icons-profile-male.svg.png',
      id: '8A004',
      subject: '8th Class',
      degignation: 'A Section',
      class_List: [6, 7, 10],
    },
  ];

  return (
    <>
      <div className="g_flex g_space_btwn">
        <div>
          <div>
            <IonButton className="card_btn">Home</IonButton>
            <span> / </span>
            <IonButton className="card_btn">My Staff</IonButton>
          </div>
          <div className="g_flex">
            <IonSearchbar></IonSearchbar>
          </div>
        </div>
        <div>
          <label>Filter</label>
          <IonChip>on- off</IonChip>
        </div>
      </div>
      <div>
        {staffarr.map((item) => (
          <IonCard className="student_card" key={item.id}>
            <IonCardContent>
              <div className="g_flex g_space_btwn">
                <div className="g_flex first_container">
                  <div className="profile_item">
                    <img
                      className="prifile_image"
                      src={item.Emp_Image}
                      alt="profile"
                    />
                  </div>
                  <div>
                    <h2>{item.Emp_name}</h2>
                    <p>{item.degignation}</p>
                  </div>
                </div>
                <div>
                  <h2>{item.subject}</h2>
                  <h2>{item.class_List.join(',')}</h2>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </>
  );
};

export default StaffList;
