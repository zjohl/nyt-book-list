import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import InfiniteScroll from 'react-infinite-scroller';

import BookCard from './book_card';

class BooksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {page: 1};
    }

    render() {
        let {book_lists, books, session} = this.props;
        let authenticated = session && session.token;
        let bookCards = _.map(books, (book) => <BookCard
            key={book.id}
            book={book}
            book_lists={book_lists}
            authenticated={authenticated}
            session={session}
        />);
        return <div className="index-books" ref={(ref) => this.scrollParentRef = ref}>
            {bookCards}
        </div>;
    }
    }

export default connect((state) => {return {books: state.books, users: state.users, session: state.session, book_lists: state.book_lists};})(BooksPage);
