import React from "react";
import BookListButton from './book_list_button';
import _ from "lodash";
import { Link } from "react-router-dom";
import api from "./api";



function BookCard(props) {
    let {book, session, authenticated, booklists} = props;
    let book_list = _.find(props.booklists, (item) => { return book.id === item.book_id && session.user_id === item.user_id.toString() });

    return <div className="book-card">
        <div className="cover-image">
        <Link to={"/books/" + book.id} onClick={() => api.fetch_reviews(book.id)}>
            <img className="cover" src={book.cover_url} alt={book.title}/>
        </Link>
        </div>
        <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <h4 className="book-author">{book.author}</h4>
            <p className="book-description">{book.description}</p>
            <div className="buttons">
                <a className="amazon-button" href={book.amazon_url}>Buy from Amazon</a>
                {<BookListButton
                    book_id={book.id}
                    user_id={session.user_id}
                    authenticated={authenticated}
                    book_list={book_list}
                />}
            </div>
        </div>
    </div>;
}

export default BookCard;