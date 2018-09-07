FROM registry.docker-cn.com/library/nginx

# set timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# RUN apt-get update && apt-get install -y dnsutils
RUN rm /etc/nginx/conf.d/default.conf
COPY ./conf.d /etc/nginx/conf.d
COPY ./crt /etc/ssl/crt
COPY ./nginx.conf /etc/nginx/nginx.conf