This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Pages

### Login Page
  - Simple login page with basic empty field validation and error handling.
  - Redirects to Search page on successful login
  - Did not have a token revalidation so I put in logic to redirect to the login if the request give a 401 response
### Search page
  - This has the core logic.
  - Utilized React Select for ease of use of multi filter select of breeds. Looks much better than having multiple options for select, and perfect for the time contraint.
  - Breed - Caching it on first load and login. 
  - Dog - Caching dog details and just retrieving dogs that aren't filled out

### Match Page
 - Match is done only once to save on requests everytime you go to match page. Only when you change the favorites do we redo a match

### Favorites Page
- Listing the favorites for ease of use and management vs trying to un favorite from the search


## Assumptions

- I timeboxed it so i can only used client side version to fetch the API. 

- The search by locations was not implemented due to the priorities to deliver an mvp. This can be a future update to add zipcode searching, 
-- If i was going to implement I would add a tab, Search by Breed or Search by Location that switches the tabs. It should function parallel, react select on the location vs the breed 


## Front End Utilities
- Utilized React, Nextjs 
- Zustand for simple state management across screens

## Optimizations
- Breed - Cached so we do not have to re request the data for every search page load
- Dog details was cached in zustand until the access runs out, then i reset it to empty
  - This makes it so that the data is not always requested. We only request the dogs that are not present in the current set. Maybe for edge cases where data changes, we can have a timestamp to check duration of each dog data to refresh, but given this exercise i assumed dog data will last the 1 hr and will not change.
 

# Takehome Test TODO:

X Landing Screen
- X Redirect to login if not authenticated
- X redirect to search if authenticated

X Login Screen
- X Name
- X Email

X Search (Logged in Screen)
- XLogout Button
  - XPOST /auth/logout
  - Xsent back to login screen
- X Search
  - XBy Breed
    - autocomplete on breeds??
  - X API: /dogs/breeds
    - breeds - an array of breeds
      zipCodes - an array of zip codes
      ageMin - a minimum age
      ageMax - a maximum age
  - X Update Paging count
    - Paging on searches limit to 10/25
  - X Order results by ascending/descenting
  - By Location - nice to have

X Match Screen
- get api of dogs that match breed

X Favorite Screen
- list of favorites
  - can untoggle listing
- go back to search
- go to matching

Other Todo:

XHeader/Footer Styling
  - X move logout to header/ footer
X Responsive Styling 
X clean up code

Todo Post MVP:
- Zip code Search?