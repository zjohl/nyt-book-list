import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import api from './api';
import BookListButton from './book_list_button';




class BookPage extends React.Component {
    constructor(props) {
        super(props);

        if(props.match) {
            api.fetch_reviews(props.match.params.id);
        }
    }

    createReview() {
        let reviewTextbox = $("#review")
        api.create_review({
            review: {
                content: reviewTextbox.val(),
                book_id: this.props.match.params.id,
                user_id: this.props.session.user_id,
            }
        });
        reviewTextbox.val("");
    }

    reviews(reviews, users) {
        if(_.isEmpty(users) || _.isEmpty(reviews)) {
            return <p>No reviews yet</p>;
        }

        return _.map(reviews, (review) => {
            let user = _.find(users, (user) => {
                return user.id == review.user_id;
            })

            return <div key={review.id}>
                <p>{user.first_name} said:</p>
                <p>{review.content}</p>
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
            return review.book_id === book.id && review.user_id.toString() === user_id;
        })

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
            return book.id.toString() === id
        });
        if (!book) {
            return null;
        }

        let book_list = _.find(this.props.book_lists, (item) => {
            return id === item.book_id.toString() && session.user_id === item.user_id.toString()
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
                            user_id={session.user_id}
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


export default connect((state) => {return {reviews: state.reviews, book_lists: state.book_lists, books: state.books, users: state.users, session: state.session};})(BookPage);
