defmodule BookList.Repo.Migrations.CreateBooks do
  use Ecto.Migration

  def change do
    create table(:books) do
      add :title, :string, null: false
      add :description, :text, null: false
      add :author, :string, null: false
      add :publisher, :string, null: false
      add :isbn, :string, null: false
      add :cover_url, :string, null: false
      add :amazon_url, :string, null: false

      timestamps()
    end

  end
end
