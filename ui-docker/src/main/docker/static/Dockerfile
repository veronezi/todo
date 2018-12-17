ARG VERSION
ARG NODE_VERSION

FROM dockerize:${VERSION} AS dockerz

# Install the node_modules from the package.json only. This way we void installing
# the whole node_modules directory again everytime we change any of the application
# files but package.json.
FROM node:${NODE_VERSION}-alpine AS todo-ui-install
USER root
RUN mkdir -p /opt/ui
WORKDIR /opt/ui
RUN chown node:node -R /opt
USER node
COPY --chown=node:node todo-ui-${VERSION}/package.json .
RUN npm install

# With the previously node_modules direcotry in place, now run the tests and the build of the
# production code.
FROM node:${NODE_VERSION}-alpine AS todo-ui-build
USER root
RUN mkdir -p /opt/ui
WORKDIR /opt/ui
RUN chown node:node -R /opt
USER node
COPY --from=todo-ui-install --chown=node:node /opt/ui/node_modules ./node_modules
COPY --chown=node:node todo-ui-${VERSION} .
RUN export CI=true && npm run-script test
RUN npm run-script build

# Create the httpd server that will serve the production code created above.
FROM httpd:2.4.34-alpine
RUN apk add --no-cache bash
COPY --from=dockerz /usr/local/bin/dockerize /usr/local/bin/
COPY --from=todo-ui-build /opt/ui/build /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/
COPY  run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh
ENTRYPOINT ["/usr/local/bin/run.sh"]
