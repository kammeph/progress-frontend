# PROGRESS - A Strength Training Planning and Tracking Application 

This is the PROGRESS frontend application. PROGRESS is a strength training planning and tracking tool.

## Development

1. Start cli-container using the **cli.sh** script

2. Install the dependencies by running

    npm install

3. Start the development container using the **develop.sh**

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding (inside the cli-container)

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

1. Check if docker buildx is installed with 

    docker buildx version

    1.1 If buildx is not installed use the command

        docker buildx install

2. Check if the docker builder support **linux/amd64** and **linux/arm64** platforms

    docker buildx ls

    2.1 If one or more platform are not supported then create a new builder with

        docker buildx create --use --name <builder-name>

3. Build the Dockerimage with the **build.sh** script

For further information check the official [**Docker Buildx**](https://docs.docker.com/buildx/working-with-buildx/) documentation

## Production

Start the application on production by running the **deploy.sh** script.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
