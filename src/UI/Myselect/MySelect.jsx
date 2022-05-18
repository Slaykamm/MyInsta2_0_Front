import React from 'react';
import classes from './MySelect.module.css'

const _MySelect = ({options, defaultValue, value, onChange}) => {

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
const MySelect = React.memo(_MySelect)
export default MySelect;