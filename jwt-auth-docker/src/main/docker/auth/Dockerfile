ARG VERSION
ARG NODE_VERSION
FROM dockerize:${VERSION} AS dockerz
FROM node:${NODE_VERSION}-alpine AS todo-ui-build

USER root

RUN mkdir -p /opt/auth
RUN mkdir -p /opt/keys/private
RUN mkdir -p /opt/keys/public
COPY --from=veronezi/todo-auth-keys /opt/keys/privatekey.pem /opt/keys/private/todo_rsa
COPY --from=veronezi/todo-auth-keys /opt/keys/publickey.pem /opt/keys/public/todo_rsa.pub
WORKDIR /opt/auth

RUN chown node:node -R /opt

ENV PUBLIC_KEY_DIR=/opt/keys/public
ENV PRIVATE_KEY_DIR=/opt/keys/private

RUN apk add --no-cache bash
COPY --from=dockerz /usr/local/bin/dockerize /usr/local/bin/

USER node

WORKDIR /opt
COPY --chown=node:node run.sh .
RUN chmod +x run.sh

WORKDIR /opt/auth

COPY --chown=node:node todo-auth-${VERSION} .

RUN npm install
RUN npm run-script test

EXPOSE 3000

ENTRYPOINT ["/opt/run.sh"]
CMD ["index.js"]
