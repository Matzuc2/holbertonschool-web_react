import { getCurrentYear, getFooterCopy } from '../utils/utils';
import AppContext from '../Context/context'
import { useContext } from 'react';
function Footer(){
    const {user, logOut} = useContext(AppContext)
    return(
        <footer className="App-footer mt-auto border-t-2 border-[var(--main-color)] p-3 text-center text-xs italic min-[520px]:p-[15px] min-[520px]:text-base">
            <p>copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
            { user.isLoggedIn &&(
                <a>Contact us</a>
            )}
        </footer>
    )
}

export default Footer;