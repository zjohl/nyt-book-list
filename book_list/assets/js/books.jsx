import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function BookList(props) {
    let books = _.map(props.books, (book) => <BookCard key={book.id} book={book} />);
    return <div className="book-list">
        {books}
    </div>;
}

function BookCard(props) {
    let {book} = props;
    return <div className="book-card">
        <div className="book-content">
            <img className="cover-img" src={book.cover_url} alt={book.title}/>
            <h2 className="book-title">{book.title}</h2>
        </div>
    </div>;
}


export default connect((state) => {return {books: state.books, users: state.users, session: state.session};})(BookList);
