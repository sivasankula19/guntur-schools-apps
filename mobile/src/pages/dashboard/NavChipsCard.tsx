import React, { PropsWithChildren } from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { expandOutline, headset } from 'ionicons/icons';

interface Chip {
  id: number;
  moduleName: string;
  iconName?: string;
}

const NavChipCard: React.FC<PropsWithChildren<{ chips: Chip[] }>> = ({
  chips,
}) => {
  const displayedChips = chips;

  return (
    <IonCard>
      <IonCardContent>
        <div className="nav_chip_container">
          {displayedChips.map((chip, index) => (
            <IonItem key={chip.id}>
              <div className="chip_item_data">
                <div className="g_flex g_align_cntr g_jstfy_content_cntr">
                  <IonIcon icon={expandOutline} />
                </div>
                <IonLabel>{chip.moduleName}</IonLabel>
              </div>
            </IonItem>
          ))}
          {true && (
            <div className="g_flex g_align_cntr g_jstfy_content_cntr g_full_width">
              <IonIcon icon={expandOutline}></IonIcon>
            </div>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NavChipCard;
