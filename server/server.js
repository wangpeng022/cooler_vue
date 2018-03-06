let express = require("express")
let app = express();

let  LJ= require("./mock/LJ.json");
let  LDYCB= require("./mock/LDYCB.json");
let  LDECB= require("./mock/LDECB.json");
let  LQB= require("./mock/LQB.json");
let  LQT= require("./mock/LQT.json");

app.use(function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', '*');
    //允许客户端请求的方法
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    //允许客户端发送的请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //允许客户端发送Cookie
    res.header('Access-Control-Allow-Credentials', "true");
    //当客户端发向服务器发post跨域的时候，会先发送OPTIONS请求。如果服务器返回的响应头Access-Control-Allow-Methods里有POST的话，才会再次发送POST请求
    res.header('Content-Type','text/html;charset=utf-8');
    if (req.method == 'OPTIONS') {
      res.end();
    } else {
      next();
    }
  });

  	app.get("/api/lj",function (req,res) {
    res.end(JSON.stringify(LJ))
});
  	app.get("/api/ldycb",function (req,res) {
    res.end(JSON.stringify(LDYCB))
});
   	app.get("/api/ldecb",function (req,res) {
    res.end(JSON.stringify(LDECB))
});
    app.get("/api/lqb",function (req,res) {
    res.end(JSON.stringify(LQB))
});
    app.get("/api/lqt",function (req,res) {
    res.end(JSON.stringify(LQT))
});

let port = 3000;

app.listen(port,function () {console.log("http://127.0.0.1:"+port);
  })