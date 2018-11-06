#!/bin/bash
set -e

mvn versions:revert
docker logout
rm $HOME/.m2/settings.xml



