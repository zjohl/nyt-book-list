import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import BookCard from './book_card';


function BookListPage(props) {
    let {session, book_lists, books} = props;
    let authenticated = session && session.token;

    if(!authenticated) {
        return <Redirect to="/"/>;
    }

    if(!book_lists) {
        return <div>You don't have any books in your wishlist yet!</div>
    }

    if(_.isEmpty(books)) {
        return <div>No books</div>;
    }



    let book_list_items = _.map(book_lists, (item) => {
        let book = _.find(books, (book) => { return book.id === item.book_id });
        return <BookCard key={book.id} book={book} />;
    });
    return (
        <div className="book-list">
            {book_list_items}
        </div>
    )

}


export default connect((state) => {return {books: state.books, book_lists: state.book_lists, users: state.users, session: state.session}})(BookListPage);
