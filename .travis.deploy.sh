#!/bin/bash
set -e

REPO_ID=bintray-tveronezi-pretests
REPO_URL=https://api.bintray.com/maven/tveronezi/pretests

function deploy_java_bin () {
    mvn deploy:deploy-file -DpomFile=$1/pom.xml -Dfile=$1/target/$2-$3.$4 -Dpackaging=$4 -DrepositoryId=$REPO_ID -Durl=$REPO_URL/$2/;publish=1
}

deploy_java_bin api todo-api $TODO_VERSION-b$TRAVIS_BUILD_NUMBER war
deploy_java_bin ft todo-ft $TODO_VERSION-b$TRAVIS_BUILD_NUMBER jar
deploy_java_bin ft todo-ft $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip
deploy_java_bin jwt-auth todo-auth $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip
deploy_java_bin ui todo-ui $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip

function deploy_docker_image () {
    if [ "$TRAVIS_PULL_REQUEST" -eq "false" ]; then
        docker tag $1 veronezi/$1:$2-b$3
        docker push veronezi/$1:$2-b$3
    else
       docker tag $1 veronezi/$1:$2-pr$TRAVIS_PULL_REQUEST
       docker push veronezi/$1:$2-pr$TRAVIS_PULL_REQUEST
    fi
}

deploy_docker_image todo-auth $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-auth-keys $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-api $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-facade $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-static $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-ft $TODO_VERSION $TRAVIS_BUILD_NUMBER
