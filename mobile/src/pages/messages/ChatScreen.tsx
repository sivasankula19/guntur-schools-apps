import React, { useState } from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonInput, IonItem, IonPage, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { arrowBackOutline, send, sendOutline } from 'ionicons/icons';

const ChatScreen: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [isFilterEnabled, setIsFilterEnabled] = useState(true);

    const breadCrumbsValue = [{ bName: 'Home', path: '/' }, { bName: 'Messages', path: '/messages' }, { bName: 'Chat Screen', path: '/messages' }];

    const handleToggleChange = (event: any) => {
        setIsFilterEnabled(event.detail.checked);
    };

    const msgData = [
        {
            id: '1',
            msgText: 'Hello',
            time: '2024-06-08T16:21:35.559Z',
            sent: true,
        },
        {
            id: '2',
            msgText: 'hi',
            time: '2024-06-08T16:28:00.559Z',
            sent: false,
        },
        {
            id: '3',
            msgText: 'How are you!.',
            time: '2024-06-08T17:30:45.559Z',
            sent: true,
        },
        {
            id: '4',
            msgText: 'And wru',
            time: '2024-06-08T17:30:55.559Z',
            sent: true,
        },
        {
            id: '5',
            msgText: 'at Madugula, cmng to hyd today evng',
            time: '2024-06-08T17:39:02.559Z',
            sent: false,
        },
        {
            id: '6',
            msgText: 'haaa',
            time: '2024-06-08T17:28:00.559Z',
            sent: false,
        },
        {
            id: '7',
            msgText: 'Hoo kkkk.',
            time: '2024-06-08T17:33:45.559Z',
            sent: false,
        },
        {
            id: '8',
            msgText: 'what is special',
            time: '2024-06-08T17:30:55.559Z',
            sent: true,
        },
        {
            id: '9',
            msgText: 'at evng',
            time: '2024-06-08T20:39:02.559Z',
            sent: false,
        },
        {
            id: '10',
            msgText: 'at evng',
            time: '2024-06-08T20:39:02.559Z',
            sent: false,
        },
        {
            id: '11',
            msgText: 'at evng',
            time: '2024-06-08T20:39:02.559Z',
            sent: true,
        },{
            id: '12',
            msgText: 'at evng',
            time: '2024-06-08T20:39:02.559Z',
            sent: false,
        },
        {
            id: '13',
            msgText: 'at evng',
            time: '2024-06-08T20:39:02.559Z',
            sent: true,
        }

    ]

    return (
        <IonPage className="my_page">
            <Header />
            <IonContent fullscreen>
                <div className='chat_screen'>
                    <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
                    <div className='chat_container'>
                        <IonCard>
                            <IonCardContent>
                                <IonToolbar >
                                    <div className='g_flex custom_chat_tool'>
                                        <IonIcon icon={arrowBackOutline}></IonIcon>
                                        <div className='g_flex g_align_cntr text_img'>
                                            <div className='chat_profile_icon'>
                                                <img src='https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106'></img>
                                            </div>
                                            <div className='name_designation'>
                                                <IonText>
                                                    <h2 className='g_text_ellipses'>{"Participant name "}</h2>
                                                </IonText>
                                                <IonText>
                                                    <p>{"Designation"}</p>
                                                </IonText>
                                            </div>
                                        </div>
                                    </div>
                                </IonToolbar>
                                <div className='msgs_holder'>
                                    <div className='msgs_scroll'>
                                        {
                                            msgData.length ? <>
                                                {msgData.map((msg) => (<div className={`txt_msg_receive_sent ${msg.sent ? 'received' : 'sent'}`} key={msg.id}>
                                                    <div className='msg_blk'>
                                                        <IonText>
                                                            <p>{msg.msgText}</p>
                                                        </IonText>
                                                        <div className='time_msg'>
                                                            <span>{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                </div>))}
                                            </> : <>

                                            </>
                                        }
                                    </div>
                                    <div className='type_msg'>
                                        <input placeholder='Type Anything..!' />
                                        <div className='send_icon'>
                                            <IonIcon icon={send}></IonIcon>
                                        </div>
                                    </div>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </div>
                </div>
            </IonContent>
            <Footer></Footer>
        </IonPage>
    );
};

export default ChatScreen;
