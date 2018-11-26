defmodule BookListWeb.ReviewsChannel do
  use BookListWeb, :channel

  alias BookList.Reviews.ReviewServer

  def join("reviews:" <> book_id, payload, socket) do
     socket = assign(socket, :book_id, book_id)
     view = ReviewServer.view(book_id)
     {:ok, %{"join" => book_id, "reviews" => view}, socket}
  end

  def handle_in("update",  %{"reviews" => reviews}, socket) do
    view = ReviewServer.view(socket.assigns[:book_id])
    broadcast!(socket, "update", %{ "reviews" => view})
    {:noreply, socket}
  end
end