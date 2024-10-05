import React from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { addCircleOutline, checkmarkCircleOutline, closeCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { formatDate } from '../../common/utility';

const FeesDues: React.FC = () => {

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'fee Structure', path: '/fee-structure' }];

  const feesPaidTerms = [
    {
      id: 1,
      academicFees: 20000,
      term: 'Term 1',
      amountToBePaid: 5000,
      amountPaid: 5000,
      plannedDate: '2024-06-26T14:06:43.088Z',
      paidDate: '2024-06-26T14:06:43.088Z',
      termDue: 0,
      paidVia: 'PhonePay',
      isOpen: true,
    },
    {
      id: 2,
      academicFees: 20000,
      term: 'Term 2',
      amountToBePaid: 5000,
      amountPaid: 5000,
      plannedDate: '2024-06-26T14:06:43.088Z',
      paidDate: '2024-06-26T14:06:43.088Z',
      termDue: 0,
      paidVia: 'PhonePay',
      isOpen: true,
    },
    {
      id: 3,
      academicFees: 20000,
      term: 'Term 3',
      amountToBePaid: 5000,
      amountPaid: 0,
      plannedDate: '2024-06-26T14:06:43.088Z',
      paidDate: '',
      paidVia: '',
      termDue: 5000,
      isOpen: false,
    },
    {
      id: 4,
      academicFees: 20000,
      term: 'Term 1',
      amountToBePaid: 5000,
      amountPaid: 0,
      plannedDate: '2024-06-26T14:06:43.088Z',
      paidDate: '',
      paidVia: '',
      termDue: 5000,
      isOpen: false,
    }
  ]

  const loopItems = [
    {
      name: 'Planned Date',
      key: 'plannedDate'
    },
    {
      name: 'Paid Date',
      key: 'paidDate'
    },
    {
      name: 'Paid Via',
      key: 'paidVia'
    },
    {
      name: 'Paid Amount',
      key: 'amountPaid'
    },
    {
      name: 'Term Due',
      key: 'termDue'
    }
  ]

  return (
    <div className='fees_due'>
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='g_flex g-justify-center'>
        <div className='fees_year_select'>
          <IonSelect
            className="custom-select"
            label="Select Reason"
            labelPlacement="floating"
            fill="outline"
            value={'2024-2025'}
            interface="popover"
          >
            <IonSelectOption value="2024-2025">2024-2025</IonSelectOption>
            <IonSelectOption value="2023-2024">2024-2025</IonSelectOption>
            <IonSelectOption value="2022-2023">2024-2025</IonSelectOption>
            <IonSelectOption value="2021-2022">2024-2025</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className='fees_card_holder'>
        <IonCard>
          <IonCardContent>
            <div className='g_flex g-justify-center'>
              <div className='selected_year_show'><p>2024-2025</p></div>
            </div>
            <div className='g_flex student_info'>
              <div className='g_half_width'>
                <IonLabel>Full Name</IonLabel>
                <IonText>
                  <h4>{"<Student Name>"}</h4>
                </IonText>
              </div>
              <div className='g_half_width'>
                <IonLabel>Father / Guardian</IonLabel>
                <IonText>
                  <h4>{"<Father Guardian>"}</h4>
                </IonText>
              </div>
            </div>
            <div className='g_flex student_info'>
              <div className='g_half_width'>
                <IonLabel>Class of Study</IonLabel>
                <IonText>
                  <h4>{"<Class>"}</h4>
                </IonText>
              </div>
              <div className='g_half_width'>
                <IonLabel>Section</IonLabel>
                <IonText>
                  <h4>{"<Section>"}</h4>
                </IonText>
              </div>
            </div>
            <div className='g_flex g-space-between'>
              <div>
                <IonLabel>Academic Fees</IonLabel>
              </div>
              <div>
                <IonText>
                  <h4>{"Rs. 20000.00"}</h4>
                </IonText>
              </div>
            </div>
            <div className='g_flex g-space-between'>
              <div>
                <IonLabel>Remaining Fees</IonLabel>
              </div>
              <div>
                <IonText>
                  <h4>{"Rs. 10000.00"}</h4>
                </IonText>
              </div>
            </div>
            <div>
              {
                feesPaidTerms.map((feesItem:any) => (
                  <div className='g_flex g-space-between fees_term_item' key={feesItem.id}>
                    <div className='term_details'>
                      <div className='g_flex g-space-between term_info'>
                        <IonText>
                          <h2>{feesItem.term}</h2>
                        </IonText>
                        <div className='g_flex'>
                          <IonText>
                            <p className='g_font-weight_600'>$ {feesItem.amountToBePaid}</p>
                          </IonText>
                          <IonIcon icon={feesItem.termDue === 0 ? checkmarkCircleOutline : closeCircleOutline}></IonIcon>
                        </div>
                      </div>
                      {
                        feesItem.isOpen && (<>
                          {loopItems.map((paidInfo:any, index) => (
                            <div key={index} className='g_flex g-space-between'>
                              <IonText>
                                <p>{paidInfo.name}</p>
                              </IonText>
                              <IonText>
                                <p>{(paidInfo.name).includes('Date') ? <>{formatDate(feesItem[paidInfo.key])}</> : <>{feesItem[paidInfo.key]}</> }</p>
                              </IonText>
                            </div>
                          ))}
                        </>)
                      }
                    </div>
                    <div className='term_expand g_flex g-align-center'>
                      <IonIcon icon={feesItem.isOpen ? removeCircleOutline : addCircleOutline}></IonIcon>
                    </div>
                  </div>
                ))
              }
            </div>

          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default FeesDues;
