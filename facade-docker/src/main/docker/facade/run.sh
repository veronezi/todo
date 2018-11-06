#!/bin/bash
set -e

IFS=', ' read -r -a array <<< "$WAIT_FOR"
for element in "${array[@]}"
do
    /usr/local/bin/dockerize -wait tcp://${element/@/:} -wait-retry-interval 5s -timeout 240s
done

echo "All dependencies are online. Starting up this service now. "
echo "Config file..."
/usr/local/bin/dockerize -template /usr/local/apache2/conf/extra/httpd-vhosts.conf
/usr/local/bin/dockerize -template /usr/local/apache2/conf/extra/httpd-vhosts.conf:/usr/local/apache2/conf/extra/httpd-vhosts.conf

/usr/local/bin/httpd-foreground "$@"
