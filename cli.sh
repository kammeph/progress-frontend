# build docker image for angular cli
docker build -f Dockerfile-angular-cli -t kammeph/angular-cli .

# run the created angular cli image and mount the working directory to the container
docker run --rm -it --name progress-cli -v ${PWD}:/home kammeph/angular-cli sh