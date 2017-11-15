# Billow，浪的很！

## 介绍

Billow借鉴了php优秀框架laravel的很多理念，目的是让开发者可以用nodejs写出更加优秀的后端服务。框架以IOC为核心，提供了自定义命令行交互指令，多broker的队列任务，基于cron的调度任务，基于Koa的web服务，以及完善的crash捕捉处理，覆盖后端开发每个场景，提高代码复用率，维护性，可测试性！如果Billow有不足地方，或者你有更好的想法，欢迎提交ISSUE或者PR。

## 特性

* 支持ES2015+特性，装饰器，async，class properties，es2015-modules
* 支持redis，mongo
* 优雅的命令行交互指令，支持自定义
* 支持cron的调度任务
* 支持基于Koa的Http_kernel，可更换为express
* 支持异步任务队列，broker目前只支持redis
* 内置gurad模块，提供优雅的auth能力
* 类似laravel Provider的插件扩展能力
* 利用装饰器优雅实现服务依赖注入
* 支持https
* ...

## 目录介绍
	dist					//babel编译生成目录
		

	libs
		framework			//billow源码
	
	src
		app
			console			//命令行目录
				commands	//自定义命令目录
				Kernel.js	//命令行错误处理，调度任务配置
			http			//web服务目录
				controllers //控制器目录
				middlewares //web中间件目录
				routes		//web路由
					api.js	//api路由配置
					web.js	//web路由配置
				Kernel.js	//Koa中间件配置，路由错误处理，404处理
			listeners		//event监听目录
			models			//model目录，原生mongoose对象
			queue			//队列目录
				Kernel.js	//注册队列任务，队列任务错误处理
		config 				//配置
			app.js			//ioc依赖配置（alias），插件配置（provider）
			db.js			//以connection为单位配置db信息
			http.js			//端口，https证书配置
			queue.js		//以channel为单位配置queue连接信息
			redis.js		//以connection为单位配置redis信息
		providers			//插件目录
			AppProvider.js	//不同模式下依赖服务初始化
			EventsProvier.js//listenr配置
		artisan				//命令行入口
		bootstrap.js		//web服务入口
		csr.pem				//https默认相关证书
		file.crt
		private.pem
			
				
## Demo：
### 1.创建第一个Controller
	
	babel-node src/artisan make:controller Hello
	
生成文件：

	src/app/http/controller/HelloController.js
	
配置路由
		
	src/app/routes/api.js
	
	export default (router) => {
	+	router.use('/hello', 'HelloController');
   		router.use('/user', 'UserController');
   		router.get('/user/index', 'UserController@index');
	}


启动服务

	npm run dev

访问浏览器
	
	https://localhost:5003/api/hello	
			

### 2.创建第一个Command
待完善

### 3.创建第一个Job
待完善

## 开发：

    npm run dev

### 任务调度：
利用cron实现任务调度

    * */1 * * * * babel-node src/artisan schedule:run

### 队列：
	
	babel-node src/artisan queue:run [channel_name]

## 发布：

    npm run build

#### 任务调度：
        
    * */1 * * * * node dist/artisan schedule:run

### 队列：
	
	node dist/artisan queue:run [channel_name]

## 联系方式
官方qq群：481148189

作者微信：jasonchou021