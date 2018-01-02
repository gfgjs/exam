/**
 * Created by yang on 2017/10/31.
 * BLL : ҵ���
 * Ա����ص�ҵ�����
 */
//ģ������
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
        ////0: // �˺Ų����� 1 ://��¼�ɹ� 2://���벻��ȷ
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
    staffModal.getStaffPageBySearch(-1,-1,null,1).then(function(data){//��һҳ��ʾ������
        staffInfo = data;

    }).then(function(){
        staffModal.getStaffCount().then(function(data){//Ա�����������ڷ�ҳ
            console.log(data);
                count = data;
        })}
    ).then(function() {
            jobModal.getAllJob().then(function (data) { //���еĸ�λ����
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