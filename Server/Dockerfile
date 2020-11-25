FROM node:12.18.4

ENV APP_ROOT="/var/www/node"

WORKDIR ${APP_ROOT}

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/
RUN cp /tmp/package-lock.json /var/www/node

EXPOSE 3000

COPY ./devops/start.sh /opt/start.sh
RUN chmod 755 /opt/start.sh

ENTRYPOINT [ "/opt/start.sh" ]
