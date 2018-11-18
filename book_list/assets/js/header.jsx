import api from "./api";
import $ from "jquery";
import {Link} from "react-router-dom";
import React from "react";
import connect from "react-redux/es/connect/connect";

function login() {
    api.create_session($('#email_form').val(), $('#password_form').val());
    $('#email_form').val("");
    $('#password_form').val("");
}

function logout() {
    api.delete_session();
}

function signInSignUp(authenticated) {
    if(authenticated) {
        return (
            <button className="logout-btn" onClick={logout}>Logout</button>
        );
    } else {
        return (
            <div>
                <input id="email_form" type="email" placeholder="email" />
                <input id="password_form" type="password" placeholder="password" />
                <button className="btn btn-secondary" onClick={login}>Login</button>
            </div>
        );
    }
}

function Header(props) {
    let {session} = props;
    let authenticated = session && session.token;

    return <div className="header">
        <div className="header-left">
            <h3><Link to={"/"} onClick={() => api.fetch_books()}>NYT Bestsellers</Link></h3>
        </div>
        <div className="header-right">
            {signInSignUp(authenticated)}
        </div>
    </div>;
}

export default connect((state) => {return {session: state.session};})(Header);