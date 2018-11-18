defmodule BookListWeb.BookListView do
  use BookListWeb, :view
  alias BookListWeb.BookListView

  def render("index.json", %{book_lists: book_lists}) do
    %{data: render_many(book_lists, BookListView, "book_list.json")}
  end

  def render("show.json", %{book_list: book_list}) do
    %{data: render_one(book_list, BookListView, "book_list.json")}
  end

  def render("book_list.json", %{book_list: book_list}) do
    %{id: book_list.id,
      type: book_list.type,
      user_id: book_list.user_id,
      book_id: book_list.book_id}
  end
end
