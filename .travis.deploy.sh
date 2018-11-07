#!/bin/bash
set -e

function deploy_docker_image () {
    if [ "$TRAVIS_BRANCH" = "master" ]; then
        echo "deploying docker image veronezi/$1:$2-b$3"
        docker tag $1 veronezi/$1:$2-b$3
        docker tag $1 veronezi/$1
        docker push veronezi/$1:$2-b$3
        docker push veronezi/$1
    else
        echo "deploying docker image veronezi/$1:$2-rc$3"
       docker tag $1 veronezi/$1:$2-rc$3
       docker push veronezi/$1:$2-rc$3
    fi
}

deploy_docker_image todo-static $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-auth $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-facade $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-api $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-ft $TODO_VERSION $TRAVIS_BUILD_NUMBER

echo "binaries uploaded"