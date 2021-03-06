defmodule BookListWeb.ReviewController do
  use BookListWeb, :controller

  alias BookList.Reviews
  alias BookList.Reviews.Review

  action_fallback BookListWeb.FallbackController

  def index(conn,  %{"book_id" => book_id}) do
    reviews = Reviews.list_reviews(book_id)
    render(conn, "index.json", reviews: reviews)
  end

  def create(conn, %{"review" => review_params, "token" => token}) do
    result = Phoenix.Token.verify(BookListWeb.Endpoint, "user_id", token, max_age: 86400)

    case result do
      {:ok, _} ->
        with {:ok, %Review{} = review} <- Reviews.create_review(review_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.review_path(conn, :show, review))
          |> render("show.json", review: review)
        end
      _ ->
        conn
        |> put_status(:not_authorized)
    end
  end

  def show(conn, %{"id" => id}) do
    review = Reviews.get_review!(id)
    render(conn, "show.json", review: review)
  end

  def update(conn, %{"id" => id, "review" => review_params}) do
    review = Reviews.get_review!(id)

    with {:ok, %Review{} = review} <- Reviews.update_review(review, review_params) do
      render(conn, "show.json", review: review)
    end
  end

  def delete(conn, %{"id" => id}) do
    review = Reviews.get_review!(id)

    with {:ok, %Review{}} <- Reviews.delete_review(review) do
      send_resp(conn, :no_content, "")
    end
  end
end
