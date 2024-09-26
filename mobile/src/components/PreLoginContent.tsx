import React from 'react'
import PreLoginHead from './PreLoginHead'
import { useSelector } from 'react-redux';
import PreLoginFoot from './PreLoginFoot';

function PreLoginContent(props: any) {
    const role = useSelector((state: any) => state.auth.role) || 'Student';
    return (
        <div className="pre-login-container g_full_height">
            {
                role === 'Student' && (<PreLoginHead></PreLoginHead>)
            }
            <div className={`actual_content ${role !== 'Student' ? 'g_full_height' : ''} `}>
                {props.children}
            </div>
            {
                role === 'Student' && (<PreLoginFoot></PreLoginFoot>)
            }
        </div>
    )
}

export default PreLoginContent