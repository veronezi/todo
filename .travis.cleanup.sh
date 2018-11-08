#!/bin/bash
set -e

mvn --settings /tmp/.travis.settings.xml versions:revert
docker logout
rm /tmp/.travis.settings.xml
