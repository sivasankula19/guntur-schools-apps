import React, { useState } from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/react';
import {
  addCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import CustomizedModal from '../../components/GCustomizedModal';

const initialStateForTermFees:any=[
  {
    id:1,
    term_name:'term1',
    term_fixed_amount:5000
  },
  {
    id:2,
    term_name:'term1',
    term_fixed_amount:5000
  }
]
const FeesDuesSA: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
  const [addModalForSettleup, setAddModalForSettleup] = useState<boolean>(false);
  const [term_fees,setTermFees]=useState<any>(initialStateForTermFees)
  const [currentTerm,setCurrentTerm]=useState<any>('')

  
  const breadCrumbsValue = [
    { bName: 'Home', path: '/dashboard' },
    { bName: 'Fee Structure', path: '/fee-structure' },
  ];

  const termsData = [
    {term:1,fee:''}
  ]

  const feesPaidTerms = [
    {
      id: 1,
      academicFees: 20000,
      term: 'Term 1',
      amountToBePaid: 5000.0,
      amountPaid: 5000.0,
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
      amountToBePaid: 5000.0,
      amountPaid: 5000.0,
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
      amountToBePaid: 5000.0,
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
      amountToBePaid: 5000.0,
      amountPaid: 0,
      plannedDate: '2024-06-26T14:06:43.088Z',
      paidDate: '',
      paidVia: '',
      termDue: 5000,
      isOpen: false,
    },
  ];

  const loopItems = [
    {
      name: 'Planned Date',
      key: 'plannedDate',
    },
    {
      name: 'Paid Date',
      key: 'paidDate',
    },
    {
      name: 'Paid Via',
      key: 'paidVia',
    },
    {
      name: 'Paid Amount',
      key: 'amountPaid',
    },
    {
      name: 'Term Due',
      key: 'termDue',
    },
  ];

  const handleModelClose = () => {
    setCurrentTerm(()=>'')
    setTermFees(()=>initialStateForTermFees)
    setIsAddClassModal(()=>false);
    setAddModalForSettleup(()=>false)
    // setFormValue(formInitialVal);
  };

  const handleSubmit = () => {};

  const handleInput = (e: any) => {
    // setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTerm=()=>{
    setTermFees([...term_fees,{
      id:term_fees.length+1,
      term_name:`term${term_fees.length+1}`,
      term_fixed_amount:0
    }])
  }

  const handleClickTerm=(current_term:any)=>{
        setCurrentTerm(()=>current_term)
        setAddModalForSettleup(()=>true)
  }

  return (
    <div className="fees_due">
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className="g_flex g-justify-center adjust-space">
        <div className="fees_year_select">
          <IonSelect
            className="custom-select"
            label="Select Year"
            // labelPlacement="floating"
            fill="outline"
            value={'2024-2025'}
            interface="popover"
          >
            <IonSelectOption value="2024-2025">2024-2025</IonSelectOption>
            <IonSelectOption value="2023-2024">2023-2024</IonSelectOption>
            <IonSelectOption value="2022-2023">2022-2023</IonSelectOption>
            <IonSelectOption value="2021-2022">2021-2022</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className="g_flex g-space-between mr3 ml3">
        <IonSelect
          className="custom-select fees_sa_select"
          label="Select Class"
          fill="outline"
          value={'9'}
          interface="popover"
        >
          <IonSelectOption value="7">7th class</IonSelectOption>
          <IonSelectOption value="8">8th class</IonSelectOption>
          <IonSelectOption value="9">9th class</IonSelectOption>
          <IonSelectOption value="10">10th class</IonSelectOption>
        </IonSelect>
        <IonSelect
          className="custom-select fees_sa_select"
          label="Select Section"
          fill="outline"
          value={'A'}
          interface="popover"
        >
          <IonSelectOption value="A">A section</IonSelectOption>
          <IonSelectOption value="B">B section</IonSelectOption>
          <IonSelectOption value="C">C section</IonSelectOption>
        </IonSelect>
      </div>
      <div className="g_flex g-justify-center adjust-space">
        <div className="fees_year_select">
          <IonSelect
            className="custom-select"
            label="Select Student"
            // labelPlacement="floating"
            fill="outline"
            value={'y179a10'}
            interface="popover"
          >
            <IonSelectOption value="y179a10">siva</IonSelectOption>
            <IonSelectOption value="y179a12">deva</IonSelectOption>
            <IonSelectOption value="y179a16">minoosh</IonSelectOption>
            <IonSelectOption value="y179a19">mani</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className="fees_card_holder">
        <IonCard>
          <IonCardContent>
            <div className="g_flex g-space-between g-align-center">
              <div>
                <p className="g-fontweight-400 g-fontsize-14">
                  Total Fees For Academic
                </p>
              </div>
              <div className="selected_year_show">
                <p className="g-fontsize-12 g-fontweight-600">20000</p>
              </div>
            </div>
            <div className="g_flex student_info">
              <div className="g_half_width">
                <IonLabel>Full Name</IonLabel>
                <IonText>
                  <h4>{'<Student Name>'}</h4>
                </IonText>
              </div>
              <div className="g_half_width">
                <IonLabel>Father / Guardian</IonLabel>
                <IonText>
                  <h4>{'<Father Guardian>'}</h4>
                </IonText>
              </div>
            </div>
            <div className="g_flex student_info">
              <div className="g_half_width">
                <IonLabel>Class of Study</IonLabel>
                <IonText>
                  <h4>{'<Class>'}</h4>
                </IonText>
              </div>
              <div className="g_half_width">
                <IonLabel>Section</IonLabel>
                <IonText>
                  <h4>{'<Section>'}</h4>
                </IonText>
              </div>
            </div>
            <button
              onClick={() => {
                setIsAddClassModal(true);
              }}
              className="convert_to_terms_btn g-fontweight-500 g-fontsize-16 text-color-blue"
            >
              Convert To Terms
            </button>
            <CustomizedModal
              title={`Convert Fees To Terms`}
              isOpen={isAddClassModal}
              onClose={handleModelClose}
              onSave={handleSubmit}
              styles={{maxHeight:'41vh'}}
            >
              {/* <div> */}
              <div className="g_flex g-space-between g-align-center">
              <div>
                <p className="g-fontweight-400 g-fontsize-14">
                  Total Fees For Academic
                </p>
              </div>
              <div className="total_fee_main">
                <p className="g-fontsize-12 g-fontweight-600">20000</p>
              </div>
            </div>
                
                {term_fees.map((termData:any, indexSec:number) => (
                  <div key={indexSec} className="m-bottom-10 g_flex g-space-between">                 
                    <IonInput
                    value={termData.term_name}
                    onIonChange={handleInput}
                    name="TermName"
                    label="Term Name"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Term Name"
                    className='fees_input'
                    ></IonInput>
                  <IonInput
                    value={termData.term_fixed_amount}
                    onIonChange={handleInput}
                    name="TermFixedAmount"
                    label="Term Fixed Amount"
                    labelPlacement="floating"
                    fill="outline"
                    placeholder="Term Fixed Amount"
                    className='fees_input'
                  ></IonInput>
                    
                    
                  </div>
                ))}
                 <div className="g_flex g-space-between g-align-center">
                    <div>
                      <p className="g-fontweight-400 g-fontsize-14">
                        Total Remaining Amount
                      </p>
                    </div>
                    <div className="total_fee_main">
                      <p className="g-fontsize-12 g-fontweight-600">20000</p>
                    </div>
                    <div className="close-section-icon" onClick={addTerm}>
                      <IonIcon icon={addCircleOutline}></IonIcon>
                    </div>
                </div>
                
               
              {/* </div> */}
            </CustomizedModal>

            <div>
              {feesPaidTerms.map((feesItem: any) => (
                <div
                  className="g_flex g-space-between fees_term_item"
                  key={feesItem.id}
                >
                  <div className="term_details">
                    <div className="g_flex g-space-between term_info">
                      <IonText>
                        <h2 className="g-fontweight-600 g-fontsize-16">
                          {feesItem.term}
                        </h2>
                      </IonText>
                      <div className="g_flex g-space-between term g-align-center">
                        <IonText>
                          <h2 className="g-fontweight-600 g-fontsize-12">
                            Term Amount
                          </h2>
                        </IonText>
                        <IonText>
                          <p className="g-fontweight-500 g-fontsize-16">
                            {feesItem.amountToBePaid}
                          </p>
                        </IonText>
                        <IonIcon
                          icon={
                            feesItem.termDue === 0
                              ? checkmarkCircleOutline
                              : closeCircleOutline
                          }
                          className={
                            feesItem.termDue === 0 ? 'paid' : 'expired'
                          }
                        ></IonIcon>
                      </div>
                    </div>

                    <div className="g_flex g-space-between term_info">
                      <div className="g_flex g-space-between term g-align-center">
                        <IonText>
                          <h2 className="g-fontweight-600 g-fontsize-12">
                            planned date
                          </h2>
                        </IonText>
                        <IonText>
                          <h2 className="g-fontweight-400 g-fontsize-12">
                            {feesItem?.plannedDate.slice(0, 10)}
                          </h2>
                        </IonText>
                      </div>
                      <IonText onClick={()=>handleClickTerm(feesItem.term)}>
                        <p className="g-fontsize-12 settleup">Settled Up</p>
                      </IonText>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => {setAddModalForSettleup(()=>true)}} className="convert_to_terms_btn g-fontweight-500 g-fontsize-16 text-color-blue">
              Pay Total Fees
            </button>
            <CustomizedModal
              title={`Settle Up ${currentTerm}`}
              isOpen={addModalForSettleup}
              onClose={handleModelClose}
              onSave={handleSubmit}
              styles={{maxHeight:'54vh'}}
            >
              {/* <div> */}
              <div className="g_flex g-space-between g-align-center">
              <div>
                <p className="g-fontweight-400 g-fontsize-14">
                  {currentTerm} Fixed Amount
                </p>
              </div>
              <div className="total_fee_main">
                <p className="g-fontsize-12 g-fontweight-600">20000</p>
              </div>
            </div>
            
            <div className='add_doc_sa'>
              <div className='m-bottom-10'>
                <IonInput className='fees_sa_input' label="Paid On" labelPlacement="floating" fill="outline" placeholder="Paid On"></IonInput>
              </div>
              <div className='m-bottom-10'>
                <IonInput className='fees_sa_input' label="Planned Date/Actual Date" labelPlacement="floating" fill="outline" placeholder="Paid Date/Actual Date"></IonInput>
              </div>
              <div className='field'>
                <IonSelect
                  className="custom-select"
                  multiple={false}
                  label="Paid Via"
                  labelPlacement="floating"
                  fill="outline"
                  interface="popover"
                >
                  <IonSelectOption value="phonepe">Phone Pe</IonSelectOption>
                  <IonSelectOption value="googlepe">Google Pe</IonSelectOption>
                  <IonSelectOption value="paytm">Paytm</IonSelectOption>
                  <IonSelectOption value="direct">Direct</IonSelectOption>
                </IonSelect>
              </div>
            <div className='m-bottom-10'>
              <IonInput className='fees_sa_input' label="Paid Amount" labelPlacement="floating" fill="outline" placeholder="Paid Amount"></IonInput>
            </div>
            <div className='m-bottom-10'>
              <IonInput className='fees_sa_input' label="Remaning Amount" labelPlacement="floating" fill="outline" placeholder="Remaining Amount"></IonInput>
            </div>
          </div>
               
              {/* </div> */}
            </CustomizedModal>
          </IonCardContent>
        </IonCard>
      </div>
    </div>
  );
};

export default FeesDuesSA;
