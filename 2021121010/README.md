# Canteen Portal

## Dockerizing the WebApp

### Run and Build Instructions 

* Create and start the docker containers using

```
docker-compose up
```

and head to `http://localhost` for the webapp (frontend) and `http://localhost/api/` for the webapp (backend).

**Note:** Some protected routes on the backend such as `/vendor` and `/buyer` will show error saying `please login to access this page` when directly accessed from browser using the `/api` URI (because of the JWT authorization header).

* For build, use

```
docker-compose build
```

### Files added 

#### ./backend/.dockerignore and ./frontend/.dockerignore

`.dockerignore` files to ignore `node_modules/` folder and `build/` folder (in `frontend/`) while running the `COPY` instruction in the Dockerfile.

#### Dockerfile (frontend)

Using node (version 16) alpine base image, we first install the node modules (clean install). Then we build the frontend (for production) using `npm run build`. Now using `serve` npm package, we host the frontend on a static server.

#### Dockerfile (backend)

Using node (version 16) alpine base image, we first install the node modules (clean install). Then we host the backend using `npm start`

#### nginx folder

Our nginx folder contains two files, `local.conf` and a `Dockerfile`.

**local.conf**

Nginx Configuration for routing "/" requests to frontend and "/api" requests to backend.

**Dockerfile**

Docker instruction to create an nginx container that uses `local.conf` configuration. 

#### docker-compose.yml

Contains configuration to start all four containers (frontend, database/mongo, backend and nginx) and connect them using `networks`.

**Note:** We have used `volumes` in our database for persistent storage.

### Changes made to assignment-1 code

#### Production Changes

1. **index.js**

    The connection string for `mongoose` is changed from localhost i.e., `127.0.0.1` to `mongo` (service name for the database in the docker-compose.yml file).

2. **axiosConfig.js**

    The baseURL for axios has been changed from `localhost:4000` to just `/api` (nginx configuration let's us redirect all backend calls on `/api`).

#### Bug Fix

Some changes were made in order ratings on the buyer's side. The changes include removing `default` and `required` in the `rating` field in `Order` model. And adding some more conditions in the `Orders.js` react component. 

## Running the WebApp

* Run Mongo daemon:
```
mongosh
```
Mongo will be running on port 27017.

* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## Features not implemented 

- No edit option in profile pages (for both vendor and buyer).
- Searching and Filtering features, on Buyer Dashboard, not done.
- Favourites tab on buyer dashboard not implemented.
- Unavailable items may not show at the end of the item list.
- Add items (for Vendor) not implemented in frontend (is implemented in the backend).
- Edit items (for Vendor) not implemented.

## Registration (Home page) and Login

The home page of my webpage is the registration page, where the end-user can choose the user type (Vendor/Buyer) and accordingly fill and register himself/herself on the portal.

**For buyer credientials we assume the buyer's age follows** `age > 0 and age < 120`.

The login page has three fields: User Type, Email and Password and, will redirect to the respective User-Type (Buyer/Vendor) Dashboard, on successful login.

Email validation is done through the npm package `validator` and password is encrypted (using package `bcryptjs`) before storing onto the database. Also, on login the client is JWT authorized for further pages.

Appropriate error/success messages are also displayed on both pages depending on input fields.

Access to private pages (Vendor and Buyer specific pages) has been protected by middlewares. If the user is not authorized, then he/she will be redirected to login page.

## Not found page

For any url that returns a 404 request (for our web app), we will redirect to our Not Found page.

## Buyer Use Cases

Buyer has three webpages:

### Dashboard

Here the wallet information is shown along with a button to add more money to it. It will show alerts on invalid input.

This page displays all the food items (for all Vendors).
Here, each food item will either have an unavailable status (depending on time) or will have a buy button, along with a field to set quantity of the item and multiselect for the addons associated with the food item as well.

**The cost of each order on purchase is computed as**
```
cost = quantity * food_item_price + (price of selected addons)
```

On successful purchase, the cost (calculated as above) is deducted from the wallet. Appropriate error messages are shown if there is insufficent amount etc.

If the order is rejected then the money will be returned back to the wallet (will update on reloading the page).

### Profile Page

Profile Page displays the details filled by user on registration. Wallet is also shown.

We do not show the password field for the profile page (for both vendor and buyer).

### My Orders Page

This page shows all the orders (for this buyer) with their details and status. For completed orders, there is feature to add ratings. For ready to pickup orders, there is feature: a button stating `picked up`. On clicking it, the status of the order changes to `completed` and rating feature is shown, for the user to rate the order. 

**In order details, the vendor name displayed for each order, is assumed to be the shop name of the respective vendor.**

## Vendor Use Cases

**In vendor's use cases we have assumed that each food item, for a particular vendor, will have a unique food item name.**

### Dashboard

Dashboard displays food item details for this vendor. Each item card has a delete button, that will delete that food item, for the vendor.

### Profile Page

Similar as Buyer's Profile Page

### Orders Page

Here, orders issued to this vendor, will be displayed with their corresponding status.

For placed orders, they can be rejected or moved to the next stage.
The placed orders can be moved upto the ready for pickup stage. After which, when the respective buyer picks the order up, the status will be updated to completed. 

The constraint that max ten orders can be in accepted or cooking stage has been implemented (and appropriate error message is shown as well).

### Statistics page

- Placed Orders: Total orders issued to the vendor
- Pending Orders: Orders that have not been rejected or completed
- Completed Orders: Orders that have been completed

For top 5 items sold, we compare each item based on the number of completed orders for those items. Sorting is done according to this comparison and top 5 items sold, are displayed.
