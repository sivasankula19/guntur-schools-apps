import React, { useRef, useState } from 'react';
import GBreadCrumbs from '../../components/GBreadCrumbs';
import { IonCard, IonCardContent, IonItem, IonLabel, IonSearchbar, IonText, IonIcon, IonButton, IonTextarea } from '@ionic/react';
import { classListDummy, formatDate, formatTime, sectionListDummy, vibePostsData } from '../../common/utility';
import { chatboxOutline, heartOutline, imageOutline, shareSocialOutline } from 'ionicons/icons';
import VibeLikes from './VibeLikes';
import VibeComments from './VibeComments';
import GCustomSelectDrop from '../../components/GCustomSelectDrop';
import { useSelector } from 'react-redux';
import CustomizedModal from '../../components/GCustomizedModal';
import GCustomToggle from '../../components/GCustomToggle';
import GCustomInput from '../../components/GCustomInput';
import GImagUpload from '../../components/GImagUpload';

const SchoolVibe: React.FC = () => {
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [search, setSearch] = useState('');
  const currentRole = useSelector((state: any) => state.auth.role);
  const [isOpenLikes, setIsOpenLikes] = useState<boolean>(false);
  const [isOpenComments, setIsOpenComments] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
  });
  let formVal = {
    postTitle: '',
    postType: '',
    postSrc: '',
    postDesc: '',
    isEnabledLikes: true,
    isEnabledComments: true,
  }
  const [formValue, setFormValue] = useState(formVal)
  const [isAddVibe, setIsVibeAdd] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState('general');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const breadCrumbsValue = [{ bName: 'Home', path: '/dashboard' }, { bName: 'Vibe', path: '/school-vibe' }];

  const handleToggleChange = (event: any) => {
    setIsFilterEnabled(event.detail.checked);
  };

  const handleAddToggleChange = (event: any) => {
    console.log(event.target.name, event.detail.checked)
    setFilterValue((prev) => ({ ...prev, [event.target.name]: event.detail.checked }));
  };

  const handleInput = (ev: any) => {
    setSearch(ev.target.value);
    console.log(ev?.target.value);
    //  debounce function can be excuted!!! here
  }

  const postsData = vibePostsData

  const handleClickOnLikes = (LikesData: any) => {
    setData(() => LikesData)
    setIsOpenLikes(() => true)
  }

  const handleClickOnComments = (CommentsData: any) => {
    setData(() => CommentsData)
    setIsOpenComments(() => true)
  }


  const resetOpenCallback = (value: boolean) => {
    setIsOpenLikes(() => value)
    setIsOpenComments(() => value)
  }

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChange = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleOpenAdd = () => {
    setIsVibeAdd(true);
  }

  const handleModelClose = () => {
    setIsVibeAdd(false);
  }

  const handleSubmit = () => { }

  const postTypes = [
    { id: 1, name: 'General', keyword: 'general' },
    { id: 2, name: 'Announcement', keyword: 'announcement' },
    { id: 3, name: 'Birth day', keyword: 'birthday' },
  ]

  const handlePostChange = (keyword: string) => {
    setSelectedPostType(keyword)
  }

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  return (
    <>
      {currentRole !== 'Student' && (<div className="add-vibe-post">
        <IonButton onClick={handleOpenAdd} className="add-doc-button g_txt_cap">
          <IonIcon icon={imageOutline}></IonIcon> Post Something
        </IonButton>
      </div>)}
      <div className='scl_vibe'>
        <div className='g_flex g-space-between'>
          <GBreadCrumbs data={breadCrumbsValue}></GBreadCrumbs>
          <div className='toggle_io'>
            <IonLabel>Filter</IonLabel>
            <GCustomToggle checked={isFilterEnabled} onHandleChange={handleToggleChange} />
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
                    onIonInput={handleInput}
                  ></IonSearchbar>
                </div>
                <div className='g_half_width date_vibe_container'>
                  <input className='date_select_vibe' type='date' />
                </div>
              </IonItem>
              <IonItem className="custom_sub_item">
                <div className='g_half_width first_select m-top-10'>
                  <GCustomSelectDrop options={classDummyData} name='classId'
                    value={filterValues.classId} label="Select Class"
                    handleOnChange={handleChange} classNames='custom-select subjects_cls_select' />
                </div>
                <div className='g_half_width second_select m-top-10'>
                  <GCustomSelectDrop options={sectionDummyData} name='sectionId'
                    value={filterValues.sectionId} label="Select Section"
                    handleOnChange={handleChange} classNames='custom-select' />
                </div>

              </IonItem>
            </IonCardContent>
          </IonCard>
        </>}

        <div className={`vibe_posts ${isFilterEnabled ? 'filter_enable_posts' : 'filter_disabled_posts'}`}>
          {postsData.map((item) => (
            <IonCard key={item.postId}>
              <IonCardContent>
                <div className='header_post'>
                  <div className='g_flex g-align-center g_full_width'>
                    <div
                      className='profile_name'>
                      <div
                        className='vibe_profile'>
                        <img
                          src={item?.postedBy?.profileImg}
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
                        <p>
                          {formatDate(new Date(item.postedOn))}
                        </p>
                      </IonText>
                      <IonText>
                        <p>
                          {formatTime(new Date(item.postedOn))}
                        </p>
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
                  <div className='g_flex g-space-between'>
                    <div className='g_txt_center' onClick={() => handleClickOnLikes(item)}>
                      <IonIcon icon={heartOutline}></IonIcon>
                      <IonText>
                        <p>{item.likes} Likes</p>
                      </IonText>
                    </div>
                    <div className='g_txt_center' onClick={() => { handleClickOnComments(item) }}>
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
        <VibeLikes isopenlikes={isOpenLikes} data={data} resetOpenCallback={resetOpenCallback} />
        <VibeComments isopencomments={isOpenComments} data={data} resetOpenCallback={resetOpenCallback} />
        <CustomizedModal
          title={`Add Post`}
          isOpen={isAddVibe}
          onClose={handleModelClose}
          onSave={handleSubmit}
          styles={{ maxHeight: '60vh' }}
        >
          <div className='post-add-modal'>
            <div className='m-bottom-10'>
              <div className='sec-add-show'>
                <div className='nav-ele-show-con'>
                  {postTypes.map((post) => (<div onClick={() => handlePostChange(post.keyword)} className={`section-show-ele ${selectedPostType === post.keyword ? 'selected-bg-w-b' : ''}`} key={post.keyword}><IonText><p>{post.name}</p></IonText></div>))}
                </div>
              </div>
            </div>
            <GCustomInput name={'postTitle'} value={formValue.postTitle} onChange={handleInput} label={'Post Name'} placeholder={'Post Name'} />
            <GImagUpload onFileChange={handleFileChange} multiple={true} label='Upload Image' classNames='m-bottom-10' />
            <div className='field m-bottom-10'>
              <IonTextarea value={formValue.postDesc} autoGrow={true} rows={4} onIonChange={handleInput} name='postDesc' label="Post Description" labelPlacement="floating" fill="outline" placeholder="description..."></IonTextarea>
            </div>
            <div className='m-bottom-10 toggle_io g_flex'>
              <IonLabel>Enabled Likes ? </IonLabel>
              <GCustomToggle name='isEnabledLikes' checked={formValue.isEnabledLikes} onHandleChange={handleAddToggleChange} />
            </div>
            <div className='m-bottom-10 toggle_io g_flex'>
              <IonLabel>Enabled Comments ? </IonLabel>
              <GCustomToggle name='isEnabledComments' checked={formValue.isEnabledComments} onHandleChange={handleAddToggleChange} />
            </div>
          </div>
        </CustomizedModal>
      </div>
    </>
  );
};

export default SchoolVibe;
