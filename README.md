# GitHub Client
This is a simple GitHub client that allows you to search for users and view their profiles.

You can found the design in [this link](https://www.figma.com/file/hTm9jCQzS0YOlcvbEGj16f/gh-client?node-id=0%3A1).

## Content
- [Getting Started](#getting-started)
- [Running with Docker](#running-with-docker)
- [Running with Node](#running-with-node)

## Getting Started
1. To get started, clone the repository
2. Navigate to the project directory.
3. Make a copy of the `environment.template` file and rename it to `environment.ts`.
4. Replace the contents of the `environment.ts` file with your environment variables for development.
5. Make a copy of the `environment.template` file and rename it to `environment.prod.ts`.
6. Replace the contents of the `environment.prod.ts` file with your environment variables for production.

## Running with Docker
To run the application with Docker, you need to have Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

Once you have Docker installed follow the steps below to run the application:
1. Build the image with the next command:

    ```bash
    docker build . -t <IMAGE_NAME>
    ```
    > Replace `<IMAGE_NAME>` with the name of the image you want to build.
2. Run the image with the next command:

    ```bash
    docker run -p <HOST_PORT>:80 --name <CONTAINER_NAME> <IMAGE_NAME>
    ```

    Or if you want to run the image in the background:

    ```bash
    docker run -d -p <HOST_PORT>:80 --name <CONTAINER_NAME> <IMAGE_NAME>
    ```

    > Replace `<IMAGE_NAME>` with the name of the image, `<HOST_PORT>` with the port you want to use on your machine and `<CONTAINER_NAME>` with the name of the container you want to run.
  
3. Open your browser and navigate to `http://localhost:<HOST_PORT>` to see the application running.

## Running with Node

### Requirements
- Node.js
- NPM

### Running the App
1. Install the dependencies with the next command:

    ```bash
    npm install
    ```
2. Run the app, run `npm start` and navigate to `http://localhost:4200/`.
