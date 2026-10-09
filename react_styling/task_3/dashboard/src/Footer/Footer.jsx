import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer(){
    return(
        <footer className="App-footer mt-auto border-t-2 border-[var(--main-color)] p-[15px] text-center italic">
            <p>copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </footer>
    )
}

export default Footer;