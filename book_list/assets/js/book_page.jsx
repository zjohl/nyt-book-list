import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';

function BookPage(props) {
    let id = props.match.params.id;
    let book = _.find(props.books, (book) => { return book.id.toString() === id });
    if(!book) {
        return null;
    }


    return <div className="book-card">
        <div className="book-content">
            <img className="cover-img" src={book.cover_url} alt={book.title}/>
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">{book.author}</h3>
        </div>
    </div>;
}


export default connect((state) => {return {books: state.books, users: state.users, session: state.session};})(BookPage);
