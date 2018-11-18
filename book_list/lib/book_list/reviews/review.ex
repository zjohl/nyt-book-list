defmodule BookList.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset


  schema "reviews" do
    field :content, :string
    field :user_id, :id
    field :book_id, :id

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end
