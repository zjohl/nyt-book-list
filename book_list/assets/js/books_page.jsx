import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import Waypoint from 'react-waypoint';

import BookCard from './book_card';

class BooksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {page: 1};
    }

    getBooks() {
        api.fetch_books(this.state.page + 1);
        this.setState({page: this.state.page + 1})
    }

    render() {
        let {book_lists, books, session} = this.props;
        let authenticated = session && session.token;

        let bookCards = _.map(books, (book, ii) => {
            return (
                <React.Fragment key={ii}>
                    <BookCard
                        key={book.id}
                        book={book}
                        book_lists={book_lists}
                        authenticated={authenticated}
                        session={session}
                    />
                    {ii % 20 === 15 ? <Waypoint
                        onEnter={this.getBooks.bind(this)}
                    />: null }
                </React.Fragment>
            )});
        return <div className="index-books">
            {bookCards}
        </div>;
    }
    }

export default connect((state) => {return {books: state.books, users: state.users, session: state.session, book_lists: state.book_lists};})(BooksPage);
