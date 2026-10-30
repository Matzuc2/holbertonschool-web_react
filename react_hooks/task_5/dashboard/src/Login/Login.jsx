import { Fragment } from 'react';
import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';


function Login ({ logIn = () => {} }){
    
    const {
        email,
        password,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword, 
        handleLoginSubmit
    } = useLogin(logIn)


    return(
            <Fragment>
                <div className="Login flex min-h-[70vh] flex-col items-start gap-2 border-t-2 border-[var(--main-color)] p-3 min-[520px]:p-5">
                    <p>Login to access the full dashboard</p>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            value={email}
                            id="email"
                            name="email"
                            onChange={handleChangeEmail}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            name="password"
                            onChange={handleChangePassword}
                        />

                        <input
                            type="submit"
                            value="OK"
                            disabled={!enableSubmit}
                            className="rounded border border-gray-400 px-3 py-1"
                        />
                    </form>
                </div>
            </Fragment>
        )

}

export default WithLogging(Login);