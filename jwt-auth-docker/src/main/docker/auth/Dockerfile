FROM node:${node.version}-alpine AS todo-ui-build

USER root

RUN mkdir -p /opt/auth
RUN mkdir -p /opt/keys/private
RUN mkdir -p /opt/keys/public
COPY --from=todo-auth-keys:${images.version} /opt/keys/privatekey.pem /opt/keys/private/todo_rsa
COPY --from=todo-auth-keys:${images.version} /opt/keys/publickey.pem /opt/keys/public/todo_rsa.pub
WORKDIR /opt/auth

RUN chown node:node -R /opt

ENV PUBLIC_KEY_DIR=/opt/keys/public
ENV PRIVATE_KEY_DIR=/opt/keys/private

RUN apk add --no-cache bash
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin/

USER node

WORKDIR /opt
COPY --chown=node:node run.sh .
RUN chmod +x run.sh

WORKDIR /opt/auth

COPY --chown=node:node todo-auth-${project.version} .

RUN npm install
RUN npm run-script test

EXPOSE 3000

ENTRYPOINT ["/opt/run.sh"]
CMD ["index.js"]
