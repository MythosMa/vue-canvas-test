# 使用官方 Node.js 镜像作为基础镜像
FROM --platform=linux/amd64 node:alpine

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json .
COPY dist ./dist

# 安装项目依赖
RUN yarn install
RUN npm config set registry http://registry.npm.taobao.org
RUN yarn config set registry 'https://registry.npm.taobao.org'
RUN yarn config set sass_binary_site 'https://npm.taobao.org/mirrors/node-sass/'
# RUN npm install

RUN npm install -g serve

# 暴露端口
EXPOSE 3000

# 启动实例
CMD [ "serve", "-s", "dist" ]