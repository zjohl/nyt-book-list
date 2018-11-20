defmodule BookList.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset


  schema "reviews" do
    field :content, :string
    belongs_to :user, BookList.Users.User
    belongs_to :book, BookList.Books.Book

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:content, :user_id, :book_id])
    |> unique_constraint([:user_id, :book_id])
    |> validate_required([:content, :user_id, :book_id])
  end
end
