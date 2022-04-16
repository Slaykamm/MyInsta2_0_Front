export const requiredField = (value) => {
    if (value) {
        return undefined
    }
    console.log('requiered MISTAKE')
    return 'Field is requered'
}

export const minLengthLogin = value => {
    if (value){
        if (value.length<3) {
            return 'Должен быть больше 3х символов'
        }
        return undefined
    }
}

export const maxLengthLogin = value => {
    if (value){
        if (value.length<15 && value.length>3) {
            return 'Должен быть меньше 15ти символов'
        }
        return undefined
    }
}

export const emailSybmolsValidate = value => {
    const etalonEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value.match(etalonEmail)) {
        return undefined
    }
    return 'Пароль должен содерать заглавные и строчные латинские буквы'
}



export const loginSybmolsValidate = value => {
    const etalonLogin = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/
    if (value.match(etalonLogin)) {
        return undefined
    }
    return 'Пароль должен содерать заглавные и строчные латинские буквы'
}

export const phoneSybmolsValidate = value => {
    const etalonLogin = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (value.match(etalonLogin)) {
        return undefined
    }
    return 'Телефон должен содерать только цифры'
}


export const minLenghtPassword = value => {
    if (value.length<8 ) {
        return `И быть больше 8 симоволов`
    }
    return undefined
}

export const passwordSymbolsValidate = value => {
    const etalonPass = /(?=.*[0-9])(?=.*[!@#$%^&*+])(?=.*[a-z])[0-9a-z!@#$%^&*+]{8,}/g 

    if (value.match(etalonPass)) {
        console.log('true')
        return undefined
    }
    return 'Пароль должен содежать латинские буквы, цифры и спец символы. '
}

