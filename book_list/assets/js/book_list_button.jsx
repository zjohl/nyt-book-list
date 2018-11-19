import React from "react";
import api from "./api";

function BookListButton(props) {
    if(!props.authenticated) {
        return null;
    }

    function toggleBookList(e) {
        let type = e.target.dataset["type"];

        if(props.book_list) {
            let prevType = props.book_list.type;

            if(prevType === type) {
                api.delete_book_list_entry(props.book_list.id);
            } else {
                api.update_book_list_entry(props.book_list.id, {
                    book_list: {
                        type: type,
                        book_id: props.book_list.book_id,
                        user_id: props.book_list.user_id,
                    }
                });
            }
        } else {
            api.create_book_list_entry({
                book_list: {
                    type: type,
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

    let types = ["wanted", "owned", "finished"];

    let mainButtonText = "Add to wanted list";
    let mainButtonType = "wanted"
    if(onBooklist) {
        mainButtonText = `Added to ${props.book_list.type} list`;
        mainButtonType = props.book_list.type;
    }

    function otherButtons() {
        let otherTypes = _.reject(types, (type) => { return type == mainButtonType });
        return _.map(otherTypes, (type) => {
            return (
            <button key={type} onClick={toggleBookList} className="dropdown-option" data-type={type}>
                {`Add to ${type} list`}
            </button>
            );
        });
    }

    return (
        <div className={`booklist-button ${onBooklist ? "active" : ""}`}>
            <button onClick={toggleBookList} className="button" data-type={mainButtonType}>{mainButtonText}</button>
            <button onClick={dropdown} className="dropdown">▼</button>
            <ul className="dropdown-options">
                {otherButtons()}
            </ul>
        </div>
    );
}

export default BookListButton;