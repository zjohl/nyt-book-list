defmodule BookList.Repo.Migrations.CreateBookLists do
  use Ecto.Migration

  def change do
    create table(:book_lists) do
      add :type, :string, null: false
      add :user_id, references(:books, on_delete: :delete_all), null: false
      add :book_id, references(:books, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:book_lists, [:user_id])
    create index(:book_lists, [:book_id])
  end
end
