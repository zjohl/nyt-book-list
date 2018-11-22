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
                <button className="logout-btn" onClick={this.logout.bind(this)}>Logout</button>
            );
        } else {
            return (
                <div>
                    <button className="signin-btn" onClick={this.signIn.bind(this)}>Sign In</button>
                    <button className="signout-btn" onClick={this.signUp.bind(this)}>Sign Out</button>
                </div>
            );
        }
    }

    renderWishlistLink(authenticated) {
        if (authenticated) {
            return <Link to={"/booklists/wanted"} onClick={() => api.fetch_book_lists()}>MyWishlists</Link>;
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