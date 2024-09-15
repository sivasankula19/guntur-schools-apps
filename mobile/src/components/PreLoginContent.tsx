import React from 'react'
import PreLoginHead from './PreLoginHead'
import { useSelector } from 'react-redux';
import PreLoginFoot from './PreLoginFoot';

function PreLoginContent(props: any) {
    const role = useSelector((state: any) => state.auth.role) || 'Student';
    return (
        <div className="pre-login-container">
            <PreLoginHead></PreLoginHead>
            <div className="actual_content">
                {props.children}
            </div>
            {
                role === 'Student' && (<PreLoginFoot></PreLoginFoot>)
            }
        </div>
    )
}

export default PreLoginContent