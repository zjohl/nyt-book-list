defmodule BookListWeb.ReviewView do
  use BookListWeb, :view
  alias BookListWeb.ReviewView

  def render("index.json", %{reviews: reviews}) do
    %{data: render_many(reviews, ReviewView, "review.json")}
  end

  def render("show.json", %{review: review}) do
    %{data: render_one(review, ReviewView, "review.json")}
  end

  def render("review.json", %{review: review}) do
    %{id: review.id,
      content: review.content,
      user_id: review.user_id,
      book_id: review.book_id}
  end
end
