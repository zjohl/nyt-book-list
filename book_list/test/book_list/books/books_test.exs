defmodule BookList.BooksTest do
  use BookList.DataCase

  alias BookList.Books

  describe "books" do
    alias BookList.Books.Book

    @valid_attrs %{amazon_url: "some amazon_url", author: "some author", cover_url: "some cover_url", description: "some description", isbn: "some isbn", publisher: "some publisher", title: "some title"}
    @update_attrs %{amazon_url: "some updated amazon_url", author: "some updated author", cover_url: "some updated cover_url", description: "some updated description", isbn: "some updated isbn", publisher: "some updated publisher", title: "some updated title"}
    @invalid_attrs %{amazon_url: nil, author: nil, cover_url: nil, description: nil, isbn: nil, publisher: nil, title: nil}

    def book_fixture(attrs \\ %{}) do
      {:ok, book} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Books.create_book()

      book
    end

    test "list_books/0 returns all books" do
      book = book_fixture()
      assert Books.list_books() == [book]
    end

    test "get_book!/1 returns the book with given id" do
      book = book_fixture()
      assert Books.get_book!(book.id) == book
    end

    test "create_book/1 with valid data creates a book" do
      assert {:ok, %Book{} = book} = Books.create_book(@valid_attrs)
      assert book.amazon_url == "some amazon_url"
      assert book.author == "some author"
      assert book.cover_url == "some cover_url"
      assert book.description == "some description"
      assert book.isbn == "some isbn"
      assert book.publisher == "some publisher"
      assert book.title == "some title"
    end

    test "create_book/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Books.create_book(@invalid_attrs)
    end

    test "update_book/2 with valid data updates the book" do
      book = book_fixture()
      assert {:ok, %Book{} = book} = Books.update_book(book, @update_attrs)
      assert book.amazon_url == "some updated amazon_url"
      assert book.author == "some updated author"
      assert book.cover_url == "some updated cover_url"
      assert book.description == "some updated description"
      assert book.isbn == "some updated isbn"
      assert book.publisher == "some updated publisher"
      assert book.title == "some updated title"
    end

    test "update_book/2 with invalid data returns error changeset" do
      book = book_fixture()
      assert {:error, %Ecto.Changeset{}} = Books.update_book(book, @invalid_attrs)
      assert book == Books.get_book!(book.id)
    end

    test "delete_book/1 deletes the book" do
      book = book_fixture()
      assert {:ok, %Book{}} = Books.delete_book(book)
      assert_raise Ecto.NoResultsError, fn -> Books.get_book!(book.id) end
    end

    test "change_book/1 returns a book changeset" do
      book = book_fixture()
      assert %Ecto.Changeset{} = Books.change_book(book)
    end
  end
end
