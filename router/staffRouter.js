/**
 * Created by yang on 2017/10/31
 */
const myexpress = require("express");
const staffRoute = myexpress.Router();
const staffControll = require("../controller/staffController.js");

staffRoute.route("/login.do").post(staffControll.staffLogin);
module.exports = staffRoute;
