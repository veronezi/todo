#!/bin/bash
set -e

IFS=', ' read -r -a array <<< "$WAIT_FOR"
for element in "${array[@]}"
do
    /usr/local/bin/dockerize -wait tcp://${element/@/:} -wait-retry-interval 5s -timeout 240s
done

echo "All dependencies are online. Starting up this service now."

/usr/bin/java -agentlib:jdwp=transport=dt_socket,server=y,address=5005,suspend=$SUSPEND \
 -Dapi_host=$API_HOST -Dapi_port=$API_PORT \
 -Dui_host=$UI_HOST -Dui_port=$UI_PORT \
 -Dheadless=true -Don_docker=true -jar /opt/ft.jar "$@"

echo "All good! The tests are green."

# wait forever
/usr/bin/tail -f /dev/null