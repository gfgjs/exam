/**
 * Created by yang on 2017/10/31.
 * BLL : ҵ���
 * ��λ��ص�ҵ�����
 *  1. JobListData , ���ظ�λ��������Ϣ
 */
//ģ������
const jobModal = require("../modal/jobModal.js");
//1. JobListData , ���ظ�λ��������Ϣ
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