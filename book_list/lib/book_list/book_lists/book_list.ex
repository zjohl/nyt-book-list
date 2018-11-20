defmodule BookList.BookLists.BookList do
  use Ecto.Schema
  import Ecto.Changeset


  schema "book_lists" do
    field :type, :string
    belongs_to :user, BookList.Users.User
    belongs_to :book, BookList.Books.Book

    timestamps()
  end

  @doc false
  def changeset(book_list, attrs) do
    book_list
    |> cast(attrs, [:type, :user_id, :book_id])
    |> unique_constraint([:user_id, :book_id])
    |> validate_required([:type, :user_id, :book_id])
  end
end
