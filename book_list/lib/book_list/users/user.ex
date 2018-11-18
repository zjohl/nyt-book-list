defmodule BookList.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password_hash, :string

    has_many :book_list, BookList.BookLists.BookList
    has_many :review, BookList.Reviews.Review

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :first_name, :last_name])
    |> unique_constraint(:email)
    |> validate_required([:email, :password_hash, :first_name, :last_name])
  end
end
