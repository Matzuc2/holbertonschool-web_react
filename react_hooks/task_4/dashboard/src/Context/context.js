import React from 'react';

export const user = {
    email: '',
    password: '',
    isLoggedIn: false
}

const logOut = () => {}

const newContext = React.createContext({ user, logOut })
export default newContext;
