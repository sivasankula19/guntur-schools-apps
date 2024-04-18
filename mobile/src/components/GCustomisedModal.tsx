import {
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  createAnimation,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

const GCustomisedModal: React.FC<ICustomModalProps> = ({
  title,
  onClose,
  onSave,
  children,
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
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
      isOpen={true}
    >
      <IonHeader>
        <IonToolbar>
        <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonCardContent>{children}</IonCardContent>
      <IonToolbar>
        <div className='g_flex g_space_evnly g_full_width'>
        <IonButton className='gmodal-btn gmodal-cancel' onClick={onClose}>Cancel</IonButton>
        <IonButton className='gmodal-btn gmodal-save' onClick={onSave}>Save</IonButton>
        </div>
       
      </IonToolbar>
    </IonModal>
  );
};

interface ICustomModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

export default GCustomisedModal;