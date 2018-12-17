ARG VERSION
ARG POSTGRES_VERSION
FROM veronezi/todo-auth-keys:${VERSION} AS keys
FROM veronezi/sample-tomee:0.0.1-b10

COPY --chown=tomee:tomee postgresql.${POSTGRES_VERSION}.jar /opt/tomee/lib/

COPY --chown=tomee:tomee ROOT.war /opt/tomee/webapps/
COPY --chown=tomee:tomee tomcat-users.xml /opt/tomee/conf/
COPY --chown=tomee:tomee logging.properties /opt/tomee/conf/
COPY --chown=tomee:tomee tomee.xml /opt/tomee/conf/

RUN mkdir -p /opt/keys/public
ENV PUBLIC_KEY_DIR=/opt/keys/public
COPY --chown=tomee:tomee --from=keys /opt/keys/publickey.pem /opt/keys/public/todo_rsa.pub

WORKDIR /opt/tomee/

COPY --chown=tomee:tomee start.sh .
RUN chmod u+x start.sh