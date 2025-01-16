#!/bin/bash

# Start the API in the background
#echo "Starting the API..."
#sh /usr/src/app/docker-entrypoint.sh &

# Start NGINX in the foreground
echo "Starting NGINX..."
nginx -g 'daemon off;'

