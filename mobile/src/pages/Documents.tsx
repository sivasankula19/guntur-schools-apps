import {
  IonAccordion,
  IonAccordionGroup,
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from '@ionic/react';
import {
  addCircleOutline,
  caretDownOutline,
  documentOutline,
  folderOutline,
  triangleOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import GImageDocPreview from '../components/GImageDocPreview';
import { docData } from '../common/utility';
import GBreadCrumbs from '../components/GBreadCrumbs';

const Documents: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSrc, setSelectedSrc] = useState<any>('');

  const accordianContent = docData;
  const breadCrumbsValue = [{bName:'Home', path:'/'},{bName:'Documents', path:'/documents'}]
  return (
    <div>
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
                        </IonItem>
                        <div
                          className="document_inner_content inside-container-block"
                          slot="content"
                        >
                          {innerItem.documents.length ? (
                            <>
                              {innerItem.documents.map((innerItemDoc) => (
                                <IonItem
                                  className="documents_file_item"
                                  key={innerItemDoc.id}
                                >
                                  <IonIcon icon={documentOutline}></IonIcon>
                                  <IonLabel>{innerItemDoc.docTitle}</IonLabel>
                                  <IonText>
                                    <a onClick={() => setIsOpen(true)}>view</a>
                                  </IonText>
                                </IonItem>
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
                    {item.documents.map((itemDoc) => (
                      <IonItem className="documents_file_item" key={itemDoc.id}>
                        <IonIcon icon={documentOutline}></IonIcon>
                        <IonLabel>{itemDoc.docTitle}</IonLabel>
                        <IonText>
                          <a onClick={() => setIsOpen(true)}>view</a>
                        </IonText>
                      </IonItem>
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
        <IonButton className="gmodal-cancel">
          <IonIcon icon={addCircleOutline}></IonIcon> Add Personal Doc's
        </IonButton>
      </div>
    </div>
  );
};

export default Documents;
