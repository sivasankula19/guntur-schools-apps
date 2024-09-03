import React from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { addCircleOutline, checkmarkCircleOutline, closeCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { formatDate } from '../../common/utility';

const FeesDuesSA: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Fee Structure', path: '/fee-structure' }];

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
      <div className='g_flex g_jstfy_content_cntr'>
        <div className='fees_year_select'>
          <IonSelect
            className="custome_select"
            label="Select Reason"
            // labelPlacement="floating"
            fill="outline"
            value={'2024-2025'}
            interface="popover">
            <IonSelectOption value="2024-2025">2024-2025</IonSelectOption>
            <IonSelectOption value="2023-2024">2023-2024</IonSelectOption>
            <IonSelectOption value="2022-2023">2022-2023</IonSelectOption>
            <IonSelectOption value="2021-2022">2021-2022</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className='g_flex g_space_btwn ml-6'>
            <IonSelect
              className="custome_select custom_select_height custom_select_width ml-6"
              label="Select Class"
              fill="outline"
              value={'9'}
              interface="popover">
              <IonSelectOption value="7">7th class</IonSelectOption>
              <IonSelectOption value="8">8th class</IonSelectOption>
              <IonSelectOption value="9">9th class</IonSelectOption>
              <IonSelectOption value="10">10th class</IonSelectOption>
            </IonSelect>
          <IonSelect
            className="custome_select custom_select_height custom_select_width "
            label="Select Section"
            fill="outline"
            value={'A'}
            interface="popover">
            <IonSelectOption value="A">A section</IonSelectOption>
            <IonSelectOption value="B">B section</IonSelectOption>
            <IonSelectOption value="C">C section</IonSelectOption>
          </IonSelect>
      </div>
      <div className='g_flex g_jstfy_content_cntr'>
        <div className='fees_year_select'>
          <IonSelect
            className="custome_select"
            label="Select Student"
            // labelPlacement="floating"
            fill="outline"
            value={'y179a10'}
            interface="popover">
            <IonSelectOption value="y179a10">siva</IonSelectOption>
            <IonSelectOption value="y179a12">deva</IonSelectOption>
            <IonSelectOption value="y179a16">minoosh</IonSelectOption>
            <IonSelectOption value="y179a19">mani</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className='fees_card_holder'>
        <IonCard>
          <IonCardContent>
            <div className='g_flex g_jstfy_content_cntr'>
              <div className='selected_year_show'><p>20000</p></div>
            </div>
            <div className='g_flex student_info'>
              <div className='g_half_width'>
                <IonLabel>Full Name sa</IonLabel>
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
            <div className='g_flex g_space_btwn'>
              <div>
                <IonLabel>Academic Fees</IonLabel>
              </div>
              <div>
                <IonText>
                  <h4>{"Rs. 20000.00"}</h4>
                </IonText>
              </div>
            </div>
            <div className='g_flex g_space_btwn'>
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
                  <div className='g_flex g_space_btwn fees_term_item' key={feesItem.id}>
                    <div className='term_details'>
                      <div className='g_flex g_space_btwn term_info'>
                        <IonText>
                          <h2>{feesItem.term}</h2>
                        </IonText>
                        <div className='g_flex'>
                          <IonText>
                            <p className='g_fontwht_600'>$ {feesItem.amountToBePaid}</p>
                          </IonText>
                          <IonIcon icon={feesItem.termDue === 0 ? checkmarkCircleOutline : closeCircleOutline}></IonIcon>
                        </div>
                      </div>
                      {
                        feesItem.isOpen && (<>
                          {loopItems.map((paidInfo:any, index) => (
                            <div key={index} className='g_flex g_space_btwn'>
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
                    <div className='term_expand g_flex g_align_cntr'>
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

export default FeesDuesSA;
