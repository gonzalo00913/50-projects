import {NavLink } from "react-router-dom";
import style from "../Nav/nav.module.css";
import logo from "../../assets/png2.png"

const Nav = ({ isAuthenticated }) => {
  return (
    <div className={style.nav}>
      {isAuthenticated ? (
        <ul className={style.ul}>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/">Content</NavLink></li>
        </ul>
      ) : (
        <div className={style.navUl}>
        <ul >

          <img src={logo} className={style.iconNav} />
          <NavLink className={style.logo} to="/">Home</NavLink>
          <p className={style.logo}>About us</p>
          <p className={style.logo}>Contact</p>
          <NavLink className={style.logo} to="/login">Login</NavLink>
        </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
