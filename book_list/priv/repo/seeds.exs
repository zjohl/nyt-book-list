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

# http://developer.nytimes.com/books_api.json#/Console/GET/lists/overview.%7Bformat%7D

Repo.insert!(%Book{title: "PAST TENSE",
  description: "Jack Reacher explores the New England town where his father was born and a Canadian couple now find themselves stranded.",
  author: "Annette Gordon-Reed and Peter S Onuf",
  publisher: "Delacorte",
  isbn: "0399593519",
  amazon_url: "https://s1.nyt.com/du/books/images/9780399593512.jpg",
  cover_url: "https://www.amazon.com/Past-Tense-Jack-Reacher-Novel/dp/0399593519?tag=NYTBS-20"})

Repo.insert!(%Book{title: "NINE PERFECT STRANGERS",
  description: "A romance writer becomes fascinated by the owner and director of a health resort.",
  author: "Liane Moriarty",
  isbn: "125006984X",
  publisher: "Flatiron",
  cover_url:  "https://s1.nyt.com/du/books/images/9781250069849.jpg",
  amazon_url: "https://www.amazon.com/Nine-Perfect-Strangers-Liane-Moriarty-ebook/dp/B07C75GRLY?tag=NYTBS-20"})

Repo.insert!(%Book{title: "THE RECKONING",
  description: "A decorated World War II veteran shoots and kills a pastor inside a Mississippi church.",
  author: "John Grisham",
  isbn: "0385544154",
  publisher: "Doubleday",
  cover_url: "https://s1.nyt.com/du/books/images/9780385544160.jpg",
  amazon_url: "https://www.amazon.com/Reckoning-Novel-John-Grisham-ebook/dp/B079DBS447?tag=NYTBS-20"})

Repo.insert!(%Book{title: "DARK SACRED NIGHT",
  description: "Detective Renée Ballard teams up with the retired detective Harry Bosch, who is working on a cold case.",
  author: "Michael Connelly",
  isbn: "0316484806",
  publisher: "Little, Brown",
  cover_url: "https://s1.nyt.com/du/books/images/9780316486675.jpg",
  amazon_url: "https://www.amazon.com/Sacred-Night-Ballard-Bosch-Novel-ebook/dp/B0796R3RR4?tag=NYTBS-20"})
