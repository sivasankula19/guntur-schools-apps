// Footer.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  IonToolbar,
  IonFooter,
  IonIcon,
  IonModal,
  IonText,
  IonContent,
  IonItemDivider,
} from '@ionic/react';
import {
  caretUpCircleOutline,
} from 'ionicons/icons';


interface IProps {
  isopenlikes:boolean,
  data:{},
  resetOpenCallback:Function,
}
const WibeLikes: React.FC<IProps> = ({isopenlikes,data,resetOpenCallback}) => {
 
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(isopenlikes);
  const [likesData, setLikesData] = useState<any>(data);

  useEffect(()=>{
    setIsOpen(()=>isopenlikes)
    setLikesData(()=>data)
  },[isopenlikes])


  const formatDate=(time:Date)=>{
    const date = new Date(time);

    // Format date as DD/MM/YYYY
    const formattedDate = date.toLocaleDateString('en-GB')
    return formattedDate;
  }

  const formatTime=(time:Date)=>{
    const date = new Date(time);

    // Format time as HH:MM AM/PM
    const options: any = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', options);

    return formattedTime;
  }

  const LikesUI=()=>{
       return (
        <IonContent className="ion-padding footer_container">
        <IonText>
          <h6 className="g-fontsize-16 g-fontweight-600 text-color-blue" >{likesData.postName}</h6>
          <h6 className="g-fontsize-14 g-fontweight-400" >Liked By</h6>
        </IonText>
        <div>
          <IonItemDivider ></IonItemDivider>
        </div>
        <div className='likes-data-view'>
          {likesData?.likesData?.map((likes:any,index:number)=>{
            return (
               <div className='g_flex g_space_btwn m6' key={index}>
                  <div className='g_flex g_align_cntr' >
                    <img className='wibe-profile' src={likes.img} alt="profile"></img>
                    <div>
                      <p className="g-fontweight-600 g-fontsize-14 text-color-blue m3">{likes.liked_by}</p>
                      <p className="g-fontweight-400 g-fontsize-12 m3">{likes.designation} / {likes.user_id} </p>
                    </div>
                  </div>
                  <div>
                    <p className="g-fontweight-400 g-fontsize-10 m3">{formatDate(likes.time)}</p>
                    <p className="g-fontweight-400 g-fontsize-10 m3">{formatTime(likes.time)}</p>
                  </div>
               </div>
            )
          })}
        </div>
      </IonContent>
       )
  }

  const handleOnDismiss=()=>{
    resetOpenCallback(false)
  }


  return (
    <IonFooter className="custome_footer_ion">
      <IonToolbar onClick={()=>setIsOpen(true)} className="g_txt_center tool_bar_container">
        <IonIcon icon={caretUpCircleOutline}></IonIcon>
      </IonToolbar>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={handleOnDismiss}
        ref={modal}
        initialBreakpoint={0.6}
        breakpoints={[0, 0.6, 0.85]}
      >
        {LikesUI()}
      </IonModal>
    </IonFooter>
  );
};

export default WibeLikes;
