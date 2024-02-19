// npm install express
// npm install body-parser
// npm install express-session
// npm install ejs
// npm install cors 
// npm install
// node -v
var express = require("express");
var app = express();
app.listen(5502,"127.0.0.1");    //app.listen(5502,"127.0.0.1"); 
 
// 以 express-session 管理狀態資訊 server端 儲存管理用戶
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
 // 指定 esj 為 Express 的畫面處理引擎，告訴 Express 使用 esj來呈現網頁
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);  // 選擇 .html 擴展名的檔案也使用 EJS 模板引擎
app.set('views', __dirname + '/views');   //檔案需放在/views

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );


// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );
 
app.get("/products.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("products.html", {userName: who});
})

app.get("/", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("homePage.html", {
        userName: who
    });
})

app.get("/homePage.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("homePage.html", { userName: who });
})
app.get("/login.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("login.html", { userName: who });
})
app.get("/products.html", function (req, res) {
    res.render("products.html", {  });
})
app.get("/news.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("news.html", { userName: who });
})
app.get("/plant_Care.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("plant_Care.html", { userName: who });
})
app.get("/plant_Geometrizan.html", function (req, res) {
    var who = req.session.who || "Guest";
    res.render("plant_Geometrizan.html", { userName: who });
})
app.get("/login.html", function (req, res) {
    res.render("login.html", {  });
})
app.get("/logout", function (req, res) {
    // req.session.who = "Guest";
    delete req.session.who;
    res.redirect("/");
})

app.post("/loginCheck", function (req, res) {
    req.session.who = req.body.who;
    //req.session.userName = userName;
    res.redirect("/");
    // res.send("I got form data. userName: " + req.body.who);
    // res.redirect("https://www.hinet.net");
})

console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("「Ctrl + C」可結束伺服器程式.");

