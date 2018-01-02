/**
 * Created by yang on 2017/10/31.
 * BLL : 业务层
 * 员工相关的业务操作
 */
//模块引用
    "use strict";
const staffModal = require("../modal/staffModal.js");
const jobModal = require("../modal/jobModal.js");
function staffLogin(req,res){
    "use strict";
    console.log(req.body)
    let staffName = req.body.name;
    let pwd = req.body.pwd;
    staffModal.loginStaff(staffName,pwd).then(function(data){
        if(data.code==1){
            req.session.userInfo = data.data;
        }
        res.send({code:200,data:data.data});
        ////0: // 账号不存在 1 ://登录成功 2://密码不正确
    }).catch(function(err){
        console.log(err);
        res.send({code:500});
    });
}

function Index(req,res){
    let name = req.session.userInfo.staffUser;
    res.render('index',{"name":name});
}
function listFirstPage(req,res){
    var staffInfo;
    var count ;
    var jobList;
    staffModal.getStaffPageBySearch(-1,-1,null,1).then(function(data){//第一页显示的数据
        staffInfo = data;

    }).then(function(){
        staffModal.getStaffCount().then(function(data){//员工总数，用于分页
            console.log(data);
                count = data;
        })}
    ).then(function() {
            jobModal.getAllJob().then(function (data) { //所有的岗位数据
                jobList = data;
                let username = req.session.userInfo.staffUser;
                console.log(staffInfo);
                console.log(count);
                res.render("staffList", {"staff": staffInfo, "job": jobList, "count": count, "name": username});
            }).catch(function (err) {
                console.log(err);
                res.send(err);
            });
        });



}
function isLogin(req,res,next){
    if(!req.session.userInfo){
        res.redirect('/login.html');
    }else{
        next();
    }
}
module.exports={
    staffLogin,
    Index,
    isLogin,
    listFirstPage
}