# books-rest-api

books-rest-api is a local development REST API built with Node.js, Express, and MongoDB. It provides CRUD operations for managing books and follows a Model Repository architecture with centralized error handling and request validation.

## Overview

This API exposes endpoints to create, retrieve, update, and delete book records. Each book contains a title, author, genre, and price.

The application is structured to separate concerns between routing, controllers, services, repositories, and database models, resulting in a clean and maintainable codebase.

## Features

- Create, read, update, and delete books
- MongoDB integration using Mongoose
- Model Repository pattern
- Centralized error handling middleware
- Request validation using express validator
- Consistent API response format
- Query based pagination using the limit parameter
- Environment based configuration
- Local database seed script

## Technology Stack

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- express validator
- dotenv
- cors

## Prerequisites

This project is intended to run locally.

You must have the following tools installed before running the application.

### Node.js

Node.js version 18 or higher is required.

Download and install Node.js from:

https://nodejs.org

Verify the installation:

node --version  
npm --version

### MongoDB

MongoDB must be installed and running locally.

Installation guides for your operating system can be found here:

https://www.mongodb.com/docs/manual/installation

After installation, ensure the MongoDB service is running before starting the application.

## Environment Configuration

Create a .env file in the project root directory with the following values:

MONGO_URI=mongodb://localhost:27017/bookdb  
PORT=3000  
NODE_ENV=development

Make sure MongoDB is running locally before starting the application.

## Installation

Clone the repository and install dependencies:

git clone https://github.com/gabor-kalucza/books-rest-api  
cd books-rest-api  
npm install

## Running the Application

Start the development server:

npm run dev

If the database connection is successful, the server will start and connect to MongoDB.

The API will be available at:

http://localhost:3000

## Database Seeding

A seed script is included to populate the local database with book data.

The script removes existing book records and inserts a fresh set of sample books.

Run the seed script with:

npm run seed

Ensure MongoDB is running locally before executing this command.

## API Endpoints

POST /api/books  
GET /api/books  
GET /api/books/:id  
PUT /api/books/:id  
PATCH /api/books/:id  
DELETE /api/books/:id

## API Response Format

### Success Response

{
"success": true,
"message": "Operation completed successfully",
"data": {}
}

### Error Response

{
"success": false,
"message": "Book not found",
"statusCode": 404,
"data": null
}

## Error Handling

The application uses centralized error handling middleware. Known application errors return meaningful HTTP status codes and descriptive messages. Unexpected errors are handled with a generic internal server error response.

## Validation

Incoming requests are validated using express validator. Requests with invalid or missing data are rejected before reaching the controller layer.
