defmodule BookListWeb.ReviewsChannel do
  use BookListWeb, :channel

  alias BookListReviews.ReviewServer

  def join("reviews:" <> book_id, payload, socket) do
     socket = assign(socket, :book_id, book_id)
     view = ReviewServer.view(book_id)
     {:ok, %{"join" => book_id, "view" => view}, socket}
  end

  def handle_in("update",  %{"review" => review}, socket) do
    push socket, "update", %{"review" => review}
    {:noreply, socket}
  end
end