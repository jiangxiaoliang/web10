#制定node镜像的版本
FROM keymetrics/pm2:latest-alpine
#进入到app目录下，类似cd
WORKDIR /usr/src/app
#移动当前目录下面的文件到app目录下
ADD . /usr/src/app
#安装依赖
RUN npm install
#对外暴露的接口
EXPOSE 3000
#pm2在docker中使用命令为pm2-docker
CMD [ "pm2-runtime", "start", "process.yml" ]