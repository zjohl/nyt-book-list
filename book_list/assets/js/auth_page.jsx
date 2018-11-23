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
        let email = $('#email');
        let password = $('#password');
        let f_name = $('#f_name');
        let l_name = $('#l_name');
        api.create_user({ user: {
            first_name: f_name.val(),
            last_name: l_name.val(),
            email: email.val(),
            password: password.val(),
        }});
    }

    login() {
        api.delete_session();
        let email = $('#email_form');
        let password = $('#password_form');

        api.create_session(email.val(), password.val());
    }


    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        if(authenticated) {
            return <Redirect to="/"/>;
        }

        if(this.props.match.path === "/signin") {
            return (
                <div className="sign-in-form auth-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="me@example.com" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="********" />
                    </div>
                    <button className="button" onClick={this.login}>Sign In</button>
                </div>
            )
        } else {
            return (
                <div className="sign-up-form auth-form">
                    <div className="input-group">
                        <label htmlFor="f_name">First Name</label>
                        <input id="f_name" name="f_name" type="text" placeholder="John" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="l_name">Last Name</label>
                        <input id="l_name" name="l_name" type="text" placeholder="Doe" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="me@example.com" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="********" />
                    </div>
                    <button className="button" onClick={this.createAccount}>Sign Up</button>
                </div>
            )
        }
    }
}

export default connect((state) => {return {session: state.session};})( AuthPage);
