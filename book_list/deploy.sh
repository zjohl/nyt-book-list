#!/bin/bash

export MIX_ENV=prod
export PORT=4750

mix deps.get --only prod
mix ecto.create
mix ecto.migrate
MIX_ENV=prod mix compile
cd assets
npm install
node_modules/.bin/webpack --mode production
cd ..
mix phx.digest

MIX_ENV=prod mix release

_build/prod/rel/book_list/bin/book_list stop || true

_build/prod/rel/book_list/bin/book_list start

