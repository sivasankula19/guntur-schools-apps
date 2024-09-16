import React, { useRef, useState } from 'react';
import { IonIcon, IonImg, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { arrowBackCircleOutline, arrowForwardCircleOutline, expandOutline } from 'ionicons/icons';
import GImagUpload from '../components/GImagUpload';

const Gallery: any = (props: any) => {
  const { isStudent } = props;
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type:string) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);

      // Use FileReader to read the image file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string); // Set the image source
      };
      reader.readAsDataURL(file); // Read the file as a data URL
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
      <div className='scl-images'>
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
      {!isStudent && <GImagUpload onFileChange={(e:any)=>handleFileChange(e, 'plain')} label="Upload School Image" />}
      <div className='g_flex g-space-between'>
        <div style={{ width: '30%' }}>
          <IonSelect
            className="custom-select"
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
            className="custom-select"
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
            className="custom-select"
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
          <div className='cls-images-container'>
            <div className='g_flex g-align-center g-justify-center actual_image'>
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
          <div className='dots-images'>
            {selectedClsImgs.map((clImag, index) => (<span key={clImag.id} className={`dot ${index === currentImg ? 'selected_dot' : ''}`}></span>))}
          </div>
        </>) : (<>
          <div className='no-images'>
            <div>
              <IonText>
                <h1>No Images Found!</h1>
              </IonText>
              <IonText><p>Please Change Class, section and Year</p></IonText>
            </div>
          </div>
        </>)}
      </div>
      {!isStudent && <GImagUpload onFileChange={(e:any)=>handleFileChange(e, 'year')} label="Upload Year - Class - Section image" />}
    </div>
  );
};

export default Gallery;
