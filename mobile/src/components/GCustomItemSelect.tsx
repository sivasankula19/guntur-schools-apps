import { IonButton, IonCard, IonCardContent, IonSearchbar } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'

interface IGCustomItemSelectProps {
    isPlain?: boolean,
    itemData?: IItemDate[],
    children?: React.ReactNode,
    selectedItem?: any,
    setSelectedItem?: any,
    parentItemDetailsRef: any,
    isOpen: boolean,
    setIsOpen: any,
    classNames?: string,
}

interface IItemDate {
    itemName: string,
    itemId: string | number,
    itemDescription: string
}

function GCustomItemSelect(props: IGCustomItemSelectProps) {
    const { itemData = [], isPlain = false, selectedItem = null, parentItemDetailsRef, isOpen, setIsOpen, classNames, setSelectedItem } = props
    const [searchResult, setSearchResult] = useState<any>([]);
    const itemDetailsRef = useRef<any>();
    const [search, setSearch] = useState('');
    useEffect(() => {
        window.addEventListener('click', handleScreenClick);
        return () => {
            window.removeEventListener('click', handleScreenClick);
        };
    }, []);

    useEffect(() => {
        if(itemData){
        setSearchResult(itemData);
        setSearchResult(itemData.filter((item: any) => (((item.itemName).toLowerCase().includes((search).toLowerCase()) || (item.itemId).toLowerCase().includes((search).toLowerCase())))))
        }
    }, [itemData]);

    useEffect(() => {
        if(isOpen)
        setSearch('');
    }, [isOpen])

    const handleScreenClick = (e: any) => {
        setIsOpen((itemDetailsRef && itemDetailsRef.current?.contains(e.target)) || (parentItemDetailsRef && parentItemDetailsRef?.current?.contains(e.target)));
    }

    const handleInput = (ev: any) => {
        setSearch(ev.detail.value);
        setSearchResult(itemData.filter((item: any) => (((item.itemName).toLowerCase().includes((ev.detail.value).toLowerCase()) || (item.itemId).toLowerCase().includes((ev.detail.value).toLowerCase())) || ev.detail.value == '')))
        //  debounce function can be executed!!! here i.e api
    };

    const handleStudentChange = (student: any) => {
        setSelectedItem(student);
    }

    const handlePopOverClose = (e: any) => {
        setIsOpen(false);
    }

    return (
        <>
            {!isOpen ? null : <IonCard ref={itemDetailsRef} className={`student-picker ${classNames}`}>
                <IonCardContent>
                    <div>
                        {isPlain ? <>
                            {props.children}
                        </> : <>
                            <div className='m-bottom-10'>
                                <IonSearchbar placeholder='Search Staff Name / Id' showClearButton="focus"
                                    value={search}
                                    debounce={500}
                                    onIonInput={handleInput}></IonSearchbar>
                            </div>
                            <div className='users-list-dis'>
                                {searchResult.length ? <>
                                    {searchResult.map((itemInfo: any) => (
                                        <div key={itemInfo.itemId} onClick={() => handleStudentChange(itemInfo)} className={`student-search-card${itemInfo.itemId === selectedItem?.itemId ? ' selected-card' : ''}`}>
                                            <div className='width-70 student-name'><p className='g_text_ellipses'>{itemInfo.itemName}</p></div>
                                            <div className='width-30 student-id-cls'>
                                                <div><p className='g_text_ellipses font-500'>{itemInfo.itemId}</p></div>
                                                <div><p className='g_text_ellipses'>{itemInfo.itemDescription}</p></div>
                                            </div>
                                        </div>
                                    ))}
                                </> : <>
                                    <div>No Results Found!</div>
                                </>}
                            </div>
                        </>}
                        <div className='m-top-10'>
                            <IonButton id='student-list-select' fill="outline" expand="block" onClick={handlePopOverClose}>Close</IonButton>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>}
        </>
    )
}

export default GCustomItemSelect