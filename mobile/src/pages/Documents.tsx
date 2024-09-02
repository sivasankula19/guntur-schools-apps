import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonText,
} from '@ionic/react';
import {
  caretDownOutline,
  createOutline,
  documentOutline,
  ellipsisVerticalOutline,
  folderOutline,
  moveOutline,
  trashOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import GImageDocPreview from '../components/GImageDocPreview';
import { docData } from '../common/utility';
import GBreadCrumbs from '../components/GBreadCrumbs';
import AddDoc from '../components/AddDocByRole';

const Documents: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accordianContent = docData;
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Documents', path: '/documents' }]
  return (
    <div className='g_full_height'>
      <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
      <div className="documents">
        <IonAccordionGroup>
          {accordianContent.map((item) => (
            <IonAccordion
              key={item.id}
              value={item.id}
              toggleIcon={caretDownOutline}
              toggleIconSlot="end"
            >
              <IonItem slot="header" color="light">
                <IonIcon icon={folderOutline}></IonIcon>{' '}
                <IonLabel>{item.title}</IonLabel>
                <IonIcon id={`menu-item-doc-folder${item.id}`} icon={ellipsisVerticalOutline}></IonIcon>
                <IonPopover size="auto" trigger={`menu-item-doc-folder${item.id}`} triggerAction="click">
                  <IonContent class="ion-padding">
                    <div className='popover_actions'>
                      <div className='g_custom_title_pop'><IonText><p className='g_text_ellipses p-r-10 p-l-10'>Actions For {item.title}</p></IonText></div>
                      <IonItem className='first_action_item'>
                        <IonIcon icon={createOutline}></IonIcon>
                        <IonLabel>Disable Edit</IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonIcon icon={moveOutline}></IonIcon>
                        <IonLabel>Move Folder</IonLabel>
                      </IonItem>
                    </div>
                  </IonContent>
                </IonPopover>
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
                          <IonIcon id={`menu-item-sub-doc-folder${innerItem.id}`} icon={ellipsisVerticalOutline}></IonIcon>
                          <IonPopover size="auto" trigger={`menu-item-sub-doc-folder${innerItem.id}`} triggerAction="click">
                            <IonContent class="ion-padding">
                              <div className='popover_actions'>
                                <div className='g_custom_title_pop'><IonText><p className='g_text_ellipses p-r-10 p-l-10'>Actions For {innerItem.title}</p></IonText></div>
                                <IonItem className='first_action_item'>
                                  <IonIcon icon={createOutline}></IonIcon>
                                  <IonLabel>Disable Edit</IonLabel>
                                </IonItem>
                                <IonItem>
                                  <IonIcon icon={moveOutline}></IonIcon>
                                  <IonLabel>Move Folder</IonLabel>
                                </IonItem>
                              </div>
                            </IonContent>
                          </IonPopover>
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
                                    <IonIcon id={`menu-item-sub-doc-file${innerItemDoc.id}`} icon={ellipsisVerticalOutline}></IonIcon>
                                    <IonPopover size="auto" trigger={`menu-item-sub-doc-file${innerItemDoc.id}`} triggerAction="click">
                                      <IonContent class="ion-padding">
                                        <div className='popover_actions'>
                                          <div className='g_custom_title_pop'><IonText><p className='g_text_ellipses p-r-10 p-l-10'>Actions For {innerItemDoc.docTitle}</p></IonText></div>
                                          <IonItem className='first_action_item'>
                                            <IonIcon icon={createOutline}></IonIcon>
                                            <IonLabel>Disable Edit</IonLabel>
                                          </IonItem>
                                          <IonItem>
                                            <IonIcon icon={moveOutline}></IonIcon>
                                            <IonLabel>Move Folder</IonLabel>
                                          </IonItem>
                                          <IonItem>
                                            <IonIcon icon={trashOutline}></IonIcon>
                                            <IonLabel>Delete</IonLabel>
                                          </IonItem>
                                        </div>
                                      </IonContent>
                                    </IonPopover>
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
                          <AddDoc title={item.title} subtitle={innerItem.title} />
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
                          <IonIcon id={`menu-item-sub-doc-file${itemDoc.id}`} icon={ellipsisVerticalOutline}></IonIcon>
                          <IonPopover size="auto" trigger={`menu-item-sub-doc-file${itemDoc.id}`} triggerAction="click">
                            <IonContent class="ion-padding">
                              <div className='popover_actions'>
                                <div className='g_custom_title_pop'><IonText><p className='g_text_ellipses p-r-10 p-l-10'>Actions For {itemDoc.docTitle}</p></IonText></div>
                                <IonItem className='first_action_item'>
                                  <IonIcon icon={createOutline}></IonIcon>
                                  <IonLabel>Disable Edit</IonLabel>
                                </IonItem>
                                <IonItem>
                                  <IonIcon icon={moveOutline}></IonIcon>
                                  <IonLabel>Move Folder</IonLabel>
                                </IonItem>
                                <IonItem>
                                  <IonIcon icon={trashOutline}></IonIcon>
                                  <IonLabel>Delete</IonLabel>
                                </IonItem>
                              </div>
                            </IonContent>
                          </IonPopover>
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
                <AddDoc title={item.title} subtitle={''} />
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </div>
      <GImageDocPreview
        src={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Pxol7CM9TBMVe8l7LW-0nwsGZQiOGd48Tw&s'
        }
        title="Student Name"
        onClose={() => {
          setIsOpen(false);
        }}
        onDownload={() => { }}
        isOpen={isOpen}
      >
      </GImageDocPreview>
    </div>
  );
};

export default Documents;
