import holbertonLogo from '../assets/holberton-logo.jpg'

function Header() {
  return (
    <div className="header">
      <header className="Header flex items-center gap-5 border-b-2 border-[var(--main-color)] p-5">
        <img className="w-[150px]" src={holbertonLogo} alt="Holberton logo" />
        <h1 className="m-0 text-[2rem] text-[var(--main-color)]">School dashboard</h1>
      </header>

  </div>
  );
}

export default Header;
