import React from 'react'
import './Switch.css'

const Switch = ({ handleSwitch,  checked}) => {
    return (
<div>
    <label className='switch'>
        <input type='checkbox' onChange={handleSwitch} checked={checked}/>
        <span className='slider'/>
    </label>
</div>
    )
}

export default Switch