defmodule BookListWeb.BookControllerTest do
  use BookListWeb.ConnCase

  alias BookList.Books
  alias BookList.Books.Book

  @create_attrs %{
    amazon_url: "some amazon_url",
    author: "some author",
    cover_url: "some cover_url",
    description: "some description",
    isbn: "some isbn",
    publisher: "some publisher",
    title: "some title"
  }
  @update_attrs %{
    amazon_url: "some updated amazon_url",
    author: "some updated author",
    cover_url: "some updated cover_url",
    description: "some updated description",
    isbn: "some updated isbn",
    publisher: "some updated publisher",
    title: "some updated title"
  }
  @invalid_attrs %{amazon_url: nil, author: nil, cover_url: nil, description: nil, isbn: nil, publisher: nil, title: nil}

  def fixture(:book) do
    {:ok, book} = Books.create_book(@create_attrs)
    book
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all books", %{conn: conn} do
      conn = get(conn, Routes.book_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create book" do
    test "renders book when data is valid", %{conn: conn} do
      conn = post(conn, Routes.book_path(conn, :create), book: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.book_path(conn, :show, id))

      assert %{
               "id" => id,
               "amazon_url" => "some amazon_url",
               "author" => "some author",
               "cover_url" => "some cover_url",
               "description" => "some description",
               "isbn" => "some isbn",
               "publisher" => "some publisher",
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.book_path(conn, :create), book: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update book" do
    setup [:create_book]

    test "renders book when data is valid", %{conn: conn, book: %Book{id: id} = book} do
      conn = put(conn, Routes.book_path(conn, :update, book), book: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.book_path(conn, :show, id))

      assert %{
               "id" => id,
               "amazon_url" => "some updated amazon_url",
               "author" => "some updated author",
               "cover_url" => "some updated cover_url",
               "description" => "some updated description",
               "isbn" => "some updated isbn",
               "publisher" => "some updated publisher",
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, book: book} do
      conn = put(conn, Routes.book_path(conn, :update, book), book: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete book" do
    setup [:create_book]

    test "deletes chosen book", %{conn: conn, book: book} do
      conn = delete(conn, Routes.book_path(conn, :delete, book))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.book_path(conn, :show, book))
      end
    end
  end

  defp create_book(_) do
    book = fixture(:book)
    {:ok, book: book}
  end
end
