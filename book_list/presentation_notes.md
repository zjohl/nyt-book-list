# Presentation Notes

- Basic premise of app
    - Allows users to browse nyt bestsellers and add them to a wishlist
    - They can mark books as owned or finished
    - Can see other user's reviews, and leave reviews

- Demo
    - Browse books, show infinite scroll
    - Move books between lists
    - Show offline mode
    - Leave a review, have it appear in another browser window
    
- Tools and libraries
    - Httpoison to get books from the NYT api
    - Used a bunch of react libraries
        - react-alert for login alerts
        - react-waypoint for infinite scroll
    - workbox for automatically generated service worker
    
- What did I build
    - Didn't use bootstrap, had to do styles from scratch
        - Relatively new technology is css grid
    - Most of the complexity is on the front-end

- Major challenges
    - API is rate limited
        - Delayed 1 second between requests
        - Still took too long to get a lot of books
    - Had a hard time setting up a service worker
        - Learnt how to use webpack first, then the service worker was simple
        - Since we only have one js file, not a lot of gains
