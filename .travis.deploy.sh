#!/bin/bash
set -e

function deploy_java_bin () {
    mvn deploy:deploy-file -DpomFile=$1/pom.xml -Dfile=$1/target/$2-$3.$4 -Dpackaging=$4 -DrepositoryId=bintray-tveronezi-pretests -Durl=https://api.bintray.com/maven/tveronezi/pretests/$2/;publish=1
}

deploy_java_bin api todo-api $TODO_VERSION-b$TRAVIS_BUILD_NUMBER war
deploy_java_bin ft todo-ft $TODO_VERSION-b$TRAVIS_BUILD_NUMBER jar
deploy_java_bin ft todo-ft $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip
deploy_java_bin jwt-auth todo-auth $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip
deploy_java_bin ui todo-ui $TODO_VERSION-b$TRAVIS_BUILD_NUMBER zip

function deploy_docker_image () {
    echo "[RUNNING] docker tag $1 veronezi/$1:$2-b$3"
    docker tag $1 veronezi/$1:$2-b$3
    echo "[RUNNING] docker push veronezi/$1:$2-b$3"
    docker push veronezi/$1:$2-b$3
}

deploy_docker_image todo-auth $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-auth-keys $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-api $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-facade $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-static $TODO_VERSION $TRAVIS_BUILD_NUMBER
deploy_docker_image todo-ft $TODO_VERSION $TRAVIS_BUILD_NUMBER
