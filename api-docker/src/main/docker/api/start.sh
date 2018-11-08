#!/bin/bash
set -e

IFS=', ' read -r -a array <<< "$WAIT_FOR"
for element in "${array[@]}"
do
    /usr/local/bin/dockerize -wait tcp://${element/@/:} -wait-retry-interval 5s -timeout 240s
done

echo "All dependencies are online. Starting up this service now."
export CATALINA_OPTS="$CATALINA_OPTS -DMyDatasource.JdbcUrl=jdbc:postgresql://$DB_URL/$DB_NAME -DMyDatasource.UserName=$DB_USR -DMyDatasource.Password=$DB_PWD"

/opt/tomee/bin/catalina.sh "$@"
