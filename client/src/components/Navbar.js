import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

        const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper cyan lighten-2" style={{padding: '0 2rem'}}>
                <span className="brand-logo ">Note App</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/table">Table</NavLink></li>
                    <li><NavLink to="/notes">Notes</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Exit</a></li>
                </ul>
            </div>
        </nav>
    )
}