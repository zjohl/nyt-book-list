defmodule BookList.Books.Book do
  use Ecto.Schema
  import Ecto.Changeset


  schema "books" do
    field :amazon_url, :string
    field :author, :string
    field :cover_url, :string
    field :description, :string
    field :isbn, :string
    field :publisher, :string
    field :title, :string

    has_many :book_list, BookList.BookLists.BookList
    has_many :review, BookList.Reviews.Review

    timestamps()
  end

  @doc false
  def changeset(book, attrs) do
    book
    |> cast(attrs, [:title, :description, :author, :publisher, :isbn, :cover_url, :amazon_url])
    |> validate_required([:title, :description, :author, :publisher, :isbn, :cover_url, :amazon_url])
  end
end
