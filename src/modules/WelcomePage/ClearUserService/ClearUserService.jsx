import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function ClearUserService() {
    const [name, setName] = useState(localStorage.getItem('SLNUserName'))
    const navigate = useNavigate()

    useEffect(()=>{
        
        localStorage.setItem('SLNUserName', '');
        setName(localStorage.getItem('SLNUserName'))
        localStorage.setItem('SLNToken', '')
    },[])

    useEffect(()=>{
        if (!localStorage.getItem('SLNUserName') &&  !localStorage.getItem('SLNToken')){
            navigate('/login')
        }
        
    },[name])

    return (
        <>
             <p>Ожидаем очищения юзера из памяти</p>
        
        </>
    )
}

export default ClearUserService
