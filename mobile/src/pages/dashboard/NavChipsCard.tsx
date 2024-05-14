import React, { PropsWithChildren } from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { chevronDownCircle, chevronDownCircleOutline, chevronUpCircle, chevronUpCircleOutline, expandOutline, headset } from 'ionicons/icons';

interface Chip {
  id: number;
  moduleName: string;
  icon: any;
}

const NavChipCard: React.FC<PropsWithChildren<{ chips: Chip[], isOpen:boolean, handleView:()=>void }>> = ({
  chips,
  isOpen,
  handleView
}) => {
  const displayedChips = chips;

  return (
    <IonCard>
      <IonCardContent className={`${chips.length === 0 && 'no_items_scrollled'}`}>
        <div className="nav_chip_container">
          {displayedChips.map((chip, index) => (
            <div  key={chip.id} className='item_container_chips'>
            <IonItem>
              <div className="chip_item_data">
                <div className="g_flex g_align_cntr g_jstfy_content_cntr">
                  <IonIcon icon={chip.icon} />
                </div>
                <IonLabel>{chip.moduleName}</IonLabel>
              </div>
            </IonItem>
            </div>
          ))}
        </div>
        <div onClick={handleView} className={`expand_chevron_icon ${chips.length === 0 && ''}`}>
          <IonIcon icon={isOpen ? chevronUpCircleOutline : chevronDownCircleOutline}></IonIcon>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NavChipCard;
