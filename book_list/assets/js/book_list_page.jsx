import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from "react-router-dom";


import api from './api';
import BookCard from './book_card';


function bookListHeader() {
    return (
        <div className="links">
            <Link to={`/booklists/wanted`} className="link">Wanted Books</Link>
            <Link to={`/booklists/owned`} className="link">Owned Books</Link>
            <Link to={`/booklists/finished`} className="link">Finished Books</Link>
        </div>
    );
}

function bookListContent(props) {
    let {book_lists, books} = props;
    let type = props.match.params.type;

    if(!book_lists) {
        return <div>You don't have any books in your wishlists yet!</div>
    }

    let thisList = _.filter(book_lists, (item) => {
        return item.type === type;
    })

    if(_.isEmpty(thisList)) {
        return <div>You don't have any books in your {type} list yet!</div>
    }

    if(_.isEmpty(books)) {
        return <div>Loading books...</div>;
    }


    let book_list_items = _.map(book_lists, (item) => {
        let book = _.find(books, (book) => { return book.id === item.book_id });
        return <BookCard key={book.id} book={book} />;
    });

    return (
        <div className="book-list">
            {book_list_items}
        </div>
    );
}

function BookListPage(props) {
    let {session} = props;
    let authenticated = session && session.token;

    if(!authenticated) {
        return <Redirect to="/"/>;
    }


    return (
        <div className="book-lists">
            {bookListHeader()}
            {bookListContent(props)}
        </div>
    )

}


export default connect((state) => {return {books: state.books, book_lists: state.book_lists, users: state.users, session: state.session}})(BookListPage);
