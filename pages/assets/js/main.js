logout = () => {
    Cookies.remove('token');
    window.location.pathname = '/login'
}

