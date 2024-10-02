import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonText,
} from '@ionic/react';
import {
  caretDownOutline,
  checkmarkCircleOutline,
  createOutline,
  documentOutline,
  ellipsisVerticalOutline,
  folderOutline,
  moveOutline,
  trashOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import GImageDocPreview from '../components/GImageDocPreview';
import { classListDummy, docData } from '../common/utility';
import GBreadCrumbs from '../components/GBreadCrumbs';
import GCustomSelectDrop from '../components/GCustomSelectDrop';
import CustomizedModal from '../components/GCustomizedModal';
import GCustomInput from '../components/GCustomInput';
import GImagUpload from '../components/GImagUpload';
import { useSelector } from 'react-redux';

const Documents: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const currentRole = useSelector((state: any) => state.auth.role);
  const formInitialVal = {
    documentType: 'School',
    documentName: '',
    documentSrc: '',
    documentDescription: '',
    documentClass: '',
  }
  const [formValue, setFormValue] = useState(formInitialVal);
  const accordionContent = docData;
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Documents', path: '/documents' }];

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));

  const handleSaveFile = () => { };

  const handleAdd = () => {
    setIsOpenAdd(true)
  };

  const handleInput = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDocTypeItemClick = (typeVal: string) => {
    setFormValue((prev) => ({ ...prev, documentType: typeVal }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  const fileActionsList =
    [{ name: 'Disable Edit', id: 'disable file', icon: createOutline },
    { name: 'Move Folder', id: 'move folder', icon: moveOutline },
    { name: 'Delete', id: 'delete', icon: trashOutline }
    ]

  const folderActionsList = [
    { name: 'Disable Edit', id: 'disable file', icon: createOutline },
    { name: 'Move Folder', id: 'move folder', icon: moveOutline },
  ]

  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className='p-h-16 m-bottom-10'>
        <IonButton className='br-ion-12 m-top-12 g_txt_cap' onClick={handleAdd} fill="outline" expand="block">Add Document</IonButton>
      </div>
      <div className="documents">
        <IonAccordionGroup>
          {accordionContent.map((item) => (
            <IonAccordion
              key={item.id}
              value={item.id}
              toggleIcon={caretDownOutline}
              toggleIconSlot="end"
            >
              <IonItem slot="header" color="light">
                <IonIcon icon={folderOutline}></IonIcon>{' '}
                <IonLabel>{item.title}</IonLabel>
                {currentRole !== 'Student' && (<DocPopActions id={`menu-item-doc-folder${item.id}`} titleStr={item.title} actionsList={folderActionsList} />)}
              </IonItem>
              <div className="document_inner_content" slot="content">
                {item.childrens.length >= 1 && (
                  <IonAccordionGroup>
                    {item.childrens.map((innerItem) => (
                      <IonAccordion
                        key={innerItem.id}
                        value={innerItem.id}
                        toggleIcon={caretDownOutline}
                        toggleIconSlot="end"
                      >
                        <IonItem slot="header" color="light">
                          <IonIcon icon={folderOutline}></IonIcon>{' '}
                          <IonLabel>{innerItem.title}</IonLabel>
                          {currentRole !== 'Student' && (<DocPopActions id={`menu-item-sub-doc-folder${innerItem.id}`} titleStr={innerItem.title} actionsList={folderActionsList} />)}
                        </IonItem>
                        <div
                          className="document_inner_content inside-container-block"
                          slot="content"
                        >
                          {innerItem.documents.length ? (
                            <>
                              {innerItem.documents.map((innerItemDoc, idxIn) => (
                                <React.Fragment key={idxIn}>
                                  <IonItem
                                    className="documents_file_item"
                                    key={innerItemDoc.id}
                                  >
                                    <IonIcon icon={documentOutline}></IonIcon>
                                    <IonLabel>{innerItemDoc.docTitle}</IonLabel>
                                    {currentRole !== 'Student' && (<DocPopActions id={`menu-item-sub-doc-file${innerItemDoc.id}`} titleStr={innerItemDoc.docTitle} actionsList={fileActionsList} />)}
                                    <IonText>
                                      <a onClick={() => setIsOpen(true)}>view</a>
                                    </IonText>
                                  </IonItem>
                                </React.Fragment>
                              ))}
                            </>
                          ) : (
                            <>
                              <IonItem>
                                <IonText>
                                  <h6>No Doc's Present</h6>
                                </IonText>
                              </IonItem>
                            </>
                          )}
                        </div>
                      </IonAccordion>
                    ))}
                  </IonAccordionGroup>
                )}
                {item.documents.length ? (
                  <>
                    {item.documents.map((itemDoc, idx) => (
                      <React.Fragment key={idx}>
                        <IonItem className="documents_file_item" key={itemDoc.id}>
                          <IonIcon icon={documentOutline}></IonIcon>
                          <IonLabel>{itemDoc.docTitle}</IonLabel>
                          {currentRole !== 'Student' && (<DocPopActions id={`menu-item-sub-doc-file${itemDoc.id}`} titleStr={itemDoc.docTitle} actionsList={fileActionsList} />)}
                          <IonText>
                            <a onClick={() => setIsOpen(true)}>view</a>
                          </IonText>
                        </IonItem>
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <>
                    {item.childrens.length == 0 && (
                      <>
                        <IonItem>
                          <IonText>
                            <h6>No Doc's Present</h6>
                          </IonText>
                        </IonItem>
                      </>
                    )}
                  </>
                )}
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
      <GImageDocPreview
        src={
          'https://css4.pub/2017/newsletter/drylab.pdf'
        }
        title="Student Name"
        onClose={() => {
          setIsOpen(false);
        }}
        onDownload={() => { }}
        type='pdf'
        isOpen={isOpen}
      >
      </GImageDocPreview>
      <CustomizedModal
        title="Add New Document"
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        onSave={handleSaveFile}
        styles={{ maxHeight: '50vh' }}
      >
        <div>
          <div className='width-100 nav-ele-show-con m-bottom-10'>
            {["School", "Class", "Personal"].map((typeVal) => (<div className={`document-type-check ${formValue.documentType === typeVal ? 'selected-doc-type-item' : ''}`} key={typeVal} onClick={() => handleDocTypeItemClick(typeVal)}>
              <IonText>
                <p>{typeVal}</p>
                {formValue.documentType === typeVal && (<IonIcon icon={checkmarkCircleOutline}></IonIcon>)}
              </IonText>
            </div>))}
          </div>
          <div className='field'>
            {formValue.documentType === 'Class' && (<GCustomSelectDrop options={classDummyData} name='classId' value={formValue.documentClass} label="Select Class" handleOnChange={() => { }} classNames='custom-select m-bottom-10' />)}
          </div>
          <GImagUpload onFileChange={handleFileChange} multiple={false} accept='.doc,.docx,.xml,application/msword,.pdf, image/*' label='Upload Image' classNames='m-bottom-10' />
          <GCustomInput name={'documentName'} value={formValue['documentName']} onInput={handleInput} label="Document Name" placeholder={'English Verbs'} />
          <GCustomInput name={'documentDescription'} value={formValue['documentDescription']} onInput={handleInput} label="Document Description" placeholder={'Ex. 10'} />
        </div>
      </CustomizedModal>
    </div>
  );
};

interface IDocPopActionsProps {
  id: string
  titleStr: string,
  actionsList: { name: string, id: string, icon: any }[],
}
const DocPopActions = ({ id, titleStr, actionsList }: IDocPopActionsProps) => {

  return (<>
    <IonIcon id={id} icon={ellipsisVerticalOutline}></IonIcon>
    <IonPopover size="auto" trigger={id} triggerAction="click">
      <IonContent class="ion-padding">
        <div className='popover_actions'>
          <div className='g_custom_title_pop'><IonText><p className='g_text_ellipses p-r-10 p-l-10'>Actions For {titleStr}</p></IonText></div>
          {actionsList.map((actionI, indexN: number) => (<IonItem key={actionI.id} className={`${indexN == 0 ? 'first_action_item' : ''}`}>
            <IonIcon icon={actionI.icon}></IonIcon>
            <IonLabel className='g_flex g-align-center'><IonText><p className='m-0'>{actionI.name}</p></IonText></IonLabel>
          </IonItem>))}
        </div>
      </IonContent>
    </IonPopover>
  </>)
}

export default Documents;
