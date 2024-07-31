import {
  IonButton,
  IonContent,
  IonIcon,
  IonPopover,
} from '@ionic/react';
  import {
    addCircleOutline,
    checkmarkCircleOutline
  } from 'ionicons/icons';
  import React, { useRef, useState } from 'react';
  import GImageDocPreview from '../components/GImageDocPreview';
  import { docData } from '../common/utility';
import GCustomisedModal from '../components/GCustomisedModal';
  
  interface IProps {
   title?:string;
   subtitle?:string;
  }
  const AddDoc: React.FC <IProps> = ({title,subtitle}) => {
    // console.log("common-add-doc",title,subtitle)
    const [isOpen, setIsOpen] = useState(false);
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    // popover.current!.event = e;
    setPopoverOpen(true);
  };

  const onSave=()=>{
      console.log("clicked on save")
  }

    

    return (
      <>
       
        <GImageDocPreview
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Pxol7CM9TBMVe8l7LW-0nwsGZQiOGd48Tw&s'
          }
          title="Student Name"
          onClose={() => {
            setIsOpen(false);
          }}
          onDownload={() => {}}
          isOpen={isOpen}
        >
        </GImageDocPreview>
        <div className="add_documents_btn">
          <IonButton onClick={openPopover} className="add-doc-button">
            <IonIcon icon={addCircleOutline}></IonIcon> Add Doc
          </IonButton>
        </div>
        <GCustomisedModal
          // ref={popover}
          title="Add New Document"
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          onSave={onSave}
        >
           <div>
              {/* <h1 className="g-fontweight-600 g-fontsize-18 text-color-blue g_flex g_jstfy_content_cntr">Add New Document</h1> */}
              <p className="g-fontweight-400 g-fontsize-12 g_flex g_jstfy_content_cntr">Select Location for Document</p>
              <div className="g_flex g_space_btwn">
                  {[{'School Documents':'School'},{'Class Documents':'Class'},{'Personal Documents':'Personal'}].map((mainLocation:any,index:number)=>{
                    const key = Object.keys(mainLocation)[0];
                    const value = mainLocation[key];
                    return(
                      title == Object.keys(mainLocation)[0] ? 
                        <div key={index} className='doc_location_current g_flex g_align_cntr g_space_around'>
                          <div className='text-color-blue g-fontweight-600 g-fontsize-18'>{value}</div> 
                          <IonIcon className='g-fontsize-16 cicle-icon' icon={checkmarkCircleOutline}></IonIcon>       
                        </div>
                        :
                        <div key={index} className='doc_location g_flex g_align_cntr g_jstfy_content_cntr text-color-blue g-fontweight-600 g-fontsize-18'>{value}</div>                
                    )
                  })}
              </div>
              <select className='doc_loc_select'>
                <option value="">Select location / add location</option>
                <option value="class">class</option>
                <option value="school">school</option>
                <option value="personal">personal</option>
              </select>
              <input className='doc_loc_input' type="text" placeholder='Document title'></input>
              <input className='doc_loc_input' type="text" placeholder='Image / Video / Pdf file'></input>
            </div>

        </GCustomisedModal>
      </>


    );
  };
  
  export default AddDoc;
  