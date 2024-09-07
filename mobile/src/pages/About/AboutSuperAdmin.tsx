import { IonButton, IonIcon, IonItem, IonLabel, IonText, IonTextarea } from "@ionic/react"
import { addCircleOutline, removeCircleOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"

const AboutSuperAdmin: React.FC = () => {
    const [aboutModuleData, setAboutModuleData] = useState<any>({
        schoolInfo: {
            schoolName: '',
            schoolLocation: '',
        },
        mission: '',
        vision: '',
        establishedOn: '',
        location: '',
        staffCount: '',
        studentCount: '',
        facilities: [],
        achievements: [],
        recognitions: ''
    })

    useEffect(() => {
        setAboutModuleData({
            schoolInfo: {
                schoolName: 'Government High School',
                schoolLocation: 'Madugula',
            },
            mission: 'Pursuit of excellence in Academics Games and Sports, Co-curricular activities and in Human Values.Development of Personality, instilling Qualities of self-',
            vision: 'Pursuit of excellence in Academics Games and Sports, Co-curricular activities and in Human Values.Development of Personality, instilling Qualities of self-',
            establishedOn: '2019',
            location: 'Madugula <x-y>',
            staffCount: '12',
            studentCount: '789',
            facilities: ["Ac Class Rooms", "Specialized Staff", "Spoken English Classes", "Digital library"],
            achievements: ["Best Edu. Institute in AP",],
            recognitions: 'Recognized by Government of Andrapradhesh'
        })
    }, []);


    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setAboutModuleData((prev: any) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="g_full_height">
            <div className="school_name_sa">
                <IonText>
                    <p>{aboutModuleData.schoolInfo.schoolName} {aboutModuleData.schoolInfo.schoolLocation}</p>
                </IonText>
            </div>
            <div>
                <div className="scl_banner g_flex g-align-center g-justify-center">
                    <div>
                        <input name="shool_logo" id="school_logo" type="file" placeholder="Please upload image" />
                        <div className="g_txt_center">School Logo</div>
                    </div>
                </div>
            </div>
            <div className="sa_field">
                <IonLabel>Mission</IonLabel>
                <IonItem>
                    <IonTextarea
                        name="mission"
                        id="mission"
                        onIonChange={handleInputChange}
                        value={aboutModuleData.mission}
                        placeholder="Please Enter Your School Mission"
                        autoGrow={true}
                    ></IonTextarea>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Vision</IonLabel>
                <IonItem>
                    <IonTextarea
                        name="vision"
                        id="vision"
                        onIonChange={handleInputChange}
                        value={aboutModuleData.vision}
                        placeholder="Please Enter Your School Mission"
                        autoGrow={true}
                    ></IonTextarea>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Established On</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="establishedOn" id="establishedOn" value={aboutModuleData.establishedOn} placeholder="Enter Year" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Location</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="location" id="location" value={aboutModuleData.location} placeholder="Enter Location" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Staff Count</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="staffCount" id="staffCount" value={aboutModuleData.staffCount} placeholder="Enter Staff Count" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Student Count</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="studentCount" id="studentCount" value={aboutModuleData.studentCount} placeholder="Enter Student Count" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Facilities</IonLabel>
                <RenderLoopItems data={aboutModuleData.facilities || []} />
                <IonItem>
                    <div className="g_flex g-space-between g_full_width">
                        <div className="width-80">
                            <input className="g_full_width" placeholder="Add Facilities Here!." />
                        </div>
                        <div>
                            <IonButton fill="outline">
                                <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </div>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Achievements</IonLabel>
                <RenderLoopItems data={aboutModuleData.achievements || []} />
                <IonItem>
                    <div className="g_flex g-space-between g_full_width">
                        <div className="width-80">
                            <input className="g_full_width" placeholder="Add Achievements Here!." />
                        </div>
                        <div>
                            <IonButton fill="outline">
                                <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </div>
                </IonItem>
            </div>
            <div className="sa_field pb-px-200">
                <IonLabel>Recognitions</IonLabel>
                <IonItem>
                    <IonTextarea
                        name="recognitions"
                        id="recognitions"
                        onIonChange={handleInputChange}
                        value={aboutModuleData.recognitions}
                        placeholder="Please Enter Recognitions"
                        autoGrow={true}
                    ></IonTextarea>
                </IonItem>
            </div>
        </div>
    )
}

const RenderLoopItems = ({ data = [] }: any) => {
    return (
        data.length ? data.map((dataItem: string) => (<div key={Math.random().toLocaleString()} className="g_flex g-space-between">
            <div className="g_flex height-px-40 g-align-center about_text">
                <div className="dot-8"></div>
                <IonText>
                    <p>{dataItem}</p>
                </IonText>
            </div>
            <div className="g_flex height-px-40 g-align-center remove_about">
                <IonIcon icon={removeCircleOutline}></IonIcon>
            </div>
        </div>)) : <></>
    )
}

export default AboutSuperAdmin
