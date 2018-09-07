FROM registry.docker-cn.com/library/node:latest

# args
ARG LOCAL_PROJ_DIR=./ff_web
ARG PROJ_NAME=ff_web

# envs
ENV PORT 3001
ENV RUN_ENV test
ENV SERVER devel-c
ENV SERVICE $PROJ_NAME

# set timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# copy package.js
COPY $LOCAL_PROJ_DIR/package.json /src/
COPY $LOCAL_PROJ_DIR/src/server/package.json /src/src/server/

# install requirements
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cd /src/src/server && cnpm install
RUN cd /src && cnpm install

# copy project & build static resources
COPY $LOCAL_PROJ_DIR /src
RUN cd /src && cnpm run build

WORKDIR /src/src/server
RUN mkdir /var/log/$PROJ_NAME/
EXPOSE $PORT

CMD ["npm", "start"]