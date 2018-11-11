defmodule BookList.Repo do
  use Ecto.Repo,
    otp_app: :book_list,
    adapter: Ecto.Adapters.Postgres
end
