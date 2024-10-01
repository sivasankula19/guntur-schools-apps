import React, { PropsWithChildren } from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import {  chevronDownCircleOutline, chevronUpCircleOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router';
import { setPreLoginPublicView } from '../redux/reducers/schoolSlice';
import { useDispatch } from 'react-redux';

interface Chip {
  id: number;
  moduleName: string;
  icon: any;
  redirectTo: string;
}

const NavChipCard: React.FC<PropsWithChildren<{ chips: Chip[], isOpen: boolean, handleView: () => void }>> = ({
  chips,
  isOpen,
  handleView
}) => {
  const displayedChips = chips;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const publicModules = ["About", "Courses","Contact-Us","Achievements","Gallery","Ex-Circular"]

  const handleNavigate = (path: string, moduleName:string) => {
    if(publicModules.includes(moduleName))
      dispatch(setPreLoginPublicView(moduleName))
    navigate(path);
  }

  return (
    <IonCard>
      <IonCardContent className={`${chips.length === 0 ? 'no-items-scroll' : ''}`}>
        <div className="nav-chip-container">
          {displayedChips.map((chip, index) => (
            <div key={chip.id} className='item-container-chips'>
              <IonItem onClick={() => { handleNavigate(chip.redirectTo, chip.moduleName) }}>
                <div className="chip_item_data">
                  <div className="g_flex g-align-center g-justify-center">
                    <IonIcon icon={chip.icon} />
                  </div>
                  <IonLabel className='font-12'>{chip.moduleName}</IonLabel>
                </div>
              </IonItem>
            </div>
          ))}
        </div>
        <div onClick={handleView} className={`expand-chevron-icon ${chips.length === 0 ? '' :''}`}>
          <IonIcon icon={isOpen ? chevronUpCircleOutline : chevronDownCircleOutline}></IonIcon>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NavChipCard;
