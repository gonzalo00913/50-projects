import {NavLink } from "react-router-dom";
import style from "../Nav/nav.module.css";

const Nav = ({ isAuthenticated }) => {
  return (
    <div className={style.nav}>
      {isAuthenticated ? (
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/">Content</NavLink></li>
        </ul>
      ) : (
        <ul>
          <li><NavLink className={style.parrafoNav} to="/">Home</NavLink></li>
          <li><NavLink className={style.parrafoNav} to="/login">Login</NavLink></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
/*   return (
    <div className={style.nav}>
      {
        isAuthenticated
      }: ()
      <NavLink className={style.parrafoNav} to="/" title="Projects">
        <span>Home</span>
      </NavLink>
      <NavLink className={style.parrafoNav} to="/login" title="login">
        <span>Login</span>
      </NavLink>
    </div>
  ); */