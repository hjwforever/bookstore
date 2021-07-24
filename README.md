# boostore
大数据智能推荐图书商城前端

[demo网址1](https://bookstore.aruoxi.com)、[demo网址2](https://bookstore-aruoxi.vercel.app/)

> 请配合[后端项目](https://gitee.com/org-bookstore/online_bookstore_backend)使用  
> 书籍爬虫项目地址: [hjwforever/bookCrawler](https://github.com/hjwforever/bookCrawler)

## Set Up

```bash
# 拉取项目
git clone https://github.com/hjwforever/bookstore.git
# 安装依赖
npm install
# 启动项目
npm run dev
```

## Docker

### 镜像地址
前端vue项目docker镜像: [aruoxi/bookstore-frontend](https://hub.docker.com/repository/docker/aruoxi/bookstore-frontend)  

后端springboot项目docker镜像: [aruoxi/bookstore-backend](https://hub.docker.com/repository/docker/aruoxi/bookstore-backend)

### docker-compose 参考配置

>**！！注意*bookStoreServer*这个名称不要修改，其他的随意！！**

```yaml
version: "3"

services:
  bookStoreServer:
    restart: always
    image: aruoxi/bookstore-backend
    container_name: BS-backend
    ports:
      - 8081:8081
    networks:
      - vue-spring

  bookStoreClient:
    restart: always
    image: aruoxi/bookstore-frontend
    container_name: BS-frontend
    environment:
      TZ: Asia/Shanghai
    ports:
      - 8080:80
    depends_on:
      - bookStoreServer
    networks:
      - vue-spring

networks:
  vue-spring: {}
```
