import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import { alertCircleOutline, caretDownOutline, calendarOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import CustomizedModal from '../components/GCustomizedModal';
import { useSelector } from 'react-redux';
import GCustomInput from '../components/GCustomInput';
import GCustomSelectDrop from '../components/GCustomSelectDrop';
import GImagUpload from '../components/GImagUpload';
import GBackSaveReset from '../components/GBackSaveReset';

const Achievements: React.FC = () => {

  const [newAchievement, setNewAchievement] = useState<any>({ category: '', achievement_name: '', sub_category: '', level: '', presented_to: '', images: '', grand_total: '', location: '', date: '' });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const isStudent = useSelector((state: any) => state.auth.role) === 'Student';
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const formInitialVal = {
    category: '',
    achievementName: '',
    subCategory: '',
    level: '',
    presentedTo: '',
    images: '',
    grandTotal: '',
    location: '',
    date: '',
  }
  const [formValue, setFormValue] = useState<any>(formInitialVal);

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
  const onSave = () => {
    console.log("clicked on save", newAchievement)
  }

  const openPopover = (e: any) => {
    setPopoverOpen(true);
  };

  const handleInput = (e: any) => {
    setFormValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  const handleReset = () => { };
  const handleSave = () => { };

  return (
    <div className="achievements g_full_height">
      {(!isStudent && isAuthenticated) && <GBackSaveReset handleReset={handleReset} handleSave={handleSave} />}
      <div className={`${(!isStudent && isAuthenticated) ? 'achievement-m-sa' : 'g_full_height o-flow-y'}`}>
        {(!isStudent && isAuthenticated) &&
          <div className='p-b-10'>
            <IonButton className='br-ion-12 g_txt_cap g_full_width ' onClick={openPopover} fill="outline" expand="block">Add Achievement</IonButton>
          </div>}
        <div className='school_achieve_title g_flex g-align-center g-justify-center text-color-blue g-font-weight-600 g-font-size-16'>
          School Achievements
        </div>

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
        <CustomizedModal
          title="Add Achievement"
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          onSave={onSave}
        >
          <div>
            <GCustomSelectDrop options={[]} name='category' value={formValue.category} label="Category" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
            <GCustomInput name={'achievementName'} value={formValue['achievementName']} onChange={handleInput} label={'AchievementName'} placeholder='Enter Achievement Name' />
            <GCustomSelectDrop options={[]} name='subCategory' value={formValue.subCategory} label="Sub Category" handleOnChange={handleInput} classNames='custom-select m-bottom-10' />
            <GCustomInput name={'level'} value={formValue['level']} onChange={handleInput} label={'Level'} placeholder='Enter Level' />
            <GCustomInput name={'presentedTo'} value={formValue['presentedTo']} onChange={handleInput} label={'Presented To'} placeholder='Presented To' />
            <GImagUpload onFileChange={handleFileChange} multiple={true} label='Upload Image' classNames='m-bottom-10' />
            <GCustomInput name={'grandTotal'} value={formValue['grandTotal']} onChange={handleInput} label={'Grand Total'} placeholder='Enter Grand Total ' />
            <GCustomInput name={'location'} value={formValue['location']} onChange={handleInput} label={'Location'} placeholder='Enter Location' />
            {/* date picker */}
            <div className='field m-bottom-10'>
              <IonInput value={formValue.date} onIonChange={handleInput} name='date' label="Date" labelPlacement="floating" fill="outline" placeholder="Date of Birth"></IonInput>
              <IonIcon icon={calendarOutline}></IonIcon>
            </div>
          </div>
        </CustomizedModal>
      </div>
    </div>
  );
};

export default Achievements;
