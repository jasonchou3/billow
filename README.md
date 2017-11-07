#开发：

    npm run dev

####任务调度：
利用cron实现任务调度

    * */1 * * * * babel-node src/artisan schedule:run

#发布：

    npm run build

####计划任务：
        
    * */1 * * * * node dist/artisan schedule:run