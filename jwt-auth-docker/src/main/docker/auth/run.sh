#!/bin/bash
set -e

IFS=', ' read -r -a array <<< "$WAIT_FOR"
for element in "${array[@]}"
do
    /usr/local/bin/dockerize -wait tcp://${element/@/:} -wait-retry-interval 5s -timeout 240s
done

echo "All dependencies are online. Starting up this service now."

/usr/local/bin/node "$@"
