defmodule BookList.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :content, :text, null: false
      add :user_id, references(:books, on_delete: :delete_all), null: false
      add :book_id, references(:books, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:reviews, [:user_id])
    create index(:reviews, [:book_id])
    create index(:reviews, [:book_id, :user_id], unique: true)

  end
end
