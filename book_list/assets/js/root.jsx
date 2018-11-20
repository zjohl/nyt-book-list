import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import BookList from './books';
import BookPage from './book_page';
import BookListPage from './book_list_page';
import Header from './header';

export default function root_init(node, store) {
    let books = window.books;
    ReactDOM.render(
        <Provider store={store}>
            <Root books={books} />
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);

        api.get_session();
        api.fetch_books();
        api.fetch_users();
    }

    render() {
        return <div>
            <Router>
                <div>
                    <Header/>
                    <Route path="/" exact={true} render={() =>
                        <div className="page-content">
                            <BookList />
                        </div>
                    }/>
                    <Route  path="/books/:id" component={BookPage} />
                    <Route  path="/booklists/:type" component={BookListPage} />
                </div>
            </Router>
        </div>;
    }
}
