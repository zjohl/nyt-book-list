import React from "react";
import api from "./api";

function BookListButton(props) {
    if(!props.authenticated) {
        return null;
    }

    function toggleBookList() {
        if(props.book_list) {
            api.delete_book_list_entry(props.book_list.id);
        } else {
            api.create_book_list_entry({
                book_list: {
                    type: "wishlist",
                    book_id: props.book_id,
                    user_id: props.user_id,
                }
            });
        }
    }

    function dropdown(e) {
        let button = e.target;
        if(button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }

    let onBooklist = !!props.book_list;

    let buttonText = "Add to Wishlist";
    if(onBooklist) {
        buttonText = "Added to Wishlist";
    }

    return (
        <div className={`booklist-button ${onBooklist ? "active" : ""}`}>
            <button onClick={toggleBookList}>{buttonText}</button>
            <button onClick={dropdown} className="dropdown">▼</button>
        </div>
    );
}

export default BookListButton;