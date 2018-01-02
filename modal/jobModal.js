/**
 * Created by yang on 2017/10/31.
 * DAO : ���ݲ�
 * ��λ����صĲ���
 */
//����ģ��
const pool = require("../modal/sqlPool.js"); //���ӳ�ģ��
/**
 * 1. getAllJob , ��ȡ���и�λ��Ϣ
 * */
function getAllJob(){
    "use strict";
    //����һ��promise����
    return new Promise(function (resolve, reject) {
        let sql = "select * from job" ;
        pool.query(sql,[]).then(function(data){   //pool.query���ص���һ��promise�������Կ���ʹ��then
            //�ɹ�ִ��ִ�еķ���
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}

module.exports={
    getAllJob
};