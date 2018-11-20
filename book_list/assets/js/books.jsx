import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

import BookCard from './book_card';


function BookList(props) {
    let {book_lists, books, session} = props;
    let authenticated = session && session.token;
    let bookCards = _.map(books, (book) => <BookCard
        key={book.id}
        book={book}
        booklists={book_lists}
        authenticated={authenticated}
        session={session}
    />);
    return <div className="index-books">
        {bookCards}
    </div>;
}


export default connect((state) => {return {books: state.books, users: state.users, session: state.session, book_lists: state.book_lists};})(BookList);
