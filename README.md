开发：
babel-node

计划任务：
* */1 * * * * babel-node src/artisan schedule:run

发布：
babel src --out-dir dist

计划任务：
* */1 * * * * node dist/artisan schedule:run