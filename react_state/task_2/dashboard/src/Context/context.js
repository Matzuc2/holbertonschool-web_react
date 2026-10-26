import React from 'react';

const user = {
    email: '',
    password: '',
    isLoggedIn: false
}

function logout(){
}

const newContext = React.createContext({user, logout})
export default newContext;
