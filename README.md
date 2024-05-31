# Hello Fresh Backend

This is a modular e-commerce backend built for Hello Fresh App using Node.js, Express, and MongoDB. The backend is divided into five modules: Auth, User, Category, Product, and Order. Additionally, it utilizes AWS S3 for image storage, Nodemailer for email services, and Passport.js for authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Modules](#modules)
  - [Auth](#auth)
  - [User](#user)
  - [Category](#category)
  - [Product](#product)
  - [Order](#order)
- [Services](#services)
  - [AWS S3](#aws-s3)
  - [Nodemailer](#nodemailer)
  - [Passport.js](#passportjs)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- User management
- Product and category management
- Order processing
- Image upload and storage on AWS S3
- Email notifications using Nodemailer
- Secure authentication with Passport.js

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **AWS S3**: Cloud storage for images
- **Nodemailer**: Email sending service
- **Passport.js**: Authentication middleware

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahulshah63/ecommerce-be-node.git
   cd ecommerce-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration)).

4. Start the server:
   ```bash
   npm start
   ```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```env

#App
VERSIONING='v1'
NODE_ENV='development'
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
LOG_DIR="logs"
CREDENTIALS=1
LOG_FORMAT= "dev"
ORIGIN= "*"
SECRET= 'secret'
CLIENT_URL='http://localhost:3000'

#Auth
AUTH_JWT_ACCESS_TOKEN_SECRET_KEY="access@ecommerce"
AUTH_JWT_REFRESH_TOKEN_SECRET_KEY="refresh@ecommerce"
AUTH_JWT_FORGOT_PASSWORD_TOKEN_SECRET_KEY="forget@ecommerce"
GOOGLE_CLIENT_ID='93***'
GOOGLE_SECRET='GOCS***'

#AWS
AWS_BUCKET_CREATE=''
AWS_CREDENTIAL_KEY=''
AWS_CREDENTIAL_SECRET=''
AWS_REGION=''
AWS_S3_BUCKET=''
AWS_S3_REGION=''
AWS_S3_BASE_URL=''

#Email
AUTH_USER='rahul.shah@gmail.com'
FROM='Support team'
APP_URL='http://localhost:3000'
AUTH_PASSWORD='***'
```

## Modules

### Auth

Handles user authentication and authorization.

- **Endpoints**:
  - `POST /v1/auth/register`: Register a new user
  - `POST /v1/auth/google`: Register a google user
  - `POST /v1/auth/login`: Login a user
  - `GET /v1/auth/logout`: Logout a user
  - `GET /v1/auth/generate/token`: Generate a token
  - `GET /v1/auth/forgot-password`: Forget user
  - `GET /v1/auth/reset-password`: Reset password

### User

Manages user data.

- **Endpoints**:
  - `GET /v1/user/all`: Get all user
  - `GET /v1/user/me`: Get current user
  - `DELETE /v1/user/me`: Delete current user
  - `GET /v1/user/:id`: Get user by ID
  - `PUT /v1/user/:id`: Update user by ID
  - `DELETE /v1/user/:id`: Delete user by ID

### Category

Handles product categories.

- **Endpoints**:
  - `GET /v1/category/all`: Get all category
  - `POST /v1/category/create`: Create a new category
  - `GET /v1/category/:id`: Get category by ID
  - `PUT /v1/category/:id`: Update category by ID
  - `DELETE /v1/category/:id`: Delete category by ID

### Product

Manages products.

- **Endpoints**:
  - `GET /v1/product/all`: Get all product
  - `POST /v1/product/create`: Create a new product
  - `GET /v1/product/:id`: Get product by ID
  - `PUT /v1/product/:id`: Update product by ID
  - `DELETE /v1/product/:id`: Delete product by ID

### Order

Handles customer orders.

- **Endpoints**:
  - `GET /v1/order/all`: Get all order
  - `GET /v1/order/:id`: Get order by ID
  - `POST /v1/order/create`: Create a new order
  - `PUT /v1/order/:id`: Update order by ID
  - `DELETE /v1/order/:id`: Delete order by ID

## Services

### AWS S3

Used for storing product images. The S3 configuration is handled using the AWS SDK.

### Nodemailer

Used for sending emails such as order confirmations and password resets.

### Passport.js

Used for user authentication. Supports strategies for local authentication and other providers if needed.

## Usage

To interact with the API, use tools like Postman or cURL. Ensure you have set up the environment variables correctly and the server is running.

Example request to create a new product:
```bash
curl -X POST \
  http://localhost:3000/product \
  -H 'Content-Type: application/json' \
  -d '{
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "category": "Category ID"
      }'
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.