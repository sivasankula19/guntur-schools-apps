import React, { useState } from 'react';
import { useParams } from 'react-router';
import { IonIcon, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { arrowBackCircleOutline, arrowForwardCircleOutline, expandOutline } from 'ionicons/icons';

const Gallery: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [currentImg, setCurrentImg] = useState(0)

  const schlImages = [
    { id: '1', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '2', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '3', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '4', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '5', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '6', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
  ]
  const selectedClsImgs = [
    { id: '1', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '2', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '3', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '4', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '5', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
    { id: '6', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: '' },
  ]
  return (
    <div className='gallery'>
      <IonText className='title_gallery'>
        <h4>School Images</h4>
      </IonText>
      <div className='scl_imgs'>
        {schlImages.slice(0, 4).map((sclImg, index) => (<div key={sclImg.id} className='img_item'>
          {(index < 3 || schlImages.length <= 4) ? (<>
            <div>image rplc</div>
          </>) : (<>
            <IonText>
              <h1>+ {schlImages.length - 4}</h1>
            </IonText>
          </>)}
        </div>))}
      </div>
      <div className='g_flex g_space_btwn'>
        <div style={{ width: '30%' }}>
          <IonSelect
            className="custome_select"
            multiple={true}
            label="Class"
            labelPlacement="floating"
            fill="outline"
          // interface="popover"
          >
            <IonSelectOption value="class-8">Class 8</IonSelectOption>
            <IonSelectOption value="class-9">Class 9</IonSelectOption>
            <IonSelectOption value="class-10">Class 10</IonSelectOption>
            <IonSelectOption value="class-7">Class 7</IonSelectOption>
          </IonSelect>
        </div>
        <div style={{ width: '30%' }}>
          <IonSelect
            className="custome_select"
            multiple={true}
            label="Section"
            labelPlacement="floating"
            fill="outline"
          // interface="popover"
          >
            <IonSelectOption value="a_sec">A Section</IonSelectOption>
            <IonSelectOption value="b_sec">B Section</IonSelectOption>
            <IonSelectOption value="c_sec">C Section</IonSelectOption>
            <IonSelectOption value="d_sec">D Section</IonSelectOption>
          </IonSelect>
        </div>
        <div style={{ width: '30%' }}>
          <IonSelect
            className="custome_select"
            multiple={true}
            label="Year"
            labelPlacement="floating"
            fill="outline"
          // interface="popover"
          >
            <IonSelectOption value="2024">2024</IonSelectOption>
            <IonSelectOption value="2023">2023</IonSelectOption>
            <IonSelectOption value="2022">2022</IonSelectOption>
            <IonSelectOption value="2021">2021</IonSelectOption>
          </IonSelect>
        </div>
      </div>
      <div className='cls_sec_year_images'>
        {selectedClsImgs.length ? (<>
          <div className='cls_imgs_container'>
            <div className='g_flex g_align_cntr g_jstfy_content_cntr actual_image'>
              image
            </div>
            <div className='img_title_ex'>
              <IonText><h4>Image Title</h4></IonText>
              <IonIcon icon={expandOutline}></IonIcon>
            </div>
            <div className='img_left_right'>
              <IonIcon icon={arrowBackCircleOutline}></IonIcon>
              <IonIcon icon={arrowForwardCircleOutline}></IonIcon>
            </div>
          </div>
          <div className='dots_imgs'>
            {selectedClsImgs.map((clImag, index) => (<span className={`dot ${index === currentImg && 'selected_dot'}`}></span>))}
          </div>
        </>) : (<>
          <div className='no_imgs'>
            <div>
              <IonText>
                <h1>No Images Found!</h1>
              </IonText>
              <IonText><p>Please Change Class, section and Year</p></IonText>
            </div>
          </div>
        </>)}
      </div>
    </div>
  );
};

export default Gallery;
