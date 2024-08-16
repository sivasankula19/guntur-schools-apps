import React, { useEffect, useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTextarea } from '@ionic/react';
import { formatDate, homeWorkDataBe } from '../../common/utility';
import { attachOutline, banOutline, expandOutline,addOutline, cloudUpload } from 'ionicons/icons';
import SwapableImages from './SwapableImges';
import { useSelector } from 'react-redux';
import GCustomisedModal from '../../components/GCustomisedModal';
const HomeWork: React.FC = () => {

  const [homeWorkData, setHomeWorkData] = useState<any>([])
  const isStudent = useSelector((state:any)=>state.auth.role) === 'Student'
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [homework, setHomework] = useState<any>({title:'',desc:'',subject:'',image:'',due_date:''});

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Home Work', path: '/home-work' }]

  useEffect(() => {
    setHomeWorkData(homeWorkDataBe.map((i) => ({ ...i, isFullView: false })))
  }, [])


  const handleFullView = (id:string) => {
    setHomeWorkData((prev:any)=>(prev.map((prvItem:any)=>{
      if(prvItem.id === id)
        return {...prvItem, isFullView: !prvItem.isFullView}
      return ({...prvItem, isFullView: false})
    })))
  }

  const openPopover = (e: any) => {
    setPopoverOpen(true);
  };

  const onSave=()=>{
    console.log("clicked on save",homework)
  }

  const handleInput=(key:string,value:string)=>{
    setHomework(()=> ({...homework,[key]:value}))
  }

  const IonSelectUI=(label:string,value:string,options:any)=>{
    return(
          <IonSelect
              className="custome_select achieve_popup"
              multiple={false}
              label={label}
              labelPlacement="floating"
              fill="outline"
              value={homework[value]}
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
              value={homework[value]}
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

const IonTextAreaUI=(label:string,value:string,ph:string,endIcon?:any,type?:any)=>{
  return( 
      <div className='input-with-icon'>
          <IonTextarea
              value={homework[value]}
              onIonInput={(e:any)=>handleInput(value,e.target.value)}
              className="custom-ion-input_home achieve_popup"
              label={label}
              labelPlacement="floating"
              fill="outline"
              // type={type || 'text'}
              placeholder={ph}
              ></IonTextarea>
          {endIcon && <IonIcon icon={endIcon} className="input-icon" />}
      </div>
  )
}

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue} />
      {!isStudent &&
      <div className='g_flex g_align_cntr g_jstfy_content_cntr'>
          <IonButton onClick={openPopover} className="add_homework">Add Home Work</IonButton>
      </div> }
      {/* add achievements popup */}
      <GCustomisedModal
          // ref={popover}
          title="Add Homework"
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          onSave={onSave}
        >
           <div>
              {/* <h1 className="g-fontweight-600 g-fontsize-18 text-color-blue g_flex g_jstfy_content_cntr">Add New Document</h1> */}
              <div className="g_flex g_space_btwn">
              </div>
              {IonInputUI('Homework title','title','Home Work Title')}              
              {IonTextAreaUI('Homework Description','desc','Home Work Description')}              
              {IonSelectUI('Subject Name','subject',[{'key':'Maths','value':'maths'},{'key':'Social','value':'social'},{'key':'Science','value':'science'}])}
              {IonInputUI('Images','image','Images',cloudUpload)}                      
              {IonInputUI('Date','date','Date','date')}              
             </div>

      </GCustomisedModal>
      <div className='home_work'>
        <IonSearchbar placeholder='Search subject or Task name'></IonSearchbar>
        <div className="g_flex g_space_btwn select_conatainer">
          <div style={{ width: '47%' }}>
            <IonSelect
              className="custome_select"
              multiple={true}
              label="Select Class"
              labelPlacement="floating"
              fill="outline"
              interface="popover"
              onIonChange={(e) =>
                console.log(
                  `ionChange fired with value: ${e.detail.value}`
                )
              }
              onIonCancel={() => console.log('ionCancel fired')}
              onIonDismiss={() => console.log('ionDismiss fired')}
            >
              <IonSelectOption value="class-8">Class 8</IonSelectOption>
              <IonSelectOption value="class-9">Class 9</IonSelectOption>
              <IonSelectOption value="class-10">Class 10</IonSelectOption>
              <IonSelectOption value="class-0">Class 0</IonSelectOption>
            </IonSelect>
          </div>
          <div style={{ width: '47%' }}>
            <input className='custom_homework_date' type='date' />
          </div>
        </div>
        <div className='home_work_container'>
          {homeWorkData.map((item: any) => (<IonCard key={item.id}>
            <IonCardContent>
              <div className='g_flex time_title'>
                <div className='home_task_title'>
                  <IonText>
                    <h2 className={`${!item.isFullView && 'two_lines_ellipsis'}`}>{item.taskName}</h2>
                  </IonText>
                </div>
                <div className='home_task_time'>
                  <IonText>
                    <span>{formatDate(new Date(item.taskTime), true)}</span>
                  </IonText>
                </div>
              </div>
              <div className='home_task_desc'>
                <IonText>
                  <p className={`${!item.isFullView && 'three_line_ellipse'}`}>{item.taskDesc}</p>
                </IonText>
              </div>
              {item.isFullView && (
                <div className='home_attachments'>
                  <div className='g_flex g_align_cntr g_space_btwn attach_icon_home'>
                    <div className='g_flex g_align_cntr'>
                    <IonIcon icon={attachOutline}></IonIcon>
                    <IonText>
                      <h4>Attachments</h4>
                    </IonText>
                    </div>
                    <IonIcon icon={expandOutline}></IonIcon>
                  </div>
                  {
                    item?.attachments?.length ? <>
                      <div>
                          <SwapableImages images={item.attachments}></SwapableImages>
                      </div>
                    </> : <>
                      <div className='no_attachments'>
                        <IonIcon icon={banOutline}></IonIcon>
                        <IonText>
                          <p> No Attachments !</p>
                        </IonText>
                      </div>
                    </>
                  }
                </div>
              )}
              <div className='g_flex g_space_btwn text_show_more'>
                <div>
                  <IonText>
                    <p>Subject Name</p>
                  </IonText>
                </div>
                <div>
                  <IonText>
                    <a onClick={()=>handleFullView(item.id)}>{item.isFullView ? 'View Less' : 'View More'}</a>
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>))}
        </div>
      </div>
    </div>
  );
};

export default HomeWork;
