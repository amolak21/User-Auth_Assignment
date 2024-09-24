# User Authentication System

This project implements a user authentication system using Node.js, Express, MongoDB, JWT (JSON Web Tokens), bcrypt for password hashing, and Zod for input validation. It allows users to register, login, and access protected routes securely.

## Features

- **User Registration**: Users can create new accounts with a unique username and email.
- **User Login**: Existing users can log in securely using their email and password.
- **JWT-based Authentication**: JSON Web Tokens are used for session management and authentication.
- **Protected Routes**: Certain routes are protected and accessible only with a valid JWT.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing user information.
- **JWT (JSON Web Tokens)**: Secure way of transmitting information between parties as a JSON object.
- **bcrypt**: Library for hashing passwords securely.
- **Zod**: TypeScript-first schema declaration and validation library for input validation.
- **Cookie-Parser**: Middleware for parsing cookies attached to the client's request.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB database (local or cloud-based like MongoDB Atlas)
- Postman for the request handling
