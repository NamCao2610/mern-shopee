import React from 'react'

function MessageBox(props) {
    return (
        <div className="message">
            <div className={`alert alert-${props.variant || 'danger'}`} role="alert">
                {props.children}
            </div>
        </div>
    )
}

export default MessageBox
