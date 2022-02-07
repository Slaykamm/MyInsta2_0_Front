    
export const clearAllCookie = () =>{

    let cookies = document.cookie.split(/;/);
    for (let i = 0, len = cookies.length; i < len; i++) {
        let cookie = cookies[i].split(/=/);
        document.cookie = cookie[0] + "=;max-age=-1";
    }

}    

export const getAllCookie = () =>{
    var obj = {};
    var cookies = document.cookie.split(/;/);
    for (var i = 0, len = cookies.length; i < len; i++) {
        var cookie = cookies[i].split(/=/);
        obj[cookie[0]] = cookie[1];
    }
    return obj
}

export const getCookies = (name) => {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
     
export const setCookies = (name, value) => {
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}

export const clearOneCookie = (name) => {
    const forDelCookieValue = getCookies(name);
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(forDelCookieValue)+";max-age=-1";

}

export const cookieTransormToBoolean = (value) =>{

    switch (value){
        case 'true':
            return true

        case 'false':
            return false

    default:
        window.alert("Ошибка в куке", value)
    }

}
