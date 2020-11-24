import React from 'react'

function MessageBox(props) {
    return (
        <div className="message">
            <div class="alert alert-danger" role="alert">
                {props.children}
            </div>
        </div>
    )
}

export default MessageBox
