FROM dockerize:latest AS dockerize
FROM openjdk:${openjdk.version}

USER root

RUN mkdir -p /opt
WORKDIR /opt

RUN apt-get update
RUN apt-get install -y bash=4.4-5

RUN curl -s -o chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get update
RUN dpkg -i chrome.deb; apt-get -fy install
RUN rm chrome.deb

COPY --from=dockerize /usr/local/bin/dockerize /usr/local/bin/

RUN mkdir -p /root/.m2/repository/webdriver/chromedriver/linux64/${chromedriver.version}/
WORKDIR /root/.m2/repository/webdriver/chromedriver/linux64/${chromedriver.version}/
RUN curl -s -o chromedriver.zip https://chromedriver.storage.googleapis.com/${chromedriver.version}/chromedriver_linux64.zip
RUN unzip chromedriver.zip && rm chromedriver.zip && ls -l

WORKDIR /opt

COPY lib.zip .
RUN unzip lib.zip && rm lib.zip
ENV CLASSPATH=/opt/lib

COPY ft.jar .
COPY run.sh .
RUN chmod +x run.sh

ENV API_HOST=api
ENV API_PORT=8080
ENV UI_HOST=ui
ENV UI_PORT=80

ENV SUSPEND=n
EXPOSE 5005
ENTRYPOINT ["/opt/run.sh"]
