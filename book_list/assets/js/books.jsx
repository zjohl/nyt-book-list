import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

import BookCard from './book_card';


function BookList(props) {
    let books = _.map(props.books, (book) => <BookCard key={book.id} book={book} />);
    return <div className="book-list">
        {books}
    </div>;
}


export default connect((state) => {return {books: state.books, users: state.users, session: state.session};})(BookList);
