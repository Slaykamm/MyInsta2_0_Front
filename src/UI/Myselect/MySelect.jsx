import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {

    return (
        <select
            className={classes.mySelect}
            value = {value}
            onChange={event=>onChange(event.target.value)}
        >
            <option  value="">{defaultValue}</option>  
            {options.map(option =>
                <option key={option.id} value={option.id}>
                    {option.username}
                </option>    
            )}



        </select>
    );
};

export default MySelect;