defmodule BookListWeb.ReviewsChannel do
  use BookListWeb, :channel

  alias BookList.Reviews.ReviewServer

  def join("reviews:" <> book_id, payload, socket) do
     socket = assign(socket, :book_id, book_id)
     view = ReviewServer.view(book_id)
     {:ok, %{"join" => book_id, "reviews" => view}, socket}
  end

  def handle_in("update",  %{"reviews" => reviews}, socket) do
    broadcast!(socket, "update", %{ "reviews" => reviews})
    {:noreply, socket}
  end
end