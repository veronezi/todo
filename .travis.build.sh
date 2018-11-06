#!/bin/bash
set -e

echo "building and installing the java binaries"
mvn install -DskipTests -Ddocker.skip=true -q

echo "building the docker images"
mvn install -DskipTests

echo "running the maven tests"
mvn test -Ddocker.skip=true
