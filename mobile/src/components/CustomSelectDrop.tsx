import { IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'

interface ICustomSelectDropProps {
    id?: string
    classNames?: string,
    labelPlacement?: any,
    fill?: 'outline' | 'solid',
    label?: string,
    ionInterface?: 'action-sheet' | 'popover' | 'alert',
    name?: string
    value: string
    handleOnChange: (e:any) => void,
    options: { id: string | number, label: string | number }[]
    removeDefault?:boolean
}

function CustomSelectDrop({ classNames = '',
    id = '',
    labelPlacement = 'floating',
    fill = 'outline',
    label = "Select",
    ionInterface = 'popover',
    name = '',
    value = '',
    handleOnChange = () => { },
    options = [],
    removeDefault=true
}: ICustomSelectDropProps) {
    return (
        <IonSelect
            className={classNames}
            label={label}
            labelPlacement={labelPlacement}
            fill={fill}
            id={id}
            interface={ionInterface}
            name={name}
            value={value}
            onIonChange={handleOnChange}
        >
            {!removeDefault && (<IonSelectOption value={''}>{"Select"}</IonSelectOption>)}
            {options.map((option: any) => (
                <IonSelectOption key={option.id} value={option.id}>{option.label}</IonSelectOption>
            ))}
        </IonSelect>
    )
}

// options should [{id:'', label:''}]

export default CustomSelectDrop