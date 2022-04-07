import React from 'react'
import cl from './NameForm.module.css'
import Form from 'react-bootstrap/Form'

function NameForm({handleSubmit, ...props}) {
    return (
        // <div>
        //     <input 
        //         className={cl.MyInput}
        //         label='Сменить аватар'
        //         type='file' 
        //         name='file' 
        //         onChange={e => handleSubmit(e)}
        //     />
        // </div>

        <>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control 
                type="file" 
                onChange={e => handleSubmit(e)}
            />
        </Form.Group>
        </>
    )
}

export default NameForm
