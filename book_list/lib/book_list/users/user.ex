defmodule BookList.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :password_hash, :string

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
