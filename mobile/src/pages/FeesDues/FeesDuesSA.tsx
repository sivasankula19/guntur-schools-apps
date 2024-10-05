import React, { useEffect, useRef, useState } from 'react';
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
  caretDownOutline,
  caretUpOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeCircleOutline,
} from 'ionicons/icons';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { classListDummy, searchStudentsData, sectionListDummy } from '../../common/utility';
import GCustomItemSelect from '../../components/GCustomItemSelect';

const initialStateForTermFees: any = [
  {
    id: 1,
    term_name: 'term1',
    term_fixed_amount: 5000
  },
  {
    id: 2,
    term_name: 'term1',
    term_fixed_amount: 5000
  }
]
const FeesDuesSA: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isAddClassModal, setIsAddClassModal] = useState<boolean>(false);
  const [addModalForSettleup, setAddModalForSettleup] = useState<boolean>(false);
  const [term_fees, setTermFees] = useState<any>(initialStateForTermFees);
  const [currentTerm, setCurrentTerm] = useState<any>('');
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isOpenStudentCard, setIsOpenStudentCard] = useState<boolean>(false);
  const [isOpenMonthYearCard, setIsOpenMonthYearCard] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<any>({
    "itemName": "Narra Dev Qumar",
    "itemId": "GHMS00020",
    "itemDescription": ''
  });
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('24-25')
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  const studentsDisplayRef = useRef<any>();
  const monthYearDetailsRef = useRef<any>();

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Fee Structure', path: '/fee-structure' },];

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

  const calendarAcademicYears = [
    { year: '2022-2023', id: '22-23', },
    { year: '2023-2024', id: '23-24', },
    { year: '2024-2025', id: '24-25', },
    { year: '2025-2026', id: '25-26', },

  ];

  useEffect(() => {
    setSearchResult(searchStudentsData);
  }, [])

  const handleModelClose = () => {
    setCurrentTerm(() => '')
    setTermFees(() => initialStateForTermFees)
    setIsAddClassModal(() => false);
    setAddModalForSettleup(() => false)
    // setFormValue(formInitialVal);
  };

  const handleSubmit = () => { };

  const handleInput = (e: any) => {
    // setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTerm = () => {
    setTermFees([...term_fees, {
      id: term_fees.length + 1,
      term_name: `term${term_fees.length + 1}`,
      term_fixed_amount: 0
    }])
  }

  const handleClickTerm = (current_term: any) => {
    setCurrentTerm(() => current_term)
    setAddModalForSettleup(() => true)
  }

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleAcademicYearChange = (year: any) => {
    setSelectedAcademicYear(year.id)
  }

  return (
    <div className="fees_due">
      <GBreadCrumbs data={breadCrumbsValue} />
      <div className='p-h-10'>
        <IonCard className='custom-att-card'>
          <IonCardContent className='padding-0'>
            <div className='back-save-icons g-align-center'>
              <IonIcon icon={chevronBackOutline}></IonIcon>
              <div className='g_flex p-h-10 username-holder' ref={monthYearDetailsRef}>
                <IonLabel>
                  {calendarAcademicYears.find(i => i.id === selectedAcademicYear)?.year || '--'}
                </IonLabel>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonCardContent>
        </IonCard>
        <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.studentName, itemId: i.regNumber, itemDescription: i.className + i.sectionName }))}
          isOpen={isOpenMonthYearCard}
          setIsOpen={setIsOpenMonthYearCard}
          isPlain={true}
          parentItemDetailsRef={monthYearDetailsRef}
        ><div className='g_flex g-justify-center' >
            <div className='g_half_width g_txt_center g_full_height'>
              <div className='g_full_height month-date-dis  o-flow-y'>
                {calendarAcademicYears.map((m, mIndex) => (<div onClick={() => handleAcademicYearChange(m)} className={`height-px-40 month-year-item ${m.id == selectedAcademicYear ? 'selected-month-year' : ''}`} key={mIndex}>{m.year}</div>))}
              </div>
            </div>
          </div></GCustomItemSelect>
      </div>
      <div className='g_flex p-h-10 g-space-between'>
        <div style={{ width: '47%' }}>
          <GCustomSelectDrop options={classDummyData} name='classId'
            value={filterValues.classId} label="Select Class"
            handleOnChange={handleChange} classNames='custom-select' />
        </div>
        <div style={{ width: '47%' }}>
          <GCustomSelectDrop options={sectionDummyData} name='sectionId'
            value={filterValues.sectionId} label="Select Section"
            handleOnChange={handleChange} classNames='custom-select' />
        </div>
      </div>
      <div className='p-h-10'>
        <IonCard className='custom-att-card'>
          <IonCardContent className='padding-0'>
            <div className='back-save-icons g-align-center'>
              <IonIcon icon={chevronBackOutline}></IonIcon>
              <div className='g_flex p-h-10 username-holder m-width-60' ref={studentsDisplayRef}>
                <IonLabel class='g_text_ellipses'>
                  {selectedStudent.itemName}
                </IonLabel>
                <IonLabel>
                  ({selectedStudent.itemId})
                </IonLabel>
                <IonIcon icon={isOpenStudentCard ? caretUpOutline : caretDownOutline}></IonIcon>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonCardContent>
        </IonCard>
        <GCustomItemSelect itemData={searchResult.map((i: any) => ({ itemName: i.studentName, itemId: i.regNumber, itemDescription: i.className + i.sectionName }))}
          isOpen={isOpenStudentCard}
          setIsOpen={setIsOpenStudentCard}
          selectedItem={selectedStudent}
          setSelectedItem={setSelectedStudent}
          parentItemDetailsRef={studentsDisplayRef}
        />
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
              styles={{ maxHeight: '41vh' }}
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

              {term_fees.map((termData: any, indexSec: number) => (
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
                      <IonText onClick={() => handleClickTerm(feesItem.term)}>
                        <p className="g-fontsize-12 settleup">Settled Up</p>
                      </IonText>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { setAddModalForSettleup(() => true) }} className="convert_to_terms_btn g-fontweight-500 g-fontsize-16 text-color-blue">
              Pay Total Fees
            </button>
            <CustomizedModal
              title={`Settle Up ${currentTerm}`}
              isOpen={addModalForSettleup}
              onClose={handleModelClose}
              onSave={handleSubmit}
              styles={{ maxHeight: '54vh' }}
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
