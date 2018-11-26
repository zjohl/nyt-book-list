import api from "./api";
import $ from "jquery";
import {Link} from "react-router-dom";
import React from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from 'react-router-dom'

class Header extends React.Component {
    signIn() {
        this.props.history.push(`/signin`)
    }

    signUp() {
        this.props.history.push(`/signup`)
    }

    logout() {
        api.delete_session();
    }

    signInSignUp(authenticated) {
        if (authenticated) {
            return (
                <button className="button logout-btn" onClick={this.logout.bind(this)}>Logout</button>
            );
        } else {
            return (
                <div>
                    <button className="button signin-btn" onClick={this.signIn.bind(this)}>Sign In</button>
                    <button className="button signout-btn" onClick={this.signUp.bind(this)}>Sign Up</button>
                </div>
            );
        }
    }

    renderWishlistLink(authenticated) {
        if (authenticated) {
            return <Link className={"booklists"} to={"/booklists/wanted"} onClick={() => api.fetch_book_lists(this.props.session.user_id)}>MyWishlists</Link>;
        }
        return null;
    }

    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        return <div className="header">
            <div className="header-left">
                <Link className="header-app-link" to={"/"} onClick={() => api.fetch_books()}>NYT Bestsellers</Link>
                {this.renderWishlistLink(authenticated)}
            </div>
            <div className="header-right">
                {this.signInSignUp(authenticated)}
            </div>
        </div>;
    }
}

export default connect((state) => {return {session: state.session};})( withRouter(Header));