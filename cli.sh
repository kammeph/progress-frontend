# run the created angular cli image and mount the working directory to the container
docker run --rm -it --name progress-cli -v ${PWD}/progress:/home kammeph/angular-cli sh