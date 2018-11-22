defmodule BookList.ReviewServer do
  use GenServer

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
end
