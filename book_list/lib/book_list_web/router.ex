defmodule BookListWeb.Router do
  use BookListWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api/v1", BookListWeb do
    pipe_through :api

    resources "/books", BookController, except: [:new, :edit]
    resources "/book_lists", BookListController, except: [:new, :edit]
    resources "/reviews", ReviewController, except: [:new, :edit]
    resources "/users", UserController, except: [:new, :edit]
  end

  scope "/", BookListWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/books/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", BookListWeb do
  #   pipe_through :api
  # end
end
