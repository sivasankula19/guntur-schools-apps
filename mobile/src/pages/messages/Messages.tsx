import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonButton, IonCard, IonCardContent, IonIcon, IonItem, IonSearchbar, IonText } from '@ionic/react';
import { banSharp } from 'ionicons/icons';
import { chatContactList } from '../../common/utility';
import GCustomToggle from '../../components/GCustomToggle';

const Messages: React.FC = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(true);
  const [chatListData, setChatListData] = useState<any>([])
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Messages', path: '/messages' }];

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const handleUserChat = (userId: string) => {
    navigate(`/messages/${userId}`)
  }

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    setChatListData(chatContactList.filter((chatContact) => ((chatContact.name).toLowerCase().includes((ev.target.value).toLowerCase())) || ev.target.value == ''))
    //  debounce function can be executed!!! here i.e api
  };

  useEffect(() => {
    setChatListData(chatContactList)
  }, [])

  return (
    <div className='messages'>
      <div className='g_flex g-space-between'>
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div className='toggle_io'>
          <GCustomToggle checked={isFilterEnabled} onHandleChange={handleToggleChange}/>
        </div>
      </div>
      <div className='select_chat'>
        <div className='filter_chat'>
          <IonCard>
            <IonCardContent>
              <IonButton expand="block">New Chat</IonButton>
              <IonSearchbar placeholder='Search a conversation!'
                showClearButton="focus"
                value={search}
                debounce={500}
                onIonInput={handleInput}></IonSearchbar>
            </IonCardContent>
          </IonCard>
        </div>
        <div className='chat_list'>
          {
            chatListData.length ? <>
              {
                chatListData.map((chat: any) => (<IonItem onClick={() => handleUserChat(chat.id)} className='chat_item' key={chat.id}>
                  <div className='g_full_width'>
                    <div className='g_flex g-align-center'>
                      <div className='profile'>
                        <img src={chat.profile} />
                      </div>
                      <div className='name_last_msg'>
                        <div className='g_flex g-space-between'>
                          <IonText className='width-80'>
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
              <div className='no_msgs_users g_txt_center'>
                <div>
                  <IonIcon icon={banSharp}></IonIcon>
                  <IonText>
                    <h1>{search.length ? `No chats with name "${search}"` : "No Messages Yet!"} </h1>
                  </IonText>
                  <IonText>
                    <p>
                      Select a Chat by clicking on New Chat button!
                    </p>
                  </IonText>
                </div>
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
