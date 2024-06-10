import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonItem, IonSearchbar, IonText, IonToggle } from '@ionic/react';

const Messages: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const navigate = useNavigate();

  const breadCrumbsValue = [{ bName: 'Home', path: '/' }, { bName: 'Messages', path: '/messages' }];

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const handleUserChat = (userId: string) => {
    navigate(`/messages/${userId}`)
  }

  const chatList = [
    {
      id: 'Y24C8A019',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A020',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A021',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A022',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A023',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A024',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A025',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A026',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A027',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A028',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
    {
      id: 'Y24C8A029',
      isStaff: false,
      name: 'Siva Sankula',
      lastMsg: 'message text will be place there tap to see',
      msgSeen: false,
      lastMsgReceived: '2024-06-10T13:47:41.373Z',
      profile:
        'https://www.static-contents.youth4work.com/y4w/Images/Users/3126495.png?v=20180128190106',
    },
  ];

  return (
    <div className='messages'>
      <div className='g_flex g_space_btwn'>
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div className='toggle_io'>
          <IonToggle
            className="custom-toggle"
            checked={isFilterEnabled}
            onIonChange={handleToggleChange}
          >
            <span
              className={`toggle-text ${isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
                }`}
            >
              {isFilterEnabled ? 'On' : 'Off'}
            </span>
          </IonToggle>
        </div>
      </div>
      <div className='select_chat'>
        <div className='filter_chat'>
          <IonCard>
            <IonCardContent>
              <IonButton expand="block">New Chat</IonButton>
              <IonSearchbar placeholder='Search a conversation!'></IonSearchbar>
            </IonCardContent>
          </IonCard>
        </div>
        <div className='chat_list'>
          {
            chatList.length ? <>
              {
                chatList.map((chat: any) => (<IonItem onClick={()=>handleUserChat(chat.id)} className='chat_item' key={chat.id}>
                  <div className='g_full_width'>
                    <div className='g_flex g_align_cntr'>
                      <div className='profile'>
                        <img src={chat.profile} />
                      </div>
                      <div className='name_last_msg'>
                        <div className='g_flex g_space_btwn'>
                          <IonText className='title_chat'>
                            <h2 className='g_text_ellipses'>{chat.name}</h2>
                          </IonText>
                          <IonText>
                            <p className='time_stamp'>{new Date(chat.lastMsgReceived).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </IonText>
                        </div>

                        <IonText>
                          <p className='g_text_ellipses'>{chat.lastMsg}</p>
                        </IonText>
                      </div>
                    </div>
                  </div>
                </IonItem>))
              }
            </> : <>
              <div>

              </div>
            </>
          }
        </div>
      </div>
      {/* <button >navigate t</button> */}
    </div>
  );
};

export default Messages;
