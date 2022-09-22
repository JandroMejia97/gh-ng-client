# GitHub Client
This is a simple GitHub client that allows you to search for users and view their profiles.

## Running with Docker
To run the application with Docker, you need to have Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop).

Once you have Docker installed follow the steps below to run the application:
1. Clone the repository
2. Navigate to the root of the project
3. Build the image with the next command:

    ```bash
    docker build . -t <IMAGE_NAME>
    ```
    > Replace `<IMAGE_NAME>` with the name of the image you want to build.
4. Run the image with the next command:

    ```bash
    docker run -p <HOST_PORT>:80 --name <CONTAINER_NAME> <IMAGE_NAME>
    ```

    Or if you want to run the image in the background:

    ```bash
    docker run -d -p <HOST_PORT>:80 --name <CONTAINER_NAME> <IMAGE_NAME>
    ```

    > Replace `<IMAGE_NAME>` with the name of the image, `<HOST_PORT>` with the port you want to use on your machine and `<CONTAINER_NAME>` with the name of the container you want to run.
  
5. Open your browser and navigate to `http://localhost:<HOST_PORT>` to see the application running.

## Running with Node

### Requirements
- Node.js
- NPM

### Getting Started
To get started, clone the repository and run `npm install` to install the dependencies.

### Running the App
To run the app, run `npm start` and navigate to `http://localhost:4200/`.
