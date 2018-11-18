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

function signInSignUp(props) {
    let {session} = props;
    if(session) {
        return (
            <div className="col-6">
                <div className="form-inline my-2">
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </div>
        );
    }

    return (
        <div className="col-6">
            <div className="form-inline my-2">
                <input id="email_form" type="email" placeholder="email" />
                <input id="password_form" type="password" placeholder="password" />
                <button className="btn btn-secondary" onClick={login}>Login</button>
            </div>
        </div>
    );
}

function Header(props) {

    return <div className="header">
        <div className="header-left">
            <h1><Link to={"/"} onClick={() => api.fetch_tasks()}>Task Tracker</Link></h1>
        </div>
        <div className="header-right">
            {signInSignUp(props)}
        </div>
    </div>;
}

export default connect((state) => {return {session: state.session};})(Header);