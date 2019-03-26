FROM registry.docker-cn.com/library/node:latest

# args
ARG LOCAL_PROJ_DIR=./c_tyfp
ARG PROJ_NAME=c_tyfp

# envs
ENV PORT 5210
ENV RUN_ENV preview
ENV SERVER devel-c
ENV SERVICE $PROJ_NAM

# set timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# copy package.js
COPY $LOCAL_PROJ_DIR/package.json /$PROJ_NAME/
COPY $LOCAL_PROJ_DIR/server/package.json /$PROJ_NAME/server/

# install requirements
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cd /$PROJ_NAME/server && cnpm install
RUN cd /$PROJ_NAME && cnpm install

# copy project & build static resources
COPY $LOCAL_PROJ_DIR /$PROJ_NAME
RUN cd /$PROJ_NAME && cnpm run all_build

WORKDIR /$PROJ_NAME/server
RUN mkdir /var/log/$PROJ_NAME/
EXPOSE $PORT

CMD ["npm", "start"]
