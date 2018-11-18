import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';


function BookPage(props) {
    let {session} = props;
    let authenticated = session && session.token;

    let id = props.match.params.id;
    let book = _.find(props.books, (book) => { return book.id.toString() === id });
    if(!book) {
        return null;
    }

    function addToWishlist() {
        api.create_book_list_entry({
            book_list: {
                type: "wishlist",
                book_id: props.match.params.id,
                user_id: props.session.user_id,
            }
        });
    }

    function wishlistButton() {
        if(!authenticated) {
            return null;
        }

        return (
            <button onClick={addToWishlist}>Add to Wishlist</button>
        );
    }

    return <div className="book">
        <div className="book-content">
            <img className="cover-img" src={book.cover_url} alt={book.title}/>
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">{book.author}</h3>
            {wishlistButton()}
        </div>
    </div>;
}


export default connect((state) => {return {books: state.books, users: state.users, session: state.session};})(BookPage);
