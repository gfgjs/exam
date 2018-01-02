/**
 * Created by yang on 2017/10/31.
 * 创建连接池
 */
    "use strict"
const mysql = require('promise-mysql');
//注：这里使用的不是mysql,而是promise-mysql
// 主要与mysql的区别是，使用promise的方式，来使用，而不是以前的回调函数的试了
// promise-mysql 的基本使用方法，参考本文件的最后代码段
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pro_20171031',
    connectionLimit: 10 // 设置最大的连接数
});
module.exports=pool;

// 连接池的使用方法
//pool = mysql.createPool({
//    host: 'localhost',
//    user: 'sauron',
//    password: 'theonetruering',
//    database: 'mordor',
//    connectionLimit: 10
//});
// 在promise-mysql 中，有了pool对象后，通以下的方式来执行mysql语句
// pool.query('select `name` from hobbits').then(function(rows){
//    // Logs out a list of hobbits
//    console.log(rows);
// });