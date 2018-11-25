defmodule BookList.Repo do
  use Ecto.Repo,
    otp_app: :book_list,
    adapter: Ecto.Adapters.Postgres
  use Scrivener, page_size: 20
end
