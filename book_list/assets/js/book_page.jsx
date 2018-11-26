import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import socket from "./socket";
import api from './api';
import BookListButton from './book_list_button';
import store from "./store";
import { withRouter } from 'react-router-dom'


class BookPage extends React.Component {
    constructor(props) {
        super(props);

        if(props.match) {
            socket.connect();
            this.channel = socket.channel("reviews:" + props.match.params.id, {});

            this.channel.join()
                .receive("ok", this.receiveView.bind(this));
            this.channel.on("update", this.receiveView.bind(this));
        }
    }

    createReview() {
        let authenticated = this.props.session && this.props.session.token;
        if(!authenticated) {
            this.props.history.push(`/signup`)
        } else {
            let reviewTextbox = $("#review");
            let book_id = this.props.match.params.id;
            let review = {
                content: reviewTextbox.val(),
                book_id: book_id,
                user_id: this.props.session.user_id,
            };
            api.create_review({review});
            reviewTextbox.val("");
            this.channel.push("update", { reviews: _.concat(this.props.reviews, review) }
            ).receive("ok", this.receiveView.bind(this));
        }
    }

    receiveView(view) {
        store.dispatch({
            type: 'REVIEWS',
            data: view.reviews,
        });
    }

    reviews(reviews, users) {
        if(_.isEmpty(users) || _.isEmpty(reviews)) {
            return <p>No reviews yet</p>;
        }

        return _.map(reviews, (review, ii) => {
            let user = _.find(users, (user) => {
                return user.id.toString() === review.user_id.toString();
            });

            return <div key={ii}>
                <p>{user.first_name} said:</p>
                <p className="review-content">{review.content}</p>
            </div>
        })
    }

    newReviewForm(hasReview) {
        if(hasReview) {
            return null;
        }

        return (
            <div className="new-review">
                <textarea id="review" name="review" minLength="1" spellCheck="true"
                          rows="5" cols="33" placeholder="Leave a review">
                </textarea>
                <button className="review-button button" onClick={this.createReview.bind(this)}>Submit review</button>
            </div>
        );
    }

    reviewContent(reviews, book, users, user_id) {
        let hasReview = _.some(reviews, (review) =>{
            return review.book_id.toString() === book.id.toString() && review.user_id.toString() === user_id.toString();
        });

        return (
            <div>
                {this.newReviewForm(hasReview)}
                {this.reviews(reviews, users)}
            </div>
        )
    }

    render() {
        let {session} = this.props;
        let authenticated = session && session.token;

        let id = this.props.match.params.id;
        let book = _.find(this.props.books, (book) => {
            return book.id.toString() === id.toString();
        });
        if (!book) {
            return null;
        }

        let book_list = _.find(this.props.book_lists, (item) => {
            return id.toString() === item.book_id.toString() && session.user_id.toString() === item.user_id.toString();
        });

        return <div className="book">
            <div className="book-content">
                <div className="cover-image">
                    <img className="cover" src={book.cover_url} alt={book.title}/>
                </div>
                <div className="book-details">
                    <h2 className="book-title">{book.title}</h2>
                    <h3 className="book-author">Written by: {book.author}</h3>
                    <p className="book-description">{book.description}</p>
                    <p className="book-publisher">Publisher: {book.publisher}</p>
                    <p className="book-isbn">Isbn: {book.isbn}</p>
                    <div className="buttons">
                        <a className="amazon-button" href={book.amazon_url}>Buy from Amazon</a>
                        {<BookListButton
                            book_id={id}
                            user_id={authenticated ? session.user_id : null}
                            authenticated={authenticated}
                            book_list={book_list}
                        />}
                    </div>
                </div>
                <div className="reviews">
                    <h2>Reviews</h2>
                    {this.reviewContent(
                        this.props.reviews,
                        book,
                        this.props.users,
                        authenticated ? session.user_id : 0,
                    )}
                </div>
            </div>
        </div>;
    };
}


export default connect((state) => {return {reviews: state.reviews, book_lists: state.book_lists, books: state.books, users: state.users, session: state.session};})(withRouter(BookPage));
