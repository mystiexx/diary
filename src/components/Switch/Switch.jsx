import React from 'react'
import './Switch.css'

const Switch = ({ handleSwitch}) => {
    return (
<div>
    <label className='switch'>
        <input type='checkbox' onChange={handleSwitch}/>
        <span className='slider'/>
    </label>
</div>
    )
}

export default Switch