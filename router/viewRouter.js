/**
 * Created by yang on 2017/10/31
 */
const myexpress = require("express");
const viewRoute = myexpress.Router();
const staffController = require("../controller/staffController.js");

viewRoute.route("/staff/login.do").post(staffController.staffLogin); //ע��¼��һ��Ҫ��ȫ���ж��Ƿ��¼��ǰ��
viewRoute.route("/*").all(staffController.isLogin); //ȫ���жϣ��Ƿ�����˵�¼
viewRoute.route("/index.html").get(staffController.Index);
viewRoute.route("/staffList.html").get(staffController.listFirstPage);
module.exports = viewRoute;
