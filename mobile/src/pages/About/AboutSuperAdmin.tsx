import { IonButton, IonIcon, IonItem, IonLabel, IonText, IonTextarea } from "@ionic/react"
import axios from "axios"
import { addCircleOutline, removeCircleOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import { AboutModuleData } from "../../common/utility"

const AboutSuperAdmin: React.FC = () => {
    const [aboutData, setAboutData] = useState();
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
        newFacility: '',
        newAchievement: '',
        newRecognition: '',
        achievements: [],
        recognitions: []
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
            recognitions: ['Recognized by Government of Andrapradhesh']
        })
    }, []);

    useEffect(() => {
        if (aboutData)
            setAboutModuleData(aboutData)
    }, [aboutData]);



    const handleInputChange = (event: any) => {
        const { name, value } = event.target
        setAboutModuleData((prev: any) => ({ ...prev, [name]: value }))
    }

    console.log(aboutModuleData)

    const addFacility = (type: string, subType: string) => {
        const arr = [...(aboutModuleData[type])];
        arr.push(aboutModuleData[subType]);

        setAboutModuleData((prev: any) => ({ ...prev, [type]: arr, [subType]: '' }));
    }


    const sendAboutData = () => {
        const apiurl = 'http://localhost:3000/api/schools/667fa34c1e559cce89696e1c/about/create'
        axios.post(apiurl, aboutModuleData).then((res) => {
            console.log("res", res.data);
            setAboutData(res.data);
        }).catch((err) => {
            console.log("err", err)
        });
        console.log("about data", aboutModuleData)
    }

    return (
        <div className="g_full_height">
            <div className="school_name_sa">
                <IonText>
                    <p>{aboutModuleData?.schoolInfo?.schoolName} {aboutModuleData?.schoolInfo?.schoolLocation}</p>
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
                        value={aboutModuleData?.mission ? aboutModuleData?.mission : ''}
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
                        value={aboutModuleData?.vision ? aboutModuleData?.vision : ''}
                        placeholder="Please Enter Your School Mission"
                        autoGrow={true}
                    ></IonTextarea>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Established On</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="establishedOn" id="establishedOn" value={aboutModuleData?.establishedOn ? aboutModuleData.establishedOn : ''} placeholder="Enter Year" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Location</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="location" id="location" value={aboutModuleData?.location ? aboutModuleData?.location : ''} placeholder="Enter Location" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Staff Count</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="staffCount" id="staffCount" value={aboutModuleData?.staffCount ? aboutModuleData?.staffCount : ''} placeholder="Enter Staff Count" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Student Count</IonLabel>
                <IonItem>
                    <input onChange={handleInputChange} name="studentCount" id="studentCount" value={aboutModuleData?.studentCount ? aboutModuleData?.studentCount : ''} placeholder="Enter Student Count" />
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Facilities</IonLabel>
                <RenderLoopItems data={aboutModuleData?.facilities || []} type={'facilities'} subType={'newFacility'} aboutModuleData={aboutModuleData} setAboutModuleData={setAboutModuleData} />
                <IonItem>
                    <div className="g_flex g-space-between g_full_width">
                        <div className="width-80">
                            <input className="g_full_width" placeholder="Add Facilities Here!." name="newFacility" onChange={handleInputChange} value={aboutModuleData?.newFacility ? aboutModuleData?.newFacility : ''} />
                        </div>
                        <div>
                            <IonButton fill="outline" onClick={() => { addFacility('facilities', 'newFacility') }}>
                                <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </div>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Achievements</IonLabel>
                <RenderLoopItems data={aboutModuleData?.achievements || []} type={'achievements'} subType={'newAchievement'} aboutModuleData={aboutModuleData} setAboutModuleData={setAboutModuleData} />
                <IonItem>
                    <div className="g_flex g-space-between g_full_width">
                        <div className="width-80">
                            <input className="g_full_width" name="newAchievement" placeholder="Add Achievements Here!." onChange={handleInputChange} value={aboutModuleData?.newAchievement ? aboutModuleData?.newAchievement : ''} />
                        </div>
                        <div>
                            <IonButton fill="outline" onClick={() => { addFacility('achievements', 'newAchievement') }}>
                                <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </div>
                </IonItem>
            </div>
            <div className="sa_field">
                <IonLabel>Recognitions</IonLabel>
                <RenderLoopItems data={aboutModuleData?.recognitions || []} type={'recognitions'} subType={'newRecognition'} aboutModuleData={aboutModuleData} setAboutModuleData={setAboutModuleData} />
                <IonItem>
                    <div className="g_flex g-space-between g_full_width">
                        <div className="width-80">
                            <input className="g_full_width" name="newRecognition" placeholder="Add Recognitions Here!." onChange={handleInputChange} value={aboutModuleData?.newRecognition ? aboutModuleData?.newRecognition : ''} />
                        </div>
                        <div>
                            <IonButton fill="outline" onClick={() => { addFacility('recognitions', 'newRecognition') }}>
                                <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                            </IonButton>
                        </div>
                    </div>
                </IonItem>
            </div>
            <div>
                <IonButton fill="outline" onClick={sendAboutData}>
                    <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                </IonButton>
            </div>
        </div>
    )
}

const RenderLoopItems = ({ data = [], type = '', subType = '', aboutModuleData, setAboutModuleData }: any) => {

    const removeItem = (item: string, index: number) => {
        console.log("data", item, index, type, subType);
        const arr = [...(aboutModuleData[type])];
        arr.splice(index, 1);
        setAboutModuleData((prev: any) => ({ ...prev, [type]: arr }));
    }

    return (
        data.length ? data.map((dataItem: string, index: number) => (<div key={Math.random().toLocaleString()} className="g_flex g-space-between">
            <div className="g_flex height-px-40 g-align-center about_text">
                <div className="dot-8"></div>
                <IonText>
                    <p>{dataItem}</p>
                </IonText>
            </div>
            <div className="g_flex height-px-40 g-align-center remove_about" onClick={() => { removeItem(dataItem, index) }}>
                <IonIcon icon={removeCircleOutline}></IonIcon>
            </div>
        </div>)) : <></>
    )
}

export default AboutSuperAdmin
