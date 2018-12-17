ARG DOCKERIZE_VERSION

FROM alpine:3.8

RUN apk add --no-cache openssl

RUN wget --quiet "https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz"
RUN tar -C /usr/local/bin -xzvf "dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz"
RUN rm "dockerize-alpine-linux-amd64-${DOCKERIZE_VERSION}.tar.gz"