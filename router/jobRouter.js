/**
 * Created by yang on 2017/10/31
 */
const myexpress = require("express");
const jobRoute = myexpress.Router();
const jobControll = require("../controller/jobController.js");

jobRoute.route("/jobListData").get(jobControll.JobListData);
module.exports = jobRoute;
