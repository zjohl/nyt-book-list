import React from "react";

function BookCard(props) {
    let {book} = props;
    return <div className="book-card">
        <div className="cover-image">
        <a href={"/books/" + book.id}>
            <img className="cover" src={book.cover_url} alt={book.title}/>
        </a>
        </div>
        <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <h4 className="book-author">{book.author}</h4>
        </div>
    </div>;
}

export default BookCard;