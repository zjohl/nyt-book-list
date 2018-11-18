import store from './store';
import Cookies from 'js-cookie';

class Server {
    get_session() {
        let token = Cookies.get('token');
        let user_id = Cookies.get('user_id');
        if (token && user_id) {
            store.dispatch({
                type: 'NEW_SESSION',
                data: {token: token, user_id: user_id},
            });
        }
    }

    fetch_path(path, callback) {
        $.ajax(path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: callback,
        });
    }

    fetch_books() {
        this.fetch_path(
            "/api/v1/books",
            (resp) => {
                store.dispatch({
                    type: 'BOOKS',
                    data: resp.data,
                });
            }
        );
    }

    fetch_users() {
        this.fetch_path(
            "/api/v1/users",
            (resp) => {
                store.dispatch({
                    type: 'USER_LIST',
                    data: resp.data,
                });
            }
        );
    }

    create_user(user_data) {
        $.ajax("/api/v1/users/", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(user_data),
            success: (resp) => {
                this.fetch_users();
            }
        });
    }

    send_post(path, data, callback) {
        $.ajax(path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
        });
    }

    create_session(email, password) {
        this.send_post(
            "/api/v1/sessions",
            {email, password},
            (resp) => {
                Cookies.set('token', resp.data.token, { expires: 7 });
                Cookies.set('user_id', resp.data.user_id, { expires: 7 });
                store.dispatch({
                    type: 'NEW_SESSION',
                    data: resp.data,
                });
            }
        );
    }

    delete_session() {
        Cookies.remove('token');
        Cookies.remove('user_id');
        store.dispatch({type: 'CLEAR_SESSION'});
    }
}

export default new Server();