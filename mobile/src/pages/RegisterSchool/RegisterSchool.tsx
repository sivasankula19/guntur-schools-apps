import { IonCard, IonCardContent, IonContent, IonIcon, IonPage, IonText, IonTextarea } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import GCustomInput from '../../components/GCustomInput';

function RegisterSchool() {

    let formVal = {
        adminFullName: '',
        schoolName: '',
        schoolLocation: '',
        mobileNumber: '',
        email: '',
        description: '',
    }
    const [formValue, setFormValue] = useState(formVal)

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/select-school');
    }

    const handleInput = (e: any) => {
        setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {

    }

    return (
        <IonPage className="my_page">
            <IonContent class='custom_content_view' fullscreen>
                <div className='register-school p-h-16'>
                    <div className='g_flex g-align-center back-icon-scl'>
                        <IonIcon onClick={handleBack} icon={arrowBackOutline}></IonIcon>
                        <IonText onClick={handleBack}><p>Home</p></IonText>
                    </div>
                    <div className='scrollable-scl'>
                        <IonCard>
                            <IonCardContent>
                                <div className='register-scl-form'>
                                    <IonText><p>Register Your School</p></IonText>
                                    <GCustomInput id='adminFullName' name={'adminFullName'} value={formValue.adminFullName} onInput={handleInput} label={'Admin  Full Name'} placeholder={'Post Name'} />
                                    <GCustomInput id='schoolName' name={'schoolName'} value={formValue.schoolName} onInput={handleInput} label={'School Name'} placeholder={'Post Name'} />
                                    <GCustomInput id='schoolLocation' name={'schoolLocation'} value={formValue.schoolLocation} onInput={handleInput} label={'School Location'} placeholder={'Post Name'} />
                                    <GCustomInput id='mobileNumber' name={'mobileNumber'} value={formValue.mobileNumber} onInput={handleInput} label={'Mobile Number'} placeholder={'Post Name'} />
                                    <GCustomInput id='email' name={'email'} value={formValue.email} onInput={handleInput} label={'Post Name'} placeholder={'Email'} />
                                    <div className='field m-bottom-10'>
                                        <IonTextarea id='desc-scl' value={formValue.description} autoGrow={true} rows={4} onIonChange={handleInput} name='description' label="Post Description" labelPlacement="floating" fill="outline" placeholder="description..."></IonTextarea>
                                    </div>
                                    <div className="g_flex g-justify-center">
                                        <button className='reg-req-cb g-font-weight-600 g-font-size-18' onClick={handleSave}>Register</button>
                                    </div>

                                </div>
                            </IonCardContent>
                        </IonCard>
                        <div className='text-info-scl'>
                        <IonText><p className='title'>Next Steps!</p></IonText>
                        <IonText><p className='text-head'>{"1 . Check Your Inbox"}</p></IonText>
                        <IonText><p className='text-data'>{"We Will Send you the Default credentials to your mail/ mobile number"}</p></IonText>
                        <IonText><p className='text-head'>{"2 . Select your school in Home "}</p></IonText>
                        <IonText><p className='text-data'>{"Go back to Home page and select your school and proceed to login screen"}</p></IonText>
                        <IonText><p className='text-head'>{"3 . Select your school in Home "}</p></IonText>
                        <IonText><p className='text-data'>{"Login with provided credentials and create accounts for your staff! && students <>"}</p></IonText>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default RegisterSchool