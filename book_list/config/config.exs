# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :book_list,
  ecto_repos: [BookList.Repo]

# Configures the endpoint
config :book_list, BookListWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iYzkhxaQY21Z66eRQIVMpJLVPFVe3/h2Z+fNAsOWft1Ct0FCVfOSCyccMG5t+A/t",
  render_errors: [view: BookListWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: BookList.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
