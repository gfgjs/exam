/**
 * Created by yang on 2017/10/31.
 * DAO : ���ݲ�
 * Ա������صĲ���
 */
//����ģ��
const pool = require("../modal/sqlPool.js"); //���ӳ�ģ��
/**
 * 1. getAllStaff , ��ȡ����Ա����Ϣ
 * */
function getAllStaff(){
    "use strict";
    //����һ��promise����
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff" ;
        pool.query(sql,[]).then(function(data){
            resolve(data);
        }).catch(function(err){
            reject(err);
        });
    });
}
//2.getStaffById�� ����Ա��Id,��ȡԱ����Ϣ
function getStaffById(id){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff where staffId = ?" ;
        pool.query(sql,[id]).then(function(data){
            resolve(data[0]); //����һ�����󣬲�������
        }).catch(function(err){
            reject(err);
        });
    });
}
//3..getTotalCount�� ��ȡԱ����������
function getStaffCount(){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select count(1) as num from staff" ;
        pool.query(sql,[]).then(function(data){
            console.log(data);
            resolve(data[0].num); //����һ�����󣬲�������
        }).catch(function(err){
            reject(err);
        });
    });
}
//4..getStaffPageBySearch�� ��ȡԱ����Ϣ�����ݲ�ͬ������������
//jobIdΪ-1ʱ����ʾȫ����λ   state Ϊ-1 �� ��ʾȫ��״̬
function getStaffPageBySearch(jobId,state,pageSize,currentPage){
    "use strict";
    return new Promise(function (resolve, reject) {
        pageSize = pageSize || 10;
        currentPage = currentPage || 1;
        let arr = new Array(); //��������
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
//5..deleteStaffById�� ����Ա��Id��ɾ��Ա����Ϣ
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
//6.addStaff�� ���Ա����Ϣ
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
//7.updateStaff�� �޸�Ա����Ϣ
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
//8. loginStaff , Ա����¼
//0: // �˺Ų����� 1 ://��¼�ɹ� 2://���벻��ȷ
function loginStaff(staffUser,pwd){
    "use strict";
    return new Promise(function (resolve, reject) {
        let sql = "select * from staff where staffUser=?" ;
        pool.query(sql,[staffUser])
            .then(function(data){
                let result;
                if(data.length>0){
                    if(data[0].pwd==pwd){
                        result = 1 ; //��¼�ɹ�
                    }else{
                        result = 2; //���벻��ȷ
                    }
                }else{
                    result = 0; // �˺Ų�����
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