# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker.Repo.insert!(%TaskTracker.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias BookList.Repo
alias BookList.Users.User

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{first_name: "Zamir", last_name: "Johl", email: "zamir@johl.com", password_hash: pwhash})
Repo.insert!(%User{first_name: "Boo", last_name: "Radley", email: "boo@radley.com", password_hash: pwhash})

alias BookList.Books.Book

HTTPoison.start
resp = HTTPoison.get! "https://api.nytimes.com/svc/books/v3/lists/2018-11-18/hardcover-fiction.json?api-key=b0f13f75c1a94540a912b68d7cb5a953"

body = Jason.decode!(resp.body)

books = body["results"]["books"]

Enum.each(books, fn(book) ->
  Repo.insert!(%Book{title: book["title"],
    description: book["description"],
    author: book["author"],
    isbn: book["primary_isbn10"],
    publisher: book["publisher"],
    cover_url:  book["book_image"],
    amazon_url: book["amazon_product_url"]})
end)




alias BookList.Reviews.Review


Repo.insert!(%Review{
  user_id: 1,
  book_id: 1,
  content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
})