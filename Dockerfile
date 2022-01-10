## BUILD STAGE: use node image to build the application
FROM node:16.13.1-alpine as build

WORKDIR /app

COPY ["progress/package.json", "progress/package-lock.json*", "./"]

# install the dependencies
RUN npm install --silent 

COPY ./progress .

# run the build process
RUN npm run build --prod

## PRODUCTION STAGE: use nginx as webserver to host the application
FROM nginx:1.21.5-alpine

# copy server configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy compiles files from build stage to nginx html folder
COPY --from=build app/dist/progress-frontend /usr/share/nginx/html

# start script
WORKDIR /app

# copy start script for replacing the environment variables
COPY nginx/start-nginx.sh ./start-nginx.sh

RUN chmod +x ./start-nginx.sh

# When Container Start -> Replace Environment Variables
CMD [ "/bin/sh", "-c", "sh start-nginx.sh" ]