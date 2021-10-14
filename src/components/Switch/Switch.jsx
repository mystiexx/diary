import React, { useState } from 'react'
import './Switch.css'

const Switch = ({ handleSwitch, darkMode}) => {
    const [ checked, setChecked ] = useState(false)
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