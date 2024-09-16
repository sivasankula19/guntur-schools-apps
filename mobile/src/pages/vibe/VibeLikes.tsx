// Footer.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  IonModal,
  IonText,
  IonContent,
  IonItemDivider,
} from '@ionic/react';

interface IProps {
  isopenlikes: boolean,
  data: {},
  resetOpenCallback: Function,
}
const VibeLikes: React.FC<IProps> = ({ isopenlikes, data, resetOpenCallback }) => {

  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(isopenlikes);
  const [likesData, setLikesData] = useState<any>(data);

  useEffect(() => {
    setIsOpen(() => isopenlikes)
    setLikesData(() => data)
  }, [isopenlikes])


  const formatDate = (time: Date) => {
    const date = new Date(time);

    // Format date as DD/MM/YYYY
    const formattedDate = date.toLocaleDateString('en-GB')
    return formattedDate;
  }

  const formatTime = (time: Date) => {
    const date = new Date(time);

    // Format time as HH:MM AM/PM
    const options: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', options);

    return formattedTime;
  }

  const handleOnDismiss = () => {
    resetOpenCallback(false)
  }


  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={handleOnDismiss}
      ref={modal}
      initialBreakpoint={0.6}
      breakpoints={[0, 0.6,]}
    >
      <LikesUI formatDate={formatDate} likesData={likesData} formatTime={formatTime} />
    </IonModal>
  );
};


const LikesUI = ({likesData,formatDate, formatTime}:any) => {
  return (
    <IonContent className="ion-padding footer_container">
      <IonText>
        <h6 className="g-font-size-16 g-font-weight-600 text-color-blue" >{likesData.postName}</h6>
        <h6 className="g-font-size-14 g-font-weight-400" >Liked By</h6>
      </IonText>
      <div>
        <IonItemDivider ></IonItemDivider>
      </div>
      <div className='likes-data-view'>
        {likesData?.likesData?.map((likes: any, index: number) => {
          return (
            <div className='g_flex g-space-between m6' key={index}>
              <div className='g_flex g-align-center' >
                <img className='vibe-profile' src={likes.img} alt="profile"></img>
                <div>
                  <p className="g-font-weight-600 g-font-size-14 text-color-blue m3">{likes.liked_by}</p>
                  <p className="g-font-weight-400 g-font-size-12 m3">{likes.designation} / {likes.user_id} </p>
                </div>
              </div>
              <div>
                <p className="g-font-weight-400 g-font-size-10 m3">{formatDate(likes.time)}</p>
                <p className="g-font-weight-400 g-font-size-10 m3">{formatTime(likes.time)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </IonContent>
  )
}

export default VibeLikes;


