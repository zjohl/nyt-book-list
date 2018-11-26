defmodule BookList.Reviews.ReviewServer do
  use GenServer

  alias BookList.Reviews
  alias BookList.Reviews.Review

  def start_link(_args) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def view(book_id) do
    GenServer.call(__MODULE__, {:view, book_id})
  end

  ## Implementations
  def init(state) do
    {:ok, state}
  end

  def handle_call({:view, book_id}, _from, state) do
    reviews = Reviews.list_reviews(book_id)
    |> Enum.map(fn review ->
      %{id: review.id,
        content: review.content,
        user_id: review.user_id,
        book_id: review.book_id}
    end)
    {:reply, reviews, state}
  end
end
