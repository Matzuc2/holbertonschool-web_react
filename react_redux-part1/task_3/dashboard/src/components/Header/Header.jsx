import logo from "../../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";
import store from "../../app/store"
import { logout } from "../../features/auth/authSlice";


const state = store.getState()
function handleLogout(){
  store.dispatch(logout)
}
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: "30vmin",
    pointerEvents: "none",
  },
  h1: {
    color: "#e1003c",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: "2.5rem",
    margin: 0,
  },
  a: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "1.2rem",
    marginLeft: "auto",
    cursor: "pointer",
  },
});

export default function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="holberton logo" />
      <h1 className={css(styles.h1)}>School Dashboard</h1>
      {state.auth.isLoggedIn ? (
        <div id="logoutSection" className={css(styles.logoutSection)}>
          Welcome <b>{state.auth.user.email}</b> <a className={css(styles.a)} href="#" onClick={handleLogout}>(logout)</a>
        </div>
      ) : null}
    </div>
  );
}
