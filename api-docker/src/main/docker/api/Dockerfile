ARG VERSION
ARG POSTGRES_VERSION
ARG STABLE_VERSION_TOMEE

FROM veronezi/sample-tomee:${STABLE_VERSION_TOMEE}

COPY --chown=tomee:tomee postgresql.${POSTGRES_VERSION}.jar /opt/tomee/lib/

COPY --chown=tomee:tomee ROOT.war /opt/tomee/webapps/
COPY --chown=tomee:tomee tomcat-users.xml /opt/tomee/conf/
COPY --chown=tomee:tomee logging.properties /opt/tomee/conf/
COPY --chown=tomee:tomee tomee.xml /opt/tomee/conf/

WORKDIR /opt/tomee/

ENV CATALINA_OPTS -Xms128m -Xmx512m
ENV DB_URL db:5432
ENV DB_USR todo_user
ENV DB_PWD todo_pass
ENV DB_NAME todo
ENV JWT_AUTH_URI http://auth:3000
ENV JWT_AUTH_PATH /auth
ENV JWT_PUBLIC_KEY_PATH /publickey

COPY --chown=tomee:tomee start.sh .
RUN chmod u+x start.sh