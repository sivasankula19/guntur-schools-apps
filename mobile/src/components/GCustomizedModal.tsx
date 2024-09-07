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
  IonFooter,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React, { useRef } from 'react';

const CustomizedModal: React.FC<ICustomModalProps> = ({
  title,
  onClose,
  onSave,
  children,
  isOpen,
  styles
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
      className='g_customised_modal'
    >
      <div style={{maxHeight:styles?.maxHeight || '60vh'}} className='custom-modal-container-view'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div className='modal-child-con'><IonCardContent>{children}</IonCardContent></div>
      <IonFooter>
        <IonToolbar>
          <div className="g_flex g_space_btwn g_full_width g_custome_padding_h12">
            <IonButton className="gmodal-btn gmodal-cancel" onClick={dismiss}>
              Cancel
            </IonButton>
            <IonButton className="gmodal-btn gmodal-save" onClick={onSave}>
              Save
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>
      </div>
     
    </IonModal>
  );
};

interface ICustomModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
  isOpen:boolean;
  styles?: React.CSSProperties
}

export default CustomizedModal;
