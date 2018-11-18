defmodule BookList.BookLists.BookList do
  use Ecto.Schema
  import Ecto.Changeset


  schema "book_lists" do
    field :type, :string
    field :user_id, :id
    field :book_id, :id

    timestamps()
  end

  @doc false
  def changeset(book_list, attrs) do
    book_list
    |> cast(attrs, [:type])
    |> validate_required([:type])
  end
end
