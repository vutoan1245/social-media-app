# Social Media App

## Overview

This is a simple social media application built with React and Redux for the frontend and Node.js with Express and MongoDB for the backend. The application allows users to register, login, create posts, like posts, comment on posts, and view user profiles. Tailwind CSS is used for styling, ensuring a responsive and modern design.

Web App Examples:
![App Screenshot](./AppHomePage.png)

Mobile App Example:

<div style="display: flex; justify-content: space-between; text-align: center;">
    <img src="./mobile_1.png" alt="App Screenshot" width="200"/>
    <img src="./mobile_2.png" alt="App Screenshot" width="200"/>
    <img src="./mobile_3.png" alt="App Screenshot" width="200"/>
</div>

## Features

- User Authentication: Register and login functionality with JWT-based authentication.
- User Profiles: View user profiles with profile pictures, bios, and other details.
- Posts: Create, like, comment on, and view posts.
- Responsive Design: Tailwind CSS ensures the app is responsive and mobile-friendly.
- Redis Caching: Improved performance with Redis caching for frequently accessed data.

## Tech Stack

### Frontend

- React: JavaScript library for building user interfaces.
- Redux: State management for React applications.
- Tailwind CSS: Utility-first CSS framework for styling.
- Heroicons: Icons for the UI components.

### Backend

- Node.js: JavaScript runtime for building server-side applications.
- Express: Web framework for Node.js.
- MongoDB: NoSQL database for storing user data and posts.
- Mongoose: ODM for MongoDB and Node.js.
- Multer: Middleware for handling file uploads.
- JWT: JSON Web Tokens for authentication.
- Redis: In-memory data structure store for caching.

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine.
- MongoDB server running locally or a MongoDB Atlas account.
- Docker installed on your local machine (for Redis).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vutoan1245/social-media-app.git
cd social-media-app
```

2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd front-end
npm install

# Install backend dependencies
cd ../back-end
npm install
```

### Configuration

1. Create a `.env` file in the `back-end` directory and add the following environment variables:

```plaintext
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3001
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=pass
```

2. Create a `.env` file in the `front-end` directory and add the following environment variables:

```plaintext
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Running the Application

1. Start the Redis server using Docker:

```bash
cd back-end
docker-compose up -d
```

2. Start the backend server:

```bash
npm start
```

3. Start the frontend development server:

```bash
cd ../front-end
npm start
```

## License

This project is licensed under the MIT License.
