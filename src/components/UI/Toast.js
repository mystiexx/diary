import React from 'react'
import './Toast.css'

const Toast = (props) => {
    return (
        <div className='toast' style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0',
        }}>
               <div onClick={props.close} style={{
                   display:'flex-end',
                   float: 'right'
               }}>
                   <span>X</span></div>
            {props.children}

         
        </div>
    )
}

export default Toast