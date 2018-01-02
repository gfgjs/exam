/**
 * Created by yang on 2017/10/31.
 * DAO : 数据层
 * 岗位表，相关的操作
 */
//引用模块
const pool = require("../modal/sqlPool.js"); //连接池模块
/**
 * 1. getAllJob , 获取所有岗位信息
 * */
function getAllJob(){
    "use strict";
    //返回一个promise对象
    return new Promise(function (resolve, reject) {
        let sql = "select * from job" ;
        pool.query(sql,[]).then(function(data){   //pool.query返回的是一个promise对象，所以可以使用then
            //成功执行执行的方法
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}

module.exports={
    getAllJob
};