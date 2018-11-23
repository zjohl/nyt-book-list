import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import socket from "./socket";
import api from './api';
import store from "./store";

import {Link, Redirect, withRouter} from "react-router-dom";



class AuthPage extends React.Component {

    createAccount() {
        api.delete_session();
        let email = $('#email_form');
        let password = $('#password_form');

        api.create_session(email.val(), password.val());
        $('#f_name').val("");
        $('#l_name').val("");
        email.val("");
        password.val("");
    }

    login() {
        api.delete_session();
        let email = $('#email_form');
        let password = $('#password_form');

        api.create_session(email.val(), password.val());
        email.val("");
        password.val("");
    }


    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        if(authenticated) {
            return <Redirect to="/"/>;
        }

        // this.props.match.params.id

        debugger;

        if(this.props.match.path === "/signin") {
            return (
                <div className="sign-in-form">
                    <input id="email_form" type="email" placeholder="email" />
                    <input id="password_form" type="password" placeholder="password" />
                    <button className="btn btn-secondary" onClick={this.login}>Sign In</button>
                </div>
            )
        } else {
            return (
                <div className="sign-in-form auth-form">
                    <input id="f_name" type="text" placeholder="first name" />
                    <input id="l_name" type="text" placeholder="last name" />
                    <input id="email_form" type="email" placeholder="email" />
                    <input id="password_form" type="password" placeholder="password" />
                    <button className="button" onClick={this.createAccount}>Sign Up</button>
                </div>
            )
        }
    }
}

export default connect((state) => {return {session: state.session};})( AuthPage);
