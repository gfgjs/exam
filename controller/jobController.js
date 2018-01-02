/**
 * Created by yang on 2017/10/31.
 * BLL : 业务层
 * 岗位相关的业务操作
 *  1. JobListData , 返回岗位的所有信息
 */
//模块引用
const jobModal = require("../modal/jobModal.js");
//1. JobListData , 返回岗位的所有信息
function JobListData(req,res){
    "use strict";
    jobModal.getAllJob().then(function(data){
        res.json({code:200,data:data});
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}
module.exports={
    JobListData
}