import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import BookListButton from './book_list_button';



function BookPage(props) {
    let {session} = props;
    let authenticated = session && session.token;

    let id = props.match.params.id;
    let book = _.find(props.books, (book) => { return book.id.toString() === id });
    if(!book) {
        return null;
    }

    let book_list = _.find(props.book_lists, (item) => { return id === item.book_id.toString() && session.user_id === item.user_id.toString() });

    return <div className="book">
        <div className="book-content">
            <img className="cover-img" src={book.cover_url} alt={book.title}/>
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">{book.author}</h3>
            {<BookListButton
                book_id={id}
                user_id={session.user_id}
                authenticated={authenticated}
                book_list={book_list}
            />}
        </div>
    </div>;
}


export default connect((state) => {return {book_lists: state.book_lists, books: state.books, users: state.users, session: state.session};})(BookPage);
