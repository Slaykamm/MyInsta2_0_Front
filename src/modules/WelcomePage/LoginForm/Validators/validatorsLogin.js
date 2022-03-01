export const requiredField = (value) => {
    if (value) {
        return undefined
    }
    return 'Field is requered'
}

export const minLengthLogin = value => {
    if (value.length<3) {
        return 'Должен быть больше 3х символов'
    }
    return undefined
}

export const loginSybmolsValidate = value => {
    const etalonLogin = /(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{3,}/g
    if (value.match(etalonLogin)) {
        return undefined
    }
    return 'Пароль должен содерать заглавные и строчные латинские буквы'
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

