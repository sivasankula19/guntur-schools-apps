import {
  IonButton,
  IonCard,
  IonCardContent,
  IonDatetime,
  IonDatetimeButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonToolbar,
} from '@ionic/react';
import {
  addCircleOutline,
  calendarClearOutline,
  pencilOutline,
  trashOutline,
} from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import GCustomisedModal from '../components/GCustomisedModal';
import { remainderDummyData } from '../common/utility';
import GBreadCrumbs from '../components/GBreadCrumbs';

const Remainders: React.FC = () => {
  const [eventDateTime, setEventDateTime] = useState<any>('');
  const modal = useRef<HTMLIonModalElement>(null);
  const [eventModal, setEventModal] = useState(false);
  const [data, setData] = useState(remainderDummyData);

  useEffect(() => {
    setEventDateTime(getNextHourDateTime());
  }, []);

  function getNextHourDateTime(isCurrent: boolean = false) {
    const now = new Date();

    let nextHour = isCurrent
      ? new Date()
      : new Date(now.getTime() + 60 * 60 * 1000);
    const year = nextHour.getFullYear();
    const month = String(nextHour.getMonth() + 1).padStart(2, '0');
    const day = String(nextHour.getDate()).padStart(2, '0');
    const hours = String(nextHour.getHours()).padStart(2, '0');
    const minutes = String(nextHour.getMinutes()).padStart(2, '0');
    const seconds = String(nextHour.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  }

  const breadCrumbsValue = [{bName:'Home', path:'/dashboard'},{bName:'Home Work', path:'/home-work'}]

  return (
    <div>
      <div className="g_flex g_space_btwn g_align_cntr bread_toggle_container">
       <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div>
          <IonButton
            onClick={() => {
              setEventModal(true);
            }}
            className="add_remainder_btn"
          >
            <IonIcon icon={addCircleOutline}></IonIcon> ADD
          </IonButton>
        </div>
      </div>
      <div>
        <IonCard className="card_remainder">
          <IonCardContent class="ion_card_content_remainders">
            <IonSearchbar placeholder="Remainders"></IonSearchbar>
            {data.length ? (
              <>
                <div className="remainders_container_scroll">
                  {data.map((item) => (
                    <IonCard className="view_card_item" key={item.id}>
                      <IonCardContent className="ion_remainder_content">
                        <div className="g_flex item_title_time">
                          <div className="remainder_item_title_block">
                            <IonText className="remainder_item_title">
                              {item.eventName}
                            </IonText>
                          </div>
                          <div className="remainder_item_time_block">
                            <IonText className="remainder_item_time">
                              {item.date} - {item.time}
                            </IonText>
                          </div>
                        </div>
                        <div className="g_flex item_title_time">
                          <div className="remainder_item_title_block">
                            <IonText
                              className={`remainder_item_desc ${
                                !item.isOpen && 'two_lines_ellipsis'
                              }`}
                            >
                              {item.desc}
                            </IonText>
                          </div>
                          <div className="remainder_item_time_block g_flex">
                            <div
                              className={`remainder_status g_flex g_align_cntr g_jstfy_content_cntr ${
                                item.status == 'Delayed'
                                  ? 'danger'
                                  : item.status == 'Done'
                                  ? 'orange_cls'
                                  : 'success'
                              }`}
                            >
                              {item.status}
                            </div>
                            <IonIcon
                              className="edit_remainder"
                              size="large"
                              icon={pencilOutline}
                            ></IonIcon>
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </div>
              </>
            ) : (
              <>
                <IonItem className="no_records_remainder">
                  <div className="trash_icon_remainder">
                    <IonIcon size="large" icon={trashOutline}></IonIcon>
                  </div>
                </IonItem>
                <IonItem className="no_records_remainder">
                  <div className="g_flex g_flex_direction_clm no_records_remainder_text">
                    <IonText>No Records Found</IonText>
                    <IonText>Please Add Remaindes!</IonText>
                  </div>
                </IonItem>
                <div className="g_flex g_jstfy_content_cntr add_remainder_btn_container">
                  <IonButton className="btn_remainders">
                    Add Remainder
                  </IonButton>
                </div>
              </>
            )}
          </IonCardContent>
        </IonCard>
      </div>

      <GCustomisedModal
        title="My Modal"
        isOpen={eventModal}
        onClose={() => {
          setEventModal(false);
        }}
        onSave={() => {}}
      >
        <div>
          <div className="g_txt_center">
            <IonLabel>Date & Time</IonLabel>
          </div>
          <IonItem className="date_time_select_item">
            <IonIcon size="small" icon={calendarClearOutline}></IonIcon>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal
              className="custome_date_time_modal"
              ref={modal}
              keepContentsMounted={true}
            >
              <IonHeader>
                <IonToolbar>
                  <IonText>
                    <p>Select Date Time </p>
                  </IonText>
                </IonToolbar>
              </IonHeader>
              <IonDatetime
                value={eventDateTime}
                id="datetime"
                onIonChange={(e) => {
                  setEventDateTime(e?.detail?.value || '');
                }}
                min={getNextHourDateTime(true)}
              ></IonDatetime>
              <IonFooter>
                <IonToolbar>
                  <IonButton
                    expand="block"
                    onClick={() => {
                      modal.current?.dismiss();
                    }}
                  >
                    OK
                  </IonButton>
                </IonToolbar>
              </IonFooter>
            </IonModal>
          </IonItem>
          <IonItem className="custom_modal_item">
            <IonInput
              class="add_event_input"
              label="Event Name"
              labelPlacement="floating"
              fill="solid"
              placeholder="Event Name"
            ></IonInput>
          </IonItem>
          <IonItem className="custom_modal_item">
            <IonTextarea
              className="cutsome_textarea"
              label="Event Description"
              labelPlacement="floating"
              placeholder="Event Description"
            ></IonTextarea>
          </IonItem>
          <IonItem className="custom_modal_item">
            <IonSelect
              className="custome_select"
              label="Notify Me"
              labelPlacement="floating"
              fill="outline"
              interface="popover"
              onIonChange={(e) =>
                console.log(`ionChange fired with value: ${e.detail.value}`)
              }
            >
              <IonSelectOption value="15min">
                Notify me before 15 min
              </IonSelectOption>
              <IonSelectOption value="30min">
                Notify me before 15 min
              </IonSelectOption>
              <IonSelectOption value="1hr">
                Notify me before 15 min
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </div>
      </GCustomisedModal>
    </div>
  );
};

export default Remainders;
