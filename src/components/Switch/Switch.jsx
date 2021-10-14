import React from 'react'
import './Switch.css'

const Switch = ({ handleSwitch, darkMode}) => {
    return (
<div>
    <label className='switch'>
        <input type='checkbox' onChange={handleSwitch} checked={darkMode}/>
        <span className='slider'/>
    </label>
</div>
    )
}

export default Switch