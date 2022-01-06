# build docker image for angular development
docker build -f Dockerfile-angular-dev -t kammeph/angular-dev .

# run development container and mount the working directory to the container
docker run --rm -it --name progress-frontend -p 4200:4200 -v ${PWD}:/app kammeph/angular-dev npm run ng -- serve --host 0.0.0.0