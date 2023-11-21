# Amalitech Challenge

This project, `amalitech-challenge`, is a Node.js and TypeScript-based application. It features a REST API built with Express and Mongoose and is configured to run in a Docker environment with MongoDB.

## Features

- REST API developed with Express and TypeScript.
- Data persistence through MongoDB.
- Dockerized setup for straightforward setup and deployment.
- Comprehensive setup for linting and testing.

## Prerequisites

Before starting, ensure the following requirements are met:
- [Node.js](https://nodejs.org/) and npm installed.
- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose for container management.
- [MongoDB](https://www.mongodb.com/) installed locally for non-Dockerized development (optional).

## Setup

Clone the repository:

```bash
git clone git@github.com:abayo-luc/amalitech-challenge.git
cd amalitech-challenge
```

## Environment Setup
Copy the .env.example file to create a .env file and fill in the necessary environment variables:

```bash
cp .env.example .env
```

Set the following variables in .env:

 - `PORT`: Port number for the Express server.
 - `MONGO_INITDB_ROOT_USERNAME`: MongoDB root user username.
 - `MONGO_INITDB_ROOT_PASSWORD`: MongoDB root user password.
 - `DATABASE_CONNECTION_URL`: MongoDB database connection URL.

## Running the Application

```bash
docker-compose up --build -d
```
This command builds the Docker images and starts the containers in the background as defined in `docker-compose.yaml`.

# Development
For development purposes, run the application outside Docker:
```bash
./scrips/run-dev.sh
```

Bellow are other available useful development commands:

```bash
yarn install # install dependencies 
yarn dev # to run the server
yarn test # to run the test
yarn lint # to identify and fix linting issue
yarn build # to compile typescript to javascript production ready code
```
