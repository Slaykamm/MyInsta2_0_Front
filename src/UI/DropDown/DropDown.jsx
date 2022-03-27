import React from 'react'
import cl from './DropDown.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function DropDown(
    {setModal, 
    setModalEdit,
    commentDelete, 
    commentPrivateMessege, 
    replyPrivateWithQuotation,
    ...props}) {

    return (
        <div className="mb-2" >
            {['start'].map((direction) => (
            <DropdownButton
                
                key={direction}
                id={`dropdown-button-drop-${direction}`}
                drop={direction}
                variant="secondary"
                title='...'
            >
                {replyPrivateWithQuotation 
                ? <span></span>
                :
                <Dropdown.Item 
                    onClick={() => setModal(true)}
                    >
                        Цитировать
                </Dropdown.Item>
                }

                { props.user == localStorage.getItem('SLNUserName') 
                ?   <div>
                        <Dropdown.Item 
                            onClick={() => setModalEdit(true)}
                            >
                                Редактировать
                        </Dropdown.Item>

                        <Dropdown.Item 
                            onClick={(e) => commentDelete(e)}
                            >
                            Удалить
                        </Dropdown.Item>
                    </div>
            


                :   <div>
                        <Dropdown.Divider />

                        {commentPrivateMessege
                        ?   <Dropdown.Item 
                                onClick={id => commentPrivateMessege(props.id, props.user)}
                                >
                                    Отправить личное сообщение автору
                            </Dropdown.Item>
                        :  <span></span>
                        
                        }


                    </div>
            }
            </DropdownButton>
            ))}
        </div>
    )
}

export default DropDown
