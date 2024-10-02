import { IonLabel, IonText } from '@ionic/react'
import { bookOutline, callOutline, locationOutline, mailOpenOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import GCustomInput from '../../components/GCustomInput'

const ContactUsSa = () => {
    const [location, setLocation] = useState('');
    const formInitialVal = {
        fullName: '',
        email: '',
        mobileNumber: '',
        location: '',
        qualification: '',
    }
    const [formValue, setFormValue] = useState<any>(formInitialVal);
    const formInitialAddress = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        town: '',
        district: '',
        pinCode: '',
        schoolEmail: '',
        mobileNumber: '',
    }
    const [formAddressValue, setFormAddressValue] = useState<any>(formInitialAddress);

    const handleInput = (e: any) => {
        setFormValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleAddressInput = (e: any) => {
        setFormAddressValue((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleLocationChange = (e: any) => {
        setLocation(e.target.value);
    }

    return (
        <div className='contact_us_sa g_full_height'>
            <div>
                <div className='m-v-10 g_flex g-justify-center'>
                    <IonLabel className='sub_heading'>Principal Details</IonLabel>
                </div>
                <GCustomInput name={'fullName'} value={formValue['fullName']} onInput={handleInput} label={'Full Name'} placeholder={'Full Name'} />
                <GCustomInput name={'email'} icon={mailOpenOutline} value={formValue['email']} onInput={handleInput} label={'Email Address'} placeholder={'Email Address'} />
                <GCustomInput name={'mobileNumber'} icon={callOutline} value={formValue['mobileNumber']} onInput={handleInput} label={'Mobile Number'} placeholder={'Mobile Number'} />
                <GCustomInput name={'location'} icon={locationOutline} value={formValue['location']} onInput={handleInput} label={'Location'} placeholder={'Enter Location'} />
                <GCustomInput name={'qualification'} icon={bookOutline} value={formValue['qualification']} onInput={handleInput} label={'Qualification'} placeholder={'Enter Qualification'} />
            </div>
            <div>
                <div className='m-v-10 g_flex g-justify-center'>
                    <IonLabel className='sub_heading'>School Full Address</IonLabel>
                </div>
                <GCustomInput name={'addressLine1'} value={formValue['addressLine1']} onInput={handleAddressInput} label={'Address Line 1'} placeholder={'House No.'} />
                <GCustomInput name={'addressLine2'} value={formValue['addressLine2']} onInput={handleAddressInput} label={'Address Line 2'} placeholder={'Road Name'} />
                <GCustomInput name={'city'} value={formValue['city']} onInput={handleAddressInput} label={'City'} placeholder={'Enter City Name'} />
                <GCustomInput name={'town'} value={formValue['town']} onInput={handleAddressInput} label={'Town Name'} placeholder={'Enter Town Name'} />
                <GCustomInput name={'district'} value={formValue['district']} onInput={handleAddressInput} label={'District'} placeholder={'Enter District'} />
                <GCustomInput name={'pinCode'} value={formValue['pinCode']} onInput={handleAddressInput} label={'Pin Code'} placeholder={'Enter Pin Code'} />
                <GCustomInput name={'schoolEmail'} icon={mailOpenOutline} value={formValue['schoolEmail']} onInput={handleAddressInput} label={'School Email'} placeholder={'Enter School Email'} />
                <GCustomInput name={'mobileNumber'} icon={callOutline} value={formValue['mobileNumber']} onInput={handleAddressInput} label={'School Mobile Number'} placeholder={'Enter School Mobile Number'} />
            </div>
            <div>
                <div className='m-v-10 g_flex g-justify-center'>
                    <IonLabel className='sub_heading'>Google Location</IonLabel>
                </div>
                <div className='g_flex g-justify-center m-bottom-10'>
                    <div className='field width-80'>
                        <GCustomInput name={'location'} icon={locationOutline} value={location} onInput={handleLocationChange} label={'Location'} placeholder={'Enter Exact Location'} />
                    </div>
                </div>
                <div className='g_flex g-justify-center'>
                    <div className='google_location g_flex g-justify-center g-align-center'>
                        <IonText>
                            <p>pick your current location</p>
                        </IonText>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUsSa