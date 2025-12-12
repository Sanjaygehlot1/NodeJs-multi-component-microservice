# Node.js + MongoDB + Docker Compose Starter

A lightweight, containerized setup using **Node.js**, **MongoDB**, and **Mongo Express**. Designed for quick development, testing, and DevOps learning.

## Tech Stack

* **Node.js** – Backend server & API
* **MongoDB** – Database
* **Mongo Express** – Web UI for MongoDB
* **Docker Compose** – Multi-container orchestration

## Run the Application

```bash

docker compose up -d --build

```

This builds the Node app image and starts all containers in detached mode.

## Access the Services

| Service           | URL                                            |
| ----------------- | ---------------------------------------------- |
| **Node App**      | [http://localhost:3000](http://localhost:3000) |
| **Mongo Express** | [http://localhost:8081](http://localhost:8081) |

Mongo Express allows you to visually explore and manage your MongoDB database.

## Database Connection (Internal Docker Network)

Your Node app connects to MongoDB using the container hostname:

```js
mongodb://sanjay:gehlot@mongodb:27017
```

This works because all services share the same Docker network, and Docker DNS resolves `mongodb` → MongoDB container.

## API Endpoints (Node App)

### **GET `/get-profile`**

Fetch user profile data from MongoDB.

### **POST `/update-profile`**

Update profile information.

**Request Body Example:**

```json
{
  "name": "Sanjay",
  "email": "sanjay@example.com",
  "interests": "coding"
}
```

## Stopping the Stack

```bash
docker compose down
```

This stops and removes all running containers.

## Project Purpose

This repository demonstrates how to:

* Containerize a Node.js app
* Connect multiple services securely over a shared Docker network
* Use MongoDB with authentication
* Deploy a small microservice
