import { getCurrentYear, getFooterCopy } from '../../utils/utils';
function Footer({ user = {} }){
    return user ? (
        <footer className="App-footer mt-auto border-t-2 border-[var(--main-color)] p-3 text-center text-xs italic min-[520px]:p-[15px] min-[520px]:text-base">
            <p>copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
            {user.isLoggedIn && (
                <p>
                    <a href="#contact">Contact us</a>
                </p>
            )}
        </footer>
    ): null
}

export default Footer;