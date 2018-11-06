FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install openssl -y
RUN mkdir -p /opt/keys
WORKDIR /opt/keys
RUN openssl genrsa -out privatekey.pem 4096
RUN openssl rsa -in privatekey.pem -out publickey.pem -pubout
