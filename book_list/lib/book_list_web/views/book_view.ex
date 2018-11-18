defmodule BookListWeb.BookView do
  use BookListWeb, :view
  alias BookListWeb.BookView

  def render("index.json", %{books: books}) do
    %{data: render_many(books, BookView, "book.json")}
  end

  def render("show.json", %{book: book}) do
    %{data: render_one(book, BookView, "book.json")}
  end

  def render("book.json", %{book: book}) do
    %{id: book.id,
      title: book.title,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      isbn: book.isbn,
      cover_url: book.cover_url,
      amazon_url: book.amazon_url}
  end
end