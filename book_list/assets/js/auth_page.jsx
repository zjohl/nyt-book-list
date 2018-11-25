import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import socket from "./socket";
import api from './api';
import store from "./store";

import {Link, Redirect, withRouter} from "react-router-dom";
import { withAlert } from 'react-alert'


class AuthPage extends React.Component {

    creationFailedAlert() {
        this.props.alert.show("Account creation failed");
    }

    loginFailedAlert() {
        this.props.alert.show("Login failed");
    }

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
        }}, this.creationFailedAlert.bind(this));
    }

    login() {
        api.delete_session();
        let email = $('#email');
        let password = $('#password');

        api.create_session(email.val(), password.val(), this.loginFailedAlert.bind(this));
    }


    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        if(authenticated) {
            api.fetch_book_lists(session.user_id);
            return <Redirect to="/"/>;
        }

        if(this.props.match.path === "/signin") {
            return (
                <div className="sign-in-form auth-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input required id="email" name="email" type="email" placeholder="me@example.com" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input required id="password" name="password" type="password" placeholder="********" />
                    </div>
                    <button className="button" onClick={this.login.bind(this)}>Sign In</button>
                </div>
            )
        } else {
            return (
                <div className="sign-up-form auth-form">
                    <div className="input-group">
                        <label htmlFor="f_name">First Name</label>
                        <input required id="f_name" name="f_name" type="text" placeholder="John" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="l_name">Last Name</label>
                        <input required id="l_name" name="l_name" type="text" placeholder="Doe" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input required id="email" name="email" type="email" placeholder="me@example.com" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input required id="password" name="password" type="password" placeholder="********" />
                    </div>
                    <button className="button" onClick={this.createAccount.bind(this)}>Sign Up</button>
                </div>
            )
        }
    }
}

export default connect((state) => {return {session: state.session};})( withAlert(AuthPage));
