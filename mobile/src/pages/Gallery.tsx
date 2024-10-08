import React, { useRef, useState } from 'react';
import { IonIcon, IonImg, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import { arrowBackCircleOutline, arrowForwardCircleOutline, expandOutline } from 'ionicons/icons';
import GImagUpload from '../components/GImagUpload';
import GCustomSelectDrop from '../components/GCustomSelectDrop';
import { classListDummy, sectionListDummy } from '../common/utility';
import GBackSaveReset from '../components/GBackSaveReset';

const Gallery: any = (props: any) => {
  const { isStudent } = props;
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filterValues, setFilterValue] = useState({
    classId: '',
    sectionId: '',
    year: '',
  });

  const handleButtonClick = (e: any) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
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

  const classDummyData = classListDummy.map(i => ({ id: i.classId, label: i.className }));
  const sectionDummyData = sectionListDummy.map(i => ({ id: i.sectionId, label: i.sectionName }));

  const handleChangeSelect = (e: any) => {
    setFilterValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => { };
  const handleSave = () => { };

  return (
    <div className='g_full_height gallery'>
    <GBackSaveReset handleReset={handleReset} handleSave={handleSave} />
      <div className={`${!isStudent ? 'gallery-m-sa' : 'g_full_height'}`}>
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
        {!isStudent && <GImagUpload onFileChange={(e: any) => handleFileChange(e, 'plain')} label="Upload School Image" />}
        <div className='g_flex g-space-between'>
          <div style={{ width: '30%' }}>
            <GCustomSelectDrop options={classDummyData} name='classId'
              value={filterValues.classId} label="Select Class"
              handleOnChange={handleChangeSelect} classNames='custom-select' />
          </div>
          <div style={{ width: '30%' }}>
            <GCustomSelectDrop options={sectionDummyData} name='sectionId'
              value={filterValues.sectionId} label="Section"
              handleOnChange={handleChangeSelect} classNames='custom-select' />
          </div>
          <div style={{ width: '30%' }}>
            <GCustomSelectDrop options={["2024, 2023, 2022, 2021"].map(i => ({ id: i, label: i }))} name='year'
              value={filterValues.year} label="Year"
              handleOnChange={handleChangeSelect} classNames='custom-select' />
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
        {!isStudent && <GImagUpload onFileChange={(e: any) => handleFileChange(e, 'year')} label="Upload Year - Class - Section image" />}
      </div>
    </div>
  );
};

export default Gallery;
