import React, { useState } from 'react';
import { useParams } from 'react-router';
import GBreadCrumbs from '../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonDatetimeButton, IonDatetime, IonItem, IonLabel, IonSearchbar, IonSelect, IonSelectOption, IonToggle, IonModal, IonText, IonIcon } from '@ionic/react';
import { wibePostsData } from '../common/utility';
import { chatboxOutline, heartOutline, shareSocialOutline } from 'ionicons/icons';

const SchoolWibe: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [search, setSearch] = useState('');

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Wibe', path: '/school-wibe' }];

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };
  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be excuted!!! here
  }
  function formatDate(isoDate: any) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;

    return formattedDate;
  }
  const postsData = wibePostsData

  return (
    <div className='scl_wibe'>
      <div className='g_flex g_space_btwn'>
        <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
        <div className='toggle_io'>
          <IonLabel>Filter</IonLabel>
          <IonToggle
            className="custom-toggle"
            checked={isFilterEnabled}
            onIonChange={handleToggleChange}
          >
            <span
              className={`toggle-text ${isFilterEnabled ? 'enabled_filter' : 'disabled_filter'
                }`}
            >
              {isFilterEnabled ? 'On' : 'Off'}
            </span>
          </IonToggle>
        </div>
      </div>
      {isFilterEnabled && <>
        <IonCard className='custom_msg_card'>
          <IonCardContent className='custom_msg_content'>
            <IonItem className="custom_sub_item">
              <div className='g_half_width'>
                <IonSearchbar
                  showClearButton="focus"
                  value={search}
                  debounce={500}
                  onIonInput={(ev) => handleInput(ev)}
                ></IonSearchbar>
              </div>
              <div className='g_half_width date_wibe_container'>
                <input className='date_select_wibe' type='date' />
              </div>
            </IonItem>
            <IonItem className="custom_sub_item">
              <div className='g_half_width first_select'>
                <IonSelect
                  className="custome_select subjects_cls_select"
                  multiple={true}
                  label="Select Class"
                  labelPlacement="floating"
                  fill="outline"
                  interface="popover"
                  onIonChange={(e) =>
                    console.log(`ionChange fired with value: ${e.detail.value}`)
                  }
                >
                  <IonSelectOption value="class-8">Class 8</IonSelectOption>
                  <IonSelectOption value="class-9">Class 9</IonSelectOption>
                  <IonSelectOption value="class-10">Class 10</IonSelectOption>
                  <IonSelectOption value="class-0">Class 0</IonSelectOption>
                </IonSelect>
              </div>
              <div className='g_half_width second_select'>
                <IonSelect
                  className="custome_select"
                  multiple={true}
                  label="Select Class"
                  labelPlacement="floating"
                  fill="outline"
                  interface="popover"
                  onIonChange={(e) =>
                    console.log(`ionChange fired with value: ${e.detail.value}`)
                  }
                >
                  <IonSelectOption value="class-8">Class 8</IonSelectOption>
                  <IonSelectOption value="class-9">Class 9</IonSelectOption>
                  <IonSelectOption value="class-10">Class 10</IonSelectOption>
                  <IonSelectOption value="class-0">Class 0</IonSelectOption>
                </IonSelect>
              </div>

            </IonItem>
          </IonCardContent>
        </IonCard>
      </>}

      <div className={`wibe_posts ${isFilterEnabled ? 'filter_enable_posts' : 'filter_disabled_posts'}`}>
        {postsData.map((item) => (
          <IonCard key={item.postId}>
            <IonCardContent>
              <div className='header_post'>
                <div className='g_flex g_align_cntr g_full_width'>
                  <div
                    className='profile_name'>
                    <div
                      className='wibe_profile'>
                      <img
                        src={item.img}
                      />
                    </div>
                    <div
                      className='post_title_wrap'>
                      <IonText>
                        <h4>
                          {item.postedBy.name}
                        </h4>
                      </IonText>
                      <IonText>
                        <p>
                          {item.postedBy.designation}
                        </p>
                      </IonText>
                    </div>
                  </div>
                  <div className='posted_on_time'>
                    <IonText>
                      <span>
                        {formatDate(item.postedOn)}
                      </span>
                    </IonText>
                  </div>
                </div>
              </div>
              <div className='content_post'>
                <div>
                  <IonText>
                    <h2>{item.postName}</h2>
                  </IonText>
                </div>
                {item.img && <>
                  <div>
                  <img src={item.img} />
                </div>
                </>}
                <div>
                  <IonText>
                    <p>{item.postDes}</p>
                  </IonText>
                </div>
              </div>
              <div className='footer_post'>
                <div className='g_flex g_space_btwn'>
                  <div className='g_txt_center'>
                    <IonIcon icon={heartOutline}></IonIcon>
                    <IonText>
                      <p>{item.likes} Likes</p>
                    </IonText>
                  </div>
                  <div className='g_txt_center'>
                    <IonIcon icon={chatboxOutline}></IonIcon>
                    <IonText>
                      <p>{item.comments.length} Comments</p>
                    </IonText>
                  </div>
                  <div className='g_txt_center'>
                    <IonIcon icon={shareSocialOutline}></IonIcon>
                    <IonText>
                      <p>{item.shares} Shares</p>
                    </IonText>
                  </div>
                </div>
              </div>

            </IonCardContent>
          </IonCard>
        ))}
      </div>
    </div>
  );
};

export default SchoolWibe;
