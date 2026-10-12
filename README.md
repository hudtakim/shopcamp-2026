# ShopCamp.id

ShopCamp.id is a web-based marketplace prototype built with Express, EJS, MongoDB, and Passport. It supports product discovery and search, buyer checkout, seller product management, and transaction status updates through a server-rendered interface.

## Features

- Browse and search products, with product detail and image galleries.
- Register, log in, and log out using Passport Local.
- Add products to a shopping cart and submit delivery details at checkout.
- View invoices and transaction history.
- Manage seller products, including create, update, and delete actions.
- Update order status through the transaction flow.
- Responsive layouts for the product catalog, forms, navigation, and tables.

## Technology

- Node.js and Express 4
- EJS templates
- MongoDB with Mongoose 5
- Passport Local and `passport-local-mongoose`
- Bootstrap 4

## Requirements

- Node.js and npm
- MongoDB running locally on its default port (`27017`)

The models currently connect to three local MongoDB databases: `user_db`, `fintech_db`, and `expedition_db`. MongoDB creates each database when application data is first written.

## Getting started

1. Clone the repository and move into the project directory:

   ```bash
   git clone https://github.com/hudtakim/shopcamp-2026.git
   cd shopcamp-2026
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB. On Windows, MongoDB may be running as a service; otherwise, start `mongod` with a valid data directory.

4. Start the application:

   ```bash
   node app.js
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
.
├── app.js                 # Express app setup and route registration
├── models/                # Mongoose models, grouped by database
├── public/                # Stylesheets and static assets
├── routes/                # Marketplace, account, and transaction routes
├── views/                 # EJS pages and shared partials
├── package.json
└── README.md
```

## Main application flows

- **Buyer:** browse products → add to cart or buy → enter delivery details → select payment → view invoice and order status.
- **Seller:** register or log in → open the dashboard → create and manage products → process incoming transactions.

## Development notes

- The application listens on port `3000` in `app.js`.
- Product images are supplied as image URLs.
- The current MongoDB connection strings and session secret are configured directly in the source. Before deploying outside a local development environment, move secrets and database settings into environment variables and use a properly secured session configuration.
- `npm test` is a placeholder and does not currently run an automated test suite.
