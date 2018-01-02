/**
 * Created by yang on 2017/10/30.
 */
"use strict";
//???????
const myexpress = require("express");
const bodyParser = require("body-parser"); //???post????
const path=require("path");
const myejs=require("ejs");
const logger = require("morgan");
var favicon = require('serve-favicon');
const session = require("express-session");
const cookieparse = require("cookie-parser");
//¡¤??????
const staffRoute = require("./router/staffRouter.js");
const jobRoute = require("./router/jobRouter.js");
const viewRoute = require("./router/viewRouter.js");
const app = myexpress();


//// cookie ?????????
app.use(cookieparse());
app.use(session({
    name:"testapp",  //?????name ????cookie??????????cookie ??name?connect.sid;
    secret:"1234",
    cookie:{maxAge:300000},  // ???¦Ë?????
    rolling:true, //????cookie???????? ???????false
    resave:true //???¡À??—¨
}));
//???post ?????????
app.use(bodyParser.urlencoded({extended:false}));


// ????????????????
app.use(logger("dev"));
app.use(favicon(__dirname + '/public/favicon.ico.png'));
app.set("views",__dirname+"/views");
app.engine("html",myejs.__express);//???????html????
app.set("view engine","html");
app.use(myexpress.static(path.join(__dirname,"public")));

//¡¤?????
app.use("/",viewRoute);
app.use("/staff",staffRoute);
app.use("/job",jobRoute);
//???????
app.listen(8888,function(){
    console.log("service started");
})