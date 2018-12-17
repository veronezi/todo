ARG VERSION
ARG POSTGRES_VERSION
ARG STABLE_VERSION_TOMEE

FROM veronezi/todo-auth-keys:${VERSION} AS keys
FROM veronezi/sample-tomee:${STABLE_VERSION_TOMEE}

COPY --chown=tomee:tomee postgresql.${POSTGRES_VERSION}.jar /opt/tomee/lib/

COPY --chown=tomee:tomee ROOT.war /opt/tomee/webapps/
COPY --chown=tomee:tomee tomcat-users.xml /opt/tomee/conf/
COPY --chown=tomee:tomee logging.properties /opt/tomee/conf/
COPY --chown=tomee:tomee tomee.xml /opt/tomee/conf/

RUN mkdir -p /opt/keys/public
ENV PUBLIC_KEY_DIR=/opt/keys/public
COPY --chown=tomee:tomee --from=keys /opt/keys/publickey.pem /opt/keys/public/todo_rsa.pub

WORKDIR /opt/tomee/

ENV CATALINA_OPTS -Xms128m -Xmx512m
ENV DB_URL db:5432
ENV DB_USR todo_user
ENV DB_PWD todo_pass
ENV DB_NAME todo
ENV JWT_AUTH_URI http://auth:3000/auth

COPY --chown=tomee:tomee start.sh .
RUN chmod u+x start.sh