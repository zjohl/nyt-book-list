# NYT Bestsellers Wishlist

## Project Info

Team members: Zamir Johl

Deployed to: https://bestsellers.zamirjohl.com/

Github URL: https://github.com/zjohl/nyt-book-list

App Status: Deployed and running


## App Info

This is a single page app that allows users to add New York Times
bestsellers to different wishlists so they can manage their reading
progress. Users can browse books on the homepage and navigate to 
amazon to buy them, click on the book for more info, or add
them to a "book list". Each user has three book lists: wanted,
owned, and finished. Using the book list button component, they 
can easily switch books between those states. Additionally, users
can write and see reviews on the individual book pages.

The main divergence from my project proposal is that I found the 
api's rate limiting to be entirely impractical for looking up
new books on the fly. Instead, the books were queried ahead of 
time, so we didn't force the users to wait until we had found a 
new page of books. This was especially annoying because there
aren't actually that many books in the enpoint I used, so the
homepage is not as full as I had originally hoped. Other than 
that, I managed to implement all of the planned featured.

Feature-wise this app is fairly limited, but it has a reasonably
smooth UI and decently responsive styles. One of my main goals was 
to create an app without bootstrap. While I was sucessful, I found
that bootstrap is convenient partially because it makes decisions
about reasonable default for you. I ended up spending quite a bit 
of time working on the styles, largely because I didn't know what 
I wanted the app to look like. I felt I did a nice job separating
different react components, but I also should have isolated the 
styles so they were in a separate file per component.

My project implemented all of the major requirements. The app
has persistent user accounts, and I also store books, booklists
and reviews in postgres. I used the NYT bestsellers api, which 
required an API token for authentication, and is not accessed 
directly by the user. Phoenix channels are used to push reviews to 
other users. And since I was the only person working on this project,
 I contributed to all aspects of the code (and presentation).
 
I tried to add some unique front-end features to make this 
app more interesting to develop. As I mentioned above, I didn't use
bootstrap at all in this project. Instead the layouts are managed 
using either css-flex or css-grid. Grid allows for more complex 2d
layouts, but this app wasn't a super great place to showcase all of 
the new features since it was pretty simple. I also added pagination 
to the books enpoint using the Scrivener library, as well as infinite
scroll using a react library to set waypoints on the page. I was 
particularly proud of the inifinite scroll implementation as it's 
much lighter-weight than most react infinite scroll libraries. 
Finally, I added a service worker to cache assets so that the app 
will work offline. I was really excited about this technology, but I 
eventually realized that since my app doesn't require more page 
loads, the images are the only thing that could be cached as the user
navigates (and chrome does this by default).

Most of my app's logic was on the front-end, and the single most 
complex component is probably the wishlist button. This component can 
be used to add or remove a book from a user's booklists, but because 
it has a dropdown menu, it required quite a bit of styling and logic 
in order to have it function smoothly. I designed this component by
starting with the most basic behavior: clicking the button adds the 
book to the user's book list. Once I figured this out, I had the text 
change when the book had been added, and eventually a dropdown menu.
Because of the complexity of the logic, I needed to extract this 
button into its own component and turn it into a class instead of a 
function. Then it was simply a matter of making the original button 
more generic so it would cover all three book lists.

The most challenging part of this project was configuring webpack to 
enable the service worker. Initially, I used sw-precache and really 
struggled to figure out how to make the generated service worker
available to the app. Eventually I decided to use workbox instead, 
but the solution I came up with to organize compiled assets worked 
for both plugins. I found this to be the most frustrating part of 
this project because it took a really long time for me to wrap my
head around how webpack works. Once I got that far, I just needed
to look at the `priv/static/js` directory to figure out what 
the name of the service worker was. Once I added `/js/` to the file 
name, the plugin worked. 
