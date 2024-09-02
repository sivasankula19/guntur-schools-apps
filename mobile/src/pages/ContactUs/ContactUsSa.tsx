import { IonIcon, IonInput, IonLabel, IonText } from '@ionic/react'
import { bookOutline, callOutline, locationOutline, mailOpenOutline } from 'ionicons/icons'
import React from 'react'

const ContactUsSa = () => {
    return (
        <div className='contact_us_sa g_full_height'>
            <div>
                <div className='m-v-10 g_flex g_jstfy_content_cntr'>
                    <IonLabel className='sub_heading'>Principal Details</IonLabel>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Full Name" labelPlacement="floating" fill="outline" placeholder="Enter Full Name"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Email" labelPlacement="floating" fill="outline" placeholder="Enter Email"></IonInput>
                    <IonIcon icon={mailOpenOutline}></IonIcon>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Mobile Number" labelPlacement="floating" fill="outline" placeholder="Enter Mobile Number"></IonInput>
                    <IonIcon icon={callOutline}></IonIcon>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Location" labelPlacement="floating" fill="outline" placeholder="Enter Location"></IonInput>
                    <IonIcon icon={locationOutline}></IonIcon>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Qualification" labelPlacement="floating" fill="outline" placeholder="Enter Qualification"></IonInput>
                    <IonIcon icon={bookOutline}></IonIcon>
                </div>
            </div>
            <div>
                <div className='m-v-10 g_flex g_jstfy_content_cntr'>
                    <IonLabel className='sub_heading'>School Full Address</IonLabel>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Line Number 1" labelPlacement="floating" fill="outline" placeholder="House Number,Street 1"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Line Number 2" labelPlacement="floating" fill="outline" placeholder="Line Number 2"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="City" labelPlacement="floating" fill="outline" placeholder="Enter City"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Town" labelPlacement="floating" fill="outline" placeholder="Enter Town"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="District" labelPlacement="floating" fill="outline" placeholder="Enter District"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Pin Code" labelPlacement="floating" fill="outline" placeholder="Enter Pin Code"></IonInput>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="School Email" labelPlacement="floating" fill="outline" placeholder="school@gvtscl"></IonInput>
                    <IonIcon icon={mailOpenOutline}></IonIcon>
                </div>
                <div className='field m-bottom-10'>
                    <IonInput label="Mobile Number" labelPlacement="floating" fill="outline" placeholder="+917995954105"></IonInput>
                    <IonIcon icon={callOutline}></IonIcon>
                </div>
            </div>
            <div>
                <div className='m-v-10 g_flex g_jstfy_content_cntr'>
                    <IonLabel className='sub_heading'>Google Location</IonLabel>
                </div>
                <div className='g_flex g_jstfy_content_cntr m-bottom-10'>
                    <div className='field width-80'>
                        <IonInput label="Location" labelPlacement="floating" fill="outline" placeholder="Enter Location"></IonInput>
                        <IonIcon icon={locationOutline}></IonIcon>
                    </div>
                </div>
                <div className='g_flex g_jstfy_content_cntr'>
                    <div className='google_location g_flex g_jstfy_content_cntr g_align_cntr'>
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