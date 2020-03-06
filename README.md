## Description

[Nest](https://github.com/nestjs/nest)/Mongo/Pug MVC CRUD demo app for Boston University CS602 - Server-Side Web Development term project. Hosted on [http://cs602-king.herokuapp.com](http://cs602-king.herokuapp.com)

### Functionality

[Accounts](http://cs602-king.herokuapp.com/user) switch between different types of demo users
  - Everyone can see users/impersonate users
  - Admin can create new users

[Products](http://cs602-king.herokuapp.com/product) with id, name, description, price, and available quantity
  - Everyone can see products, search products by text
  - Customers can order products
  - Admin can modify/delete products
  - XML and JSON api endpoints with any combination of q (text), min (price), max (price) query params, e.g.
    -  [http://cs602-king.herokuapp.com/product/xml?q=guitar](http://cs602-king.herokuapp.com/product/xml?q=guitar)
    -  [http://cs602-king.herokuapp.com/product/json?q=guitar&max=100](http://cs602-king.herokuapp.com/product/json?q=guitar&max=100)
    -  [http://cs602-king.herokuapp.com/product/xml?q=guitar&min=100](http://cs602-king.herokuapp.com/product/xml?q=guitar&min=100)
    -  [http://cs602-king.herokuapp.com/product/json?q=guitar&min=50&max=100](http://cs602-king.herokuapp.com/product/json?q=guitar&min=50&max=100)

[Cart](http://cs602-king.herokuapp.com/order/cart) (Customers only)
  - Customers can modify or delete pending orders here

[Order](http://cs602-king.herokuapp.com/order) (Customers only)
  - Customers can view finalized orders here

[Customers](http://cs602-king.herokuapp.com/user/customer) (Admin only)
  - Admin can view customers and modify/delete pending orders

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ nest start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## License

  Nest is [MIT licensed](LICENSE).
