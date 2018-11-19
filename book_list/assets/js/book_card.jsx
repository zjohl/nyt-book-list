import React from "react";

function BookCard(props) {
    let {book} = props;
    return <div className="book-card">
        <div className="book-content">
            <a href={"/books/" + book.id}>
                <img className="cover-img" src={book.cover_url} alt={book.title}/>
            </a>
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">{book.author}</h3>
        </div>
    </div>;
}

export default BookCard;