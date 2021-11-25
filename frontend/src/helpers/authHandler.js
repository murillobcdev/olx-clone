import Cookies from 'js-cookie';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
    //operador ternario que verifica se existe um token para poder retorna-lo
}

export const doLogin = (token, rememberPass = false) => {
    if (rememberPass) {
        Cookies.set('token', token, { expires: 999 });
    } else {
        Cookies.set('token', token);
    }
}

export const doLogout = () => {
    Cookies.remove('token');
}