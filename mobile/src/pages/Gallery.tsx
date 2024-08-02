import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { IonButton, IonIcon, IonImg, IonInput, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { arrowBackCircleOutline, arrowForwardCircleOutline, cloudUploadOutline, expandOutline, locationOutline } from 'ionicons/icons';

const Gallery: any = (props: any) => {
  const { isStudent } = props
  console.log('isStudent', isStudent)
  const { name } = useParams<{ name: string }>();
  const [currentImg, setCurrentImg] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e:any) => {
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

  const schlImages = [
    { id: '1', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '2', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '3', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '4', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '5', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '6', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
  ]
  const selectedClsImgs = [
    { id: '1', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '2', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '3', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '4', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '5', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
    { id: '6', uploadedBy: 'Siva', uploadedById: 'Y248C039', path: '', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJTEfzUvcFC7PHZQYOriegYSD4h7Fk_6zGQ&s' },
  ]
  return (
    <div className='gallery'>
      <IonText className='title_gallery'>
        <h4>School Images</h4>
      </IonText>
      <div className='scl_imgs'>
        {schlImages.slice(0, 4).map((sclImg, index) => (<div key={sclImg.id} className='img_item'>
          {(index < 3 || schlImages.length <= 4) ? (<>
            <div><IonImg src={sclImg.imageUrl} /></div>
          </>) : (<>
            <IonText>
              <IonImg src={schlImages[4].imageUrl} />
              <div className='tex_number_images'>
                <h1>+ {schlImages.length - 4}</h1>
              </div>
            </IonText>
          </>)}
        </div>))}
      </div>
      {!isStudent && <div onClick={handleButtonClick} className="custom-file-input">
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
        />
        <div className='field width-100 file-label'>
          <IonInput label="Upload School Image" readonly labelPlacement="floating" fill="outline" placeholder="jpg or png"></IonInput>
          <IonIcon icon={cloudUploadOutline}></IonIcon>
        </div>
        <div onClick={handleButtonClick} className='custom_place_val'></div>
      </div>}

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
              <IonImg src={selectedClsImgs[0].imageUrl} />
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
            {selectedClsImgs.map((clImag, index) => (<span key={clImag.id} className={`dot ${index === currentImg ? 'selected_dot' : ''}`}></span>))}
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
      {!isStudent && <div className="custom-file-input">
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
        />
        <div className='field width-100 file-label'>
          <IonInput label="Upload Year - Class - Section image" readonly labelPlacement="floating" fill="outline" placeholder="jpg or png"></IonInput>
          <IonIcon icon={cloudUploadOutline}></IonIcon>
        </div>
        <div onClick={handleButtonClick} className='custom_place_val'></div>
      </div>}
    </div>
  );
};

export default Gallery;
