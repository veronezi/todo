#!/bin/bash
set -e

echo "building and installing the java binaries"
mvn --settings /tmp/.travis.settings.xml install -DskipTests -Ddocker.skip=true -q

echo "building the docker images"
mvn --settings /tmp/.travis.settings.xml install -DskipTests

echo "running the maven tests"
mvn --settings /tmp/.travis.settings.xml test -Ddocker.skip=true
