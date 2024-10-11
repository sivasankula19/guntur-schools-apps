import { IonIcon, IonInput, IonText } from '@ionic/react';
import { closeCircleOutline, cloudUploadOutline } from 'ionicons/icons';
import React, { useRef, useState } from 'react';

interface IGImageUploadProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    label?: string,
    uploadIcon?: any,
    accept?: string,
    multiple?: boolean,
    classNames?: string,
}

function GImagUpload({ onFileChange, uploadIcon = cloudUploadOutline, label = 'Upload', accept = "image/*", multiple = false, classNames }: IGImageUploadProps) {
    const [uploadedImage, setUploadedImag] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = (e: any) => {
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setUploadedImag(fileArray); // Update the state with the selected files
        }
        onFileChange(event);
    };

    const fileNamesString = uploadedImage.map((file) => file.name).join(', ');

    const handleRemoveImage = (fileName: string) => {
        setUploadedImag((prevImages) => prevImages.filter((file) => file.name !== fileName));

        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
    };

    return (
        <div className={`custom-file-input ${classNames}`}>
            <input
                type="file"
                ref={fileInputRef}
                className="file-input"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            <div className='field width-100 file-label'>
                <IonInput label={uploadedImage.length ? 'Uploaded Images' : label} onFocus={(e) => e.target.blur()} value={uploadedImage.length ? fileNamesString : ''} readonly labelPlacement="floating" fill="outline"></IonInput>
                <IonIcon icon={uploadIcon}></IonIcon>
            </div>
            <div onClick={handleButtonClick} className='custom_place_val'></div>
            {uploadedImage.length ? (
                <div className='uploaded-images-con'>
                    {uploadedImage.map((file) => (
                        <div key={file.name} className='upload-img'>
                            <IonText><p className='g_text_ellipses'>{file.name}</p></IonText>
                            <IonIcon onClick={() => handleRemoveImage(file.name)} icon={closeCircleOutline}></IonIcon>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default GImagUpload;