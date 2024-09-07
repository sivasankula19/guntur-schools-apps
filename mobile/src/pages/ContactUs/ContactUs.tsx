import React from 'react';
import { IonButton, IonCard, IonCardContent, IonIcon, IonInput, IonSelect, IonSelectOption, IonText, IonTextarea } from '@ionic/react';
import { copyOutline, expandOutline, locationOutline, mailOutline, phonePortraitOutline, schoolOutline } from 'ionicons/icons';

const ContactUs: React.FC = () => {

  return (
    <div>
      <div className='principal'>
        <div className='principal_contact'>
          <div className='g_flex'>
            <div className='profile_img'>
              <img src='https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106'></img>
            </div>
            <div className='name_designation'>
              <IonText>
                <h4 className='g_text_ellipses'>{"Principal GVT schl"}</h4>
              </IonText>
              <IonText>
                <p className='g_text_ellipses'>{"MD Math PHD"}</p>
              </IonText>
            </div>
          </div>
          <div className='g_flex g-space-between contact_me'>
            <div className='left'>
              <IonIcon icon={mailOutline}></IonIcon>
              <IonText>
                <a className='g_text_ellipses'>{"principal@gvtscl.com"}</a>
              </IonText>
            </div>
            <div className='right'>
              <IonIcon icon={copyOutline}></IonIcon>
            </div>
          </div>
          <div className='g_flex g-space-between contact_me'>
            <div className='left'>
              <IonIcon icon={phonePortraitOutline}></IonIcon>
              <IonText>
                <a className='g_text_ellipses'>{"+91 9999888812"}</a>
              </IonText>
            </div>
            <div className='right'>
              <IonIcon icon={copyOutline}></IonIcon>
            </div>
          </div>
          <div className='g_flex loc_design'>
            <div className='left'>
              <IonIcon icon={locationOutline}></IonIcon>
              <IonText>
                <p className='g_text_ellipses'>{"Madugula"}</p>
              </IonText>
            </div>
            <div className='right'>
              <IonIcon icon={schoolOutline}></IonIcon>
              <IonText>
                <p className='g_text_ellipses'>{"Phd Mphill"}</p>
              </IonText>
            </div>
          </div>
        </div>
      </div>
      <div className='contact_mbl_eml'>
        <IonText>
          <h6>Mobile</h6>
        </IonText>
        <IonText>
          <p>+91 9999888876</p>
        </IonText>
        <IonText>
          <h6>Email</h6>
        </IonText>
        <IonText>
          <p>gvtscl@gvtscl.com</p>
        </IonText>
        <IonText>
          <h6>Location</h6>
        </IonText>
        <IonText>
          <a>Madugula</a>
        </IonText>
      </div>
      <div className='contact_location'>
        <IonText><h5>Location</h5></IonText>
        <div className='location_map'>
          <IonText>
            <p>Location</p>
          </IonText>
          <div className='full_view'>
            <IonIcon icon={expandOutline}></IonIcon>
          </div>
        </div>
      </div>
      <div className='contact_address'>
        <IonText><h5>Address</h5></IonText>
        <div className='full_add'>
          <IonText><p>SchoolName</p></IonText>
          <IonText><p>AddressLine 1</p></IonText>
          <IonText><p>Address Line 2</p></IonText>
          <IonText><p>City</p></IonText>
          <IonText><p>State</p></IonText>
          <IonText><p>Postal Code</p></IonText>
        </div>
      </div>
      <IonCard>
        <IonCardContent>
          <IonText className='g_txt_center'>
            <h4>Contact Form</h4>
          </IonText>
          <form>
            <div className='contact_field'>
              <IonInput
                value={""}
                onIonInput={() => { }}
                className="custom-ion-input_home"
                label={'Full Name'}
                labelPlacement="floating"
                fill="outline"
              ></IonInput>
            </div>
            <div className='contact_field'>
              <IonInput
                value={""}
                onIonInput={() => { }}
                className="custom-ion-input_home"
                label={'Email Address'}
                labelPlacement="floating"
                fill="outline"
              ></IonInput>
            </div>
            <div className='contact_field'>
              <IonSelect
                className="custom-select"
                label="Select Reason"
                labelPlacement="floating"
                fill="outline"
                interface="popover"
                onIonChange={(e) =>
                  console.log(
                    `ionChange fired with value: ${e.detail.value}`
                  )
                }
              >
                <IonSelectOption value="admission">Admission</IonSelectOption>
                <IonSelectOption value="exams">Exams</IonSelectOption>
                <IonSelectOption value="games">Games</IonSelectOption>
                <IonSelectOption value="others">Others</IonSelectOption>
              </IonSelect>
            </div>
            <div className='contact_field'>
              <IonTextarea label={'Description...'}
                labelPlacement="floating"
                fill="outline"></IonTextarea>
            </div>
            <div className='g_flex g-justify-center'>
              <IonButton>Submit</IonButton>
            </div>
          </form>
        </IonCardContent>
      </IonCard>
    
    </div>
  );
};

export default ContactUs;
