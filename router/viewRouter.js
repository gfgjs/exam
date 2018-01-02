/**
 * Created by yang on 2017/10/31
 */
const myexpress = require("express");
const viewRoute = myexpress.Router();
const staffController = require("../controller/staffController.js");

viewRoute.route("/staff/login.do").post(staffController.staffLogin); //注登录，一定要在全局判断是否登录的前面
viewRoute.route("/*").all(staffController.isLogin); //全局判断，是否进行了登录
viewRoute.route("/index.html").get(staffController.Index);
viewRoute.route("/staffList.html").get(staffController.listFirstPage);
module.exports = viewRoute;
