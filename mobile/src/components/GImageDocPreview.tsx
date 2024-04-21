import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    createAnimation,
    IonCardContent,
    IonIcon,
    IonFooter,
    IonImg,
  } from '@ionic/react';
  import { arrowBackOutline, closeOutline, downloadOutline } from 'ionicons/icons';
  import React, { useRef } from 'react';
  
  const GImageDocPreview: React.FC<ICustomModalProps> = ({
    title,
    onClose,
    onDownload,
    isOpen,
    src,
    closebtn=false
  }) => {
    const modal = useRef<HTMLIonModalElement>(null);
  
    function dismiss() {
      modal.current?.dismiss();
      onClose()
    }
  
    const enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
  
      const backdropAnimation = createAnimation()
        .addElement(root?.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
  
      const wrapperAnimation = createAnimation()
        .addElement(root?.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);
  
      return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };
  
    const leaveAnimation = (baseEl: HTMLElement) => {
      return enterAnimation(baseEl).direction('reverse');
    };
  
    return (
      <IonModal
        id="example-modal"
        ref={modal}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
        backdropDismiss={false}
        isOpen={isOpen}
        className='g_customised_image_doc_preview'
      >
        <IonHeader>
          <IonToolbar>
            <IonIcon  onClick={dismiss} size='large' icon={arrowBackOutline}></IonIcon>
            <IonTitle slot='start'>{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon icon={downloadOutline} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonCardContent className=''>
            <IonImg src={src}></IonImg>
        </IonCardContent>
        <IonFooter>
            <IonButton className='gmodal-cancel close-btn_modal' onClick={dismiss}>Close</IonButton>
        </IonFooter>
      </IonModal>
    );
  };
  
  interface ICustomModalProps {
    title: string;
    onClose: () => void;
    onDownload: () => void;
    children: React.ReactNode;
    isOpen:boolean;
    closebtn?:boolean;
    src:any;
  }
  
  export default GImageDocPreview;
  