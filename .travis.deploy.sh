#!/bin/bash
set -e

function deploy_docker_image () {
    if [ "$TRAVIS_BRANCH" = "master" ]; then
        echo "deploying docker image veronezi/$1:$TODO_VERSION-b$TRAVIS_BUILD_NUMBER"
        docker push $1:$TODO_VERSION-b$TRAVIS_BUILD_NUMBER
        docker push $1
    else
       echo "not building master. we wont deploy the docker images."
    fi
}

deploy_docker_image veronezi/todo-static
deploy_docker_image veronezi/todo-auth
deploy_docker_image veronezi/todo-facade
deploy_docker_image veronezi/todo-api
deploy_docker_image veronezi/todo-ft

echo "binaries uploaded"