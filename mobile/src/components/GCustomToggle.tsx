import { IonToggle } from '@ionic/react'
import React from 'react'

interface IGCustomToggleProps {
    checked: boolean,
    onHandleChange: (e: any) => void,
    name?: string,
    classNames?: string
    onTxt?: string,
    offTxt?: string,
}

function GCustomToggle({
    checked,
    onHandleChange,
    name,
    classNames = 'custom-toggle',
    onTxt = 'On',
    offTxt = 'Off',
}: IGCustomToggleProps) {
    return (
        <IonToggle
            className={classNames}
            name={name}
            checked={checked}
            onIonChange={onHandleChange}
        >
            <span className={`toggle-text ${checked ? 'enabled_filter' : 'disabled_filter'}`}>
                {checked ? onTxt : offTxt}
            </span>
        </IonToggle>
    )
}

export default GCustomToggle