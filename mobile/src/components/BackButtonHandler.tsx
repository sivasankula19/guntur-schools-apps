import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

const BackButtonHandler = ({ ionRouter }: any) => {
    const location = useLocation();
    const currentPathRef = useRef(location.pathname);

    useEffect(() => {
        const handleBackButton = (ev: any) => {
            ev.detail.register(-1, () => {
                const currentPath = currentPathRef.current;
                if (currentPath === '/dashboard') {
                    CapacitorApp.exitApp();
                } else {
                    if (!ionRouter.canGoBack()) {
                        CapacitorApp.exitApp();
                    } else {
                        ionRouter.goBack();
                    }
                }
            });
        };

        document.addEventListener('ionBackButton', handleBackButton);

        return () => {
            document.removeEventListener('ionBackButton', handleBackButton);
        };
    }, [ionRouter]);

    useEffect(() => {
        currentPathRef.current = location.pathname;
    }, [location.pathname]);

    return null;
};

export default BackButtonHandler