/**
 * Created by yang on 2017/10/31.
 * DAO : 数据层
 * 员工表，相关的操作
 */
//引用模块
const pool = require("../modal/sqlPool.js"); //连接池模块
/**
 * 1. getAllStaff , 获取所有员工信息
 * */
function getAllStaff(){
    "use strict";
    //返回一个promise对象
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff" ;
        pool.query(sql,[]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//2.getStaffById， 根据员工Id,获取员工信息
function getStaffById(id){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff where staffId = ?" ;
        pool.query(sql,[id]).then(function(data){
            resolve(data[0]); //返回一个对象，不是数组
        }).catch(function(err){
            reject(err);
        });
    });
}
//3..getTotalCount， 获取员工的总数量
function getStaffCount(){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select count(1) as num from staff" ;
        pool.query(sql,[]).then(function(data){
            console.log(data);
            resolve(data[0].num); //返回一个对象，不是数组
        }).catch(function(err){
            reject(err);
        });
    });
}
//4..getStaffPageBySearch， 获取员工信息，根据不同的数码与条件
//jobId为-1时，表示全部岗位   state 为-1 ： 表示全部状态
function getStaffPageBySearch(jobId,state,pageSize,currentPage){
    "use strict";
    return new Promise(function (resolve, reject) {
        pageSize = pageSize || 10;
        currentPage = currentPage || 1;
        let arr = new Array(); //参数数组
        let sql = "select * from staff where 1=1 " ;
        if(jobId!=-1){
            sql+="and jobId=?";
            arr.push(jobId);
        }
        if(state!=-1){
            sql+="and state=?";
            arr.push(state);
        }
        sql+=" limit ?,? ";
        let start= (currentPage-1)*pageSize;
        pageSize = parseInt(pageSize);
        arr.push(start,pageSize);
        pool.query(sql,arr).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//5..deleteStaffById， 根据员工Id，删除员工信息
function deleteStaffById(id){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "delete from staff where staffId = ?" ;
        pool.query(sql,[id]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//6.addStaff， 添加员工信息
function addStaff(staffName,staffUser,pwd,jobId,hiredate,state,createUser){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "insert into staff values(null,?,?,?,?,?,?,?,now())" ;
        pool.query(sql,[staffName,staffUser,pwd,jobId,hiredate,state,createUser])
        .then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//7.updateStaff， 修改员工信息
function updateStaff(staffId,staffName,staffUser,pwd,jobId,hiredate,state){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "update staff set staffName=?,staffUser=?,pwd=?,jobId=?,hiredate=?,state=?  where staffId = ?" ;
        pool.query(sql,[staffName,staffUser,pwd,jobId,hiredate,state,staffId])
            .then(function(data){
                resolve(data);
            }).catch(function(err){
                reject(err);
            });
    });
}
//8. loginStaff , 员工登录
//0: // 账号不存在 1 ://登录成功 2://密码不正确
function loginStaff(staffUser,pwd){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff where staffUser=?" ;
        pool.query(sql,[staffUser])
            .then(function(data){
                let result;
                if(data.length>0){
                    if(data[0].pwd==pwd){
                        result = 1 ; //登录成功
                    }else{
                        result = 2; //密码不正确
                    }
                }else{
                    result = 0; // 账号不存在
                }
                if(result==1)
                    resolve({code:result,data:data[0]});
                else
                    resolve({code:result});
            }).catch(function(err){
                reject(err);
            });
    });
}
module.exports={
    getAllStaff,
    getStaffById,
    getStaffCount,
    getStaffPageBySearch,
    deleteStaffById,
    addStaff,
    updateStaff,
    loginStaff
}