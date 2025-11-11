FROM node

ENV MONGGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwrty

RUN mkdir -p cloudapp

COPY . /cloudapp

CMD ["node","/cloudapp/server.js"]