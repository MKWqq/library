#!/bin/bash

version="latest"
read -p "请输入版本号："  str
if  [ ! -n "$str" ] ;then
    read -p "请输入版本号："  str
else
    version=$str
   
	echo -e "\033[42;37m =================构建镜像 ff_web:$version  开始....============ \033[0m\n"
	docker build  -t ff_web:$version .
	echo -e "\033[42;37m =================构建镜像 ff_web:$version  结束....============ \033[0m\n"

	echo -e "\n\033[42;37m 镜像构建完成! \033[0m\n"

fi