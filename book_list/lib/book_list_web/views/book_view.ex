defmodule BookListWeb.BookView do
  use BookListWeb, :view
  alias BookListWeb.BookView

  def render("index.json", %{books: books,
    page_number: page_number,
    page_size: page_size,
    total_pages: total_pages,
    total_entries: total_entries
  }) do
    %{data: render_many(books, BookView, "book.json",
      page_number: page_number,
      page_size: page_size,
      total_pages: total_pages,
      total_entries: total_entries)}
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
