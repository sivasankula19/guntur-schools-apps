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
import { chatboxOutline, heartOutline } from 'ionicons/icons';


interface IProps {
  isopencomments:boolean,
  data:{},
  resetOpenCallback:Function,
}
const WibeComments: React.FC<IProps> = ({isopencomments,data,resetOpenCallback}) => {
 
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(isopencomments);
  const [commentsData, setCommentsData] = useState<any>(data);

  useEffect(()=>{
    setIsOpen(()=>isopencomments)
    setCommentsData(()=>data)
  },[isopencomments])

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

  const repliesUI=(replies?:any)=>{
    return (
      <div className='g_flex'>
          <IonIcon className="chat-heart-icons" icon={chatboxOutline}></IonIcon>
          <h6 className='g-fontweight-400 g-fontsize-10 ml3'>{replies?.length ? replies?.length : 0}</h6>
          <h6 className='g-fontweight-400 g-fontsize-10 ml3 text-dec-underline'>reply's</h6>
      </div>
    )
  }

  const likesUI=(Likes?:number)=>{
    return(
      <div className='g_flex'>
          <IonIcon className="chat-heart-icons" icon={heartOutline}></IonIcon>
          <h6 className='g-fontweight-400 g-fontsize-10 ml3'>{Likes}</h6>
          <h6 className='g-fontweight-400 g-fontsize-10 ml3 text-dec-underline'>likes</h6>
      </div>
    )
  }

  const CommentsUI=()=>{
        return (
        <IonContent className="ion-padding footer_container">
        <IonText>
          <h6 className="g-fontsize-16 g-fontweight-600 text-color-blue">{commentsData.postName}</h6>
          <h6 className="g-fontsize-14 g-fontweight-400" >Comments</h6>
        </IonText>
        <div>
          <IonItemDivider></IonItemDivider>
        </div>
        <div style={{overflow:'auto',height:'43vh',paddingBottom:10}}>
          {commentsData?.comments?.map((comments:any,index:number)=>{
            return (
              <div>
               <div className='g_flex g_space_btwn m6' key={index}>
                  <div className='g_flex g_align_cntr'>
                    <img style={{height:30,width:30,borderRadius:50,marginRight:5}} src={comments.commentedBy.img} alt="profile"></img>
                    <div>
                      <p className="g-fontweight-600 g-fontsize-14 m3 text-color-blue">{comments.commentedBy.name}</p>
                      <p className="g-fontweight-400 g-fontsize-10 m3">{comments.commentedBy.designation} / {comments.commentedBy.id} </p>
                    </div>
                  </div>
                  <div>
                    <p className="g-fontweight-400 g-fontsize-10 m3">{formatDate(comments.commentedBy.time)}</p>
                    <p className="g-fontweight-400 g-fontsize-10 m3">{formatTime(comments.commentedBy.time)}</p>
                  </div>
               </div>
               <div className='g-fontweight-400 g-fontsize-12 wibe-main-comment'>{comments.comment}</div>
               <div className='g_flex g_space_btwn m6 ml10' >
                  {repliesUI(comments?.replies)}
                  {likesUI(comments?.likes)}
               </div>
              </div>
            )
          })}
        </div>
        <input className="wibe-comment-reply-input" type="text" placeholder='Reply Text Here!'></input>
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
        {CommentsUI()}
      </IonModal>
    </IonFooter>
  );
};

export default WibeComments;
