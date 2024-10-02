import { IonIcon, IonInput } from '@ionic/react'
import React from 'react'

interface ICustomInputProps {
    value: string | number,
    onInput: (e: any) => void,
    name: string,
    label: string,
    labelPlacement?: 'start' | 'end' | 'floating' | 'stacked' | 'fixed',
    fill?: 'outline' | 'solid',
    placeholder?: string,
    icon?: any,
    classNames?: string,
    readonly?:boolean
}
function GCustomInput({ value, onInput, name, label = "Enter", labelPlacement = 'floating', fill = 'outline', placeholder = 'Enter Something!', icon, classNames = 'field m-bottom-10',readonly=false }: ICustomInputProps) {

    return (
        <div className={classNames}>
            <IonInput value={value || ''} readonly={readonly} onIonInput={onInput} name={name} label={label} labelPlacement={labelPlacement} fill={fill} placeholder={placeholder}></IonInput>
            {icon && (<IonIcon icon={icon}></IonIcon>)}
        </div>)
}

export default GCustomInput