use Mix.Config

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.
#
# Note we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the `mix phx.digest` task,
# which you should run after static files are built and
# before starting your production server.
config :book_list, BookListWeb.Endpoint,
  server: true,
  root: ".",
  version: Application.spec(:phoenix_distillery, :vsn),
  http: [:inet6, port: System.get_env("PORT") || 4000],
  url: [host: "bestsellers.zamirjohl.com", port: 443, scheme: "https"],
  cache_static_manifest: "priv/static/cache_manifest.json"

# Do not print debug messages in production
config :logger, level: :info

# Function to manage secrets from Nat's lecture notes
get_secret = fn name ->
  base = Path.expand("~/.config/book_list")
  File.mkdir_p!(base)
  path = Path.join(base, name)
  unless File.exists?(path) do
    secret = Base.encode16(:crypto.strong_rand_bytes(32))
    File.write!(path, secret)
  end
  String.trim(File.read!(path))
end


config :book_list, BookListWeb.Endpoint,
       secret_key_base: get_secret.("key_base")

# Configure your database
config :book_list, BookList.Repo,
       username: "book_list_db",
       password: get_secret.("db_pass"),
       database: "book_list_prod",
       pool_size: 15
