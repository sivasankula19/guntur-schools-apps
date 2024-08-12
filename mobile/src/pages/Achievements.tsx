import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTab,
  IonText,
} from '@ionic/react';
import { addOutline, cloudUpload, location, alertCircleOutline, caretDownOutline, folderOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import GCustomisedModal from '../components/GCustomisedModal';
import { useSelector } from 'react-redux';

const Achievements: React.FC = () => {

  const [newAchievement, setNewAchievement] = useState<any>({category:'',achievement_name:'',sub_category:'',level:'',presented_to:'',images:'',grand_total:'',location:'',date:''});
  const [popoverOpen, setPopoverOpen] = useState(false);
  const isStudent = useSelector((state:any)=>state.auth.role) === 'Student'

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
  const onSave=()=>{
    console.log("clicked on save",newAchievement)
  }

  const openPopover = (e: any) => {
    setPopoverOpen(true);
  };

  const handleInput=(key:string,value:string)=>{
    setNewAchievement(()=> ({...newAchievement,[key]:value}))
  }

  const IonSelectUI=(label:string,value:string,options:any)=>{
      return(
            <IonSelect
                className="custome_select achieve_popup"
                multiple={false}
                label={label}
                labelPlacement="floating"
                fill="outline"
                value={newAchievement[value]}
                onIonChange={(e:any)=>handleInput(value,e.target.value)}
                // interface="popover"
                >
                  {options.map((option:any)=>{
                    return(
                      <IonSelectOption key={option.key} value={option.value}>{option.key}</IonSelectOption>
                    )
                  })}
            </IonSelect>
      )
  }

  const IonInputUI=(label:string,value:string,ph:string,endIcon?:any,type?:any)=>{
    return(
        <div className='input-with-icon'>
            <IonInput
                value={newAchievement[value]}
                onIonInput={(e:any)=>handleInput(value,e.target.value)}
                className="custom-ion-input_home achieve_popup"
                label={label}
                labelPlacement="floating"
                fill="outline"
                type={type || 'text'}
                placeholder={ph}
                ></IonInput>
            {endIcon && <IonIcon icon={endIcon} className="input-icon" />}
        </div>
    )
  }

  return (
    <div className="achievements">
      {!isStudent &&
      <div className='g_flex g_align_cntr g_jstfy_content_cntr'>
          <IonButton onClick={openPopover} className="add_achievement">
            <IonIcon icon={addOutline}></IonIcon> Add
          </IonButton>
      </div> }
      {/* add achievements popup */}
      <GCustomisedModal
          // ref={popover}
          title="Add Achievement"
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          onSave={onSave}
        >
           <div>
              {/* <h1 className="g-fontweight-600 g-fontsize-18 text-color-blue g_flex g_jstfy_content_cntr">Add New Document</h1> */}
              <div className="g_flex g_space_btwn">
              </div>
              {IonSelectUI('Category','category',[{'key':'Class','value':'class'},{'key':'School','value':'school'},{'key':'Student','value':'student'}])}
              {IonInputUI('Achievement','achievement_name','Achievement Name')}              
              {IonSelectUI('Sub Category','sub_category',[{'key':'Class','value':'class'},{'key':'School','value':'school'},{'key':'Student','value':'student'}])}
              {IonInputUI('Level','level','Level Name')}              
              {IonInputUI('Presented To','presented_to','Presented To')}              
              {IonInputUI('Images','images','Images',cloudUpload)}              
              {IonInputUI('Grand Total','grand_total','Grand Total')}              
              {IonInputUI('Location','location','Location',location,'url')}              
              {IonInputUI('Date','date','Date','date')}              
             </div>

        </GCustomisedModal>
      <div className='school_achieve_title g_flex g_align_cntr g_jstfy_content_cntr text-color-blue g-fontweight-600 g-fontsize-16'>
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
    </div>
  );
};

export default Achievements;
