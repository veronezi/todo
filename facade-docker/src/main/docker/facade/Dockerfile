FROM httpd:2.4.34-alpine
RUN apk add --no-cache bash
COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin/

COPY httpd.conf /usr/local/apache2/conf/
COPY httpd-vhosts.conf /usr/local/apache2/conf/extra/

ENV API_DNS=api
ENV STATIC_DNS=static

COPY  run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh
ENTRYPOINT ["/usr/local/bin/run.sh"]
