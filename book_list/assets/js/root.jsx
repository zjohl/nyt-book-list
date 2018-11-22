import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import BookList from './books';
import BookPage from './book_page';
import AuthPage from './auth_page';
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
                    <Header />
                    <Route path="/" exact={true} render={(props) =>
                        <div className="page-content">
                            <BookList {...props}/>
                        </div>
                    }/>
                    <Route  path="/books/:id" render={(props) =>
                        <div className="page-content">
                            <BookPage {...props}/>
                        </div>
                    } />
                    <Route  path="/booklists/:type" render={(props) =>
                        <div className="page-content">
                            <BookListPage {...props}/>
                        </div>
                    } />
                    <Route  path="/signup" render={(props) =>
                        <div className="page-content">
                            <AuthPage {...props}/>
                        </div>
                    } />
                    <Route  path="/signin" render={(props) =>
                        <div className="page-content">
                            <AuthPage {...props}/>
                        </div>
                    } />
                </div>
            </Router>
        </div>;
    }
}
