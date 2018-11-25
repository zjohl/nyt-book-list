import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {Link, Redirect} from "react-router-dom";

import api from './api';
import BookCard from './book_card';

class BookListPage extends React.Component {
    constructor(props) {
        super(props);
    }

    bookListHeader(type) {
        return (
            <div className={`links ${type}`}>
                <Link to={`/booklists/wanted`} className="link wanted">Wanted Books</Link>
                <Link to={`/booklists/owned`} className="link owned">Owned Books</Link>
                <Link to={`/booklists/finished`} className="link finished">Finished Books</Link>
            </div>
        );
    }

    bookListContent() {
        let {book_lists, books, session} = this.props;
        let authenticated = session && session.token;
        let type = this.props.match.params.type;

        if (!book_lists) {
            return <div>You don't have any books in your wishlists yet!</div>
        }

        let thisList = _.filter(book_lists, (item) => {
            return item.type === type;
        });

        if (_.isEmpty(thisList)) {
            return <div>You don't have any books in your {type} list yet!</div>
        }

        if (_.isEmpty(books)) {
            return <div>Loading books...</div>;
        }


        let book_list_items = _.map(book_lists, (item) => {
            let book = _.find(books, (book) => {
                return book.id.toString() === item.book_id.toString();
            });
            return <BookCard
                key={book.id}
                book={book}
                book_lists={book_lists}
                authenticated={authenticated}
                session={session}
            />;
        });

        return (
            <div className="book-list">
                {book_list_items}
            </div>
        );
    }

    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        if (!authenticated) {
            return <Redirect to="/"/>;
        }


        return (
            <div className="book-lists">
                {this.bookListHeader(this.props.match.params.type)}
                <div className="content">
                    {this.bookListContent()}
                </div>
            </div>
        )

    }
}


export default connect((state) => {return {books: state.books, book_lists: state.book_lists, users: state.users, session: state.session}})(BookListPage);
