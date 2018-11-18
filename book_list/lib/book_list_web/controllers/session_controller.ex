defmodule BookListWeb.SessionController do
  use BookListWeb, :controller
  alias BookList.Users.User
  alias BookList.Users

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(BookListWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end