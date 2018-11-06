FROM openjdk:${openjdk.version}-alpine

USER root

RUN mkdir -p /opt
RUN mkdir -p /opt/keys/public
WORKDIR /opt

RUN addgroup -S tomee && adduser -S -G tomee tomee
RUN chown tomee:tomee -R /opt

RUN apk add --no-cache bash
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin/

USER tomee

COPY --chown=tomee:tomee tomee.tar.gz .
RUN tar xzf tomee.tar.gz && rm tomee.tar.gz
RUN mv apache-* tomee
RUN rm -Rf /opt/tomee/webapps/*

WORKDIR /opt/tomee/conf/
COPY --chown=tomee:tomee logging.properties .
COPY --chown=tomee:tomee tomee.xml .

ENV JPDA_ADDRESS=8000
ENV JPDA_TRANSPORT=dt_socket
ENV JPDA_SUSPEND=n

EXPOSE 8080 8000

WORKDIR /opt/tomee/lib/
COPY --chown=tomee:tomee postgresql.${postgres.driver.version}.jar .

WORKDIR /opt/tomee/

COPY --chown=tomee:tomee run.sh .
RUN chmod +x run.sh

COPY --chown=tomee:tomee ROOT.war /opt/tomee/webapps/
COPY --chown=tomee:tomee tomcat-users.xml /opt/tomee/conf/

ENV PUBLIC_KEY_DIR=/opt/keys/public
COPY --chown=tomee:tomee --from=todo-auth-keys:${images.version} /opt/keys/publickey.pem /opt/keys/public/todo_rsa.pub

ENTRYPOINT ["/opt/tomee/run.sh"]
CMD ["run"]