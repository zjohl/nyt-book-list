defmodule BookList.BookListsTest do
  use BookList.DataCase

  alias BookList.BookLists

  describe "book_lists" do
    alias BookList.BookLists.BookList

    @valid_attrs %{type: "some type"}
    @update_attrs %{type: "some updated type"}
    @invalid_attrs %{type: nil}

    def book_list_fixture(attrs \\ %{}) do
      {:ok, book_list} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BookLists.create_book_list()

      book_list
    end

    test "list_book_lists/0 returns all book_lists" do
      book_list = book_list_fixture()
      assert BookLists.list_book_lists() == [book_list]
    end

    test "get_book_list!/1 returns the book_list with given id" do
      book_list = book_list_fixture()
      assert BookLists.get_book_list!(book_list.id) == book_list
    end

    test "create_book_list/1 with valid data creates a book_list" do
      assert {:ok, %BookList{} = book_list} = BookLists.create_book_list(@valid_attrs)
      assert book_list.type == "some type"
    end

    test "create_book_list/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BookLists.create_book_list(@invalid_attrs)
    end

    test "update_book_list/2 with valid data updates the book_list" do
      book_list = book_list_fixture()
      assert {:ok, %BookList{} = book_list} = BookLists.update_book_list(book_list, @update_attrs)
      assert book_list.type == "some updated type"
    end

    test "update_book_list/2 with invalid data returns error changeset" do
      book_list = book_list_fixture()
      assert {:error, %Ecto.Changeset{}} = BookLists.update_book_list(book_list, @invalid_attrs)
      assert book_list == BookLists.get_book_list!(book_list.id)
    end

    test "delete_book_list/1 deletes the book_list" do
      book_list = book_list_fixture()
      assert {:ok, %BookList{}} = BookLists.delete_book_list(book_list)
      assert_raise Ecto.NoResultsError, fn -> BookLists.get_book_list!(book_list.id) end
    end

    test "change_book_list/1 returns a book_list changeset" do
      book_list = book_list_fixture()
      assert %Ecto.Changeset{} = BookLists.change_book_list(book_list)
    end
  end
end
