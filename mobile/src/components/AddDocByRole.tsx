import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPopover,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import {
  addCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import GImageDocPreview from './GImageDocPreview';
import { docData } from '../common/utility';
import GCustomisedModal from './GCustomisedModal';

interface IProps {
  title?: string;
  subtitle?: string;
}
const AddDoc: React.FC<IProps> = ({ title, subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    setPopoverOpen(true);
  };

  const onSave = () => {
    console.log("clicked on save")
  }

  return (
    <>
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
            {[{ 'School Documents': 'School' }, { 'Class Documents': 'Class' }, { 'Personal Documents': 'Personal' }].map((mainLocation: any, index: number) => {
              const key = Object.keys(mainLocation)[0];
              const value = mainLocation[key];
              return (
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
          <div className='add_doc_sa'>
            <div className='field'>
              <IonSelect
                className="custome_select"
                multiple={false}
                label="Select Class"
                labelPlacement="floating"
                fill="outline"
                interface="popover"
              >
                <IonSelectOption value="class-8">Class 8</IonSelectOption>
                <IonSelectOption value="class-9">Class 9</IonSelectOption>
                <IonSelectOption value="class-10">Class 10</IonSelectOption>
                <IonSelectOption value="class-0">Class 0</IonSelectOption>
              </IonSelect>
            </div>
            <div className='field m-bottom-10'>
              <IonInput label="Line Number 2" labelPlacement="floating" fill="outline" placeholder="Line Number 2"></IonInput>
            </div>
            <div className='field m-bottom-10'>
              <IonInput label="Line Number 2" labelPlacement="floating" fill="outline" placeholder="Line Number 2"></IonInput>
            </div>
          </div>
        </div>
      </GCustomisedModal>
    </>
  );
};

export default AddDoc;
