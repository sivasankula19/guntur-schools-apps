import {
    IonIcon,
    IonInput,
    IonText,
    IonDatetime,
    IonModal,
    IonHeader,
    IonToolbar
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import React, { useRef, useState, useEffect } from 'react';

interface IGDatePickerProps {
    onDateChange: (event: string) => void,
    label?: string,
    dateIcon?: any,
    placeholder?: string,
    format?: string,
    classNames?: string,
    value?: string,
}

function GDatePicker({
    onDateChange,
    dateIcon = calendarOutline,
    label = 'Select Date',
    placeholder = 'Select a date',
    classNames,
    value,
}: IGDatePickerProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(value || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const fromModal = useRef<HTMLIonModalElement>(null);
    const initialDate = '2000-01-01T12:00:00.000Z'

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
        }
    }, [value]);

    const handleDateSelect = (e: CustomEvent) => {
        const date = e.detail.value;
        if (date) {
            setSelectedDate(date);
            onDateChange(date);
        }
        setShowDatePicker(false);
    };

    return (
        <div className={`custom-date-picker ${classNames}`}>
            <div className="field width-100 date-picker-label">
                <IonInput
                    value={selectedDate ? new Date(selectedDate).toLocaleDateString() : ''}
                    readonly
                    label={selectedDate ? label : placeholder}
                    labelPlacement="floating"
                    fill="outline"
                    onIonFocus={() => setShowDatePicker(true)}
                />
                <IonIcon icon={dateIcon} />
            </div>
            <IonModal className="custom-date-time-modal period_time_modal custom-date-pick" isOpen={showDatePicker} onDidDismiss={() => setShowDatePicker(false)} ref={fromModal} keepContentsMounted={true}>
                <IonHeader>
                    <IonToolbar className="g_txt_center">
                        <IonText>
                            <p>{label}</p>
                        </IonText>
                    </IonToolbar>
                </IonHeader>
                <IonDatetime
                    value={selectedDate || initialDate}
                    onIonChange={handleDateSelect}
                    showDefaultButtons={true}
                    onIonCancel={() => setShowDatePicker(false)}
                    presentation="date"
                />
            </IonModal>
        </div>
    );
}

export default GDatePicker;
