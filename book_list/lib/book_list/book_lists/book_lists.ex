defmodule BookList.BookLists do
  @moduledoc """
  The BookLists context.
  """

  import Ecto.Query, warn: false
  alias BookList.Repo

  alias BookList.BookLists.BookList

  @doc """
  Returns the list of book_lists.

  ## Examples

      iex> list_book_lists()
      [%BookList{}, ...]

  """
  def list_book_lists(user_id) do
    Repo.all(from bl in BookList, where: bl.user_id == ^user_id)
  end

  @doc """
  Gets a single book_list.

  Raises `Ecto.NoResultsError` if the Book list does not exist.

  ## Examples

      iex> get_book_list!(123)
      %BookList{}

      iex> get_book_list!(456)
      ** (Ecto.NoResultsError)

  """
  def get_book_list!(id), do: Repo.get!(BookList, id)

  @doc """
  Creates a book_list.

  ## Examples

      iex> create_book_list(%{field: value})
      {:ok, %BookList{}}

      iex> create_book_list(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_book_list(attrs \\ %{}) do
    %BookList{}
    |> BookList.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a book_list.

  ## Examples

      iex> update_book_list(book_list, %{field: new_value})
      {:ok, %BookList{}}

      iex> update_book_list(book_list, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_book_list(%BookList{} = book_list, attrs) do
    book_list
    |> BookList.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a BookList.

  ## Examples

      iex> delete_book_list(book_list)
      {:ok, %BookList{}}

      iex> delete_book_list(book_list)
      {:error, %Ecto.Changeset{}}

  """
  def delete_book_list(%BookList{} = book_list) do
    Repo.delete(book_list)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking book_list changes.

  ## Examples

      iex> change_book_list(book_list)
      %Ecto.Changeset{source: %BookList{}}

  """
  def change_book_list(%BookList{} = book_list) do
    BookList.changeset(book_list, %{})
  end
end
