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
import { classListDummy, docData } from '../common/utility';
import CustomizedModal from './GCustomizedModal';
import GCustomSelectDrop from './GCustomSelectDrop';

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

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));

  return (
    <>
      <div className="add_documents_btn">
        <IonButton onClick={openPopover} className="add-doc-button g_txt_cap">
          <IonIcon icon={addCircleOutline}></IonIcon> Add Document
        </IonButton>
      </div>
      <CustomizedModal
        // ref={popover}
        title="Add New Document"
        isOpen={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        onSave={onSave}
      >
        <div>
          {/* <h1 className="g-font-weight-600 g-font-size-18 text-color-blue g_flex g-justify-center">Add New Document</h1> */}
          <p className="g-font-weight-400 g-font-size-12 g_flex g-justify-center">Select Location for Document</p>
          <div className="g_flex g-space-between">
            {[{ 'School Documents': 'School' }, { 'Class Documents': 'Class' }, { 'Personal Documents': 'Personal' }].map((mainLocation: any, index: number) => {
              const key = Object.keys(mainLocation)[0];
              const value = mainLocation[key];
              return (
                title == Object.keys(mainLocation)[0] ?
                  <div key={index} className='doc_location_current g_flex g-align-center g-space-around'>
                    <div className='text-color-blue g-font-weight-600 g-font-size-18'>{value}</div>
                    <IonIcon className='g-font-size-16 circle-icon' icon={checkmarkCircleOutline}></IonIcon>
                  </div>
                  :
                  <div key={index} className='doc_location g_flex g-align-center g-justify-center text-color-blue g-font-weight-600 g-font-size-18'>{value}</div>
              )
            })}
          </div>
          <div className='add_doc_sa'>
            <div className='field'>
            <GCustomSelectDrop options={classDummyData} name='classId'
                    value={''} label="Select Class"
                    handleOnChange={()=>{}} classNames='custom-select' />
            </div>
            <div className='field m-bottom-10'>
              <IonInput label="Line Number 2" labelPlacement="floating" fill="outline" placeholder="Line Number 2"></IonInput>
            </div>
            <div className='field m-bottom-10'>
              <IonInput label="Line Number 2" labelPlacement="floating" fill="outline" placeholder="Line Number 2"></IonInput>
            </div>
          </div>
        </div>
      </CustomizedModal>
    </>
  );
};

export default AddDoc;
