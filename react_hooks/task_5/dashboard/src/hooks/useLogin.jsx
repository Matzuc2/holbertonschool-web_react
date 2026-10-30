import { useState } from 'react';


export function useLogin(onLogin) {
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: ''})
        
    function handleChangeEmail (event) {
            const nextFormData = {
            ...formData,
            email: event.target.value,
        }
        setFormData(nextFormData)
        handleEnableSubmit(nextFormData)
    }

    function handleChangePassword (event) {
        const nextFormData = {
            ...formData,
            password: event.target.value,
        }
        setFormData(nextFormData)
        handleEnableSubmit(nextFormData)
    }

    function handleEnableSubmit (data) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = data.email.trim() !=""
        && emailRegex.test(data.email)
            && data.password.trim() != ""
            && data.password.length >= 8
        setEnableSubmit(isValid)
    }

    function handleLoginSubmit (event) {
        event.preventDefault();
        onLogin(formData.email, formData.password)
    }



    return {
        email: formData.email,
        password: formData.password,
        enableSubmit: enableSubmit,
        handleChangeEmail: handleChangeEmail,
        handleChangePassword: handleChangePassword,
        handleLoginSubmit: handleLoginSubmit
    }
}