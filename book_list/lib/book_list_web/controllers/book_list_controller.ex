defmodule BookListWeb.BookListController do
  use BookListWeb, :controller

  alias BookList.BookLists
  alias BookList.BookLists.BookList

  action_fallback BookListWeb.FallbackController

  def index(conn, _params) do
    book_lists = BookLists.list_book_lists()
    render(conn, "index.json", book_lists: book_lists)
  end

  def create(conn, %{"book_list" => book_list_params, "token" => token}) do
    result = Phoenix.Token.verify(BookListWeb.Endpoint, "user_id", token, max_age: 86400)

    case result do
      {:ok, _} ->
        with {:ok, %BookList{} = book_list} <- BookLists.create_book_list(book_list_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.book_list_path(conn, :show, book_list))
          |> render("show.json", book_list: book_list)
        end
      _ ->
        conn
        |> put_status(:not_authorized)
    end
  end

  def show(conn, %{"id" => id}) do
    book_list = BookLists.get_book_list!(id)
    render(conn, "show.json", book_list: book_list)
  end

  def update(conn, %{"id" => id, "book_list" => book_list_params}) do
    book_list = BookLists.get_book_list!(id)

    with {:ok, %BookList{} = book_list} <- BookLists.update_book_list(book_list, book_list_params) do
      render(conn, "show.json", book_list: book_list)
    end
  end

  def delete(conn, %{"id" => id}) do
    book_list = BookLists.get_book_list!(id)

    with {:ok, %BookList{}} <- BookLists.delete_book_list(book_list) do
      send_resp(conn, :no_content, "")
    end
  end
end
