defmodule BookListWeb.BookListControllerTest do
  use BookListWeb.ConnCase

  alias BookList.BookLists
  alias BookList.BookLists.BookList

  @create_attrs %{
    type: "some type"
  }
  @update_attrs %{
    type: "some updated type"
  }
  @invalid_attrs %{type: nil}

  def fixture(:book_list) do
    {:ok, book_list} = BookLists.create_book_list(@create_attrs)
    book_list
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all book_lists", %{conn: conn} do
      conn = get(conn, Routes.book_list_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create book_list" do
    test "renders book_list when data is valid", %{conn: conn} do
      conn = post(conn, Routes.book_list_path(conn, :create), book_list: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.book_list_path(conn, :show, id))

      assert %{
               "id" => id,
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.book_list_path(conn, :create), book_list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update book_list" do
    setup [:create_book_list]

    test "renders book_list when data is valid", %{conn: conn, book_list: %BookList{id: id} = book_list} do
      conn = put(conn, Routes.book_list_path(conn, :update, book_list), book_list: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.book_list_path(conn, :show, id))

      assert %{
               "id" => id,
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, book_list: book_list} do
      conn = put(conn, Routes.book_list_path(conn, :update, book_list), book_list: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete book_list" do
    setup [:create_book_list]

    test "deletes chosen book_list", %{conn: conn, book_list: book_list} do
      conn = delete(conn, Routes.book_list_path(conn, :delete, book_list))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.book_list_path(conn, :show, book_list))
      end
    end
  end

  defp create_book_list(_) do
    book_list = fixture(:book_list)
    {:ok, book_list: book_list}
  end
end
