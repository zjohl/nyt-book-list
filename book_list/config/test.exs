use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :book_list, BookListWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :book_list, BookList.Repo,
  username: "book_list",
  password: "postgres",
  database: "book_list_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
