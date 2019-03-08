// //管理员相关路由
 const express=require("express");
 const pool=require("../../pool")
 var router=express.Router();

module.exports=router;


// //API:GET/admin/login
// //请求数据:{aname:"xxx",apwd:"xxx"}
// //返回数据：{code:200,msg:"loginsucc"}
// //{code:400,msg:"aname or apwd err"}
router.get("/login/:aname/:apwd",(req,res)=>{
    var aname=req.params.aname;
    var apwd=req.params.apwd;
    var sql="SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)";
    pool.query(sql,[aname,apwd],(err,result)=>{
        if(err) throw err
        if(result.length>0){
            res.send({code:200,msg:"登陆成功"})
        }else{
            res.send({code:400,msg:"管理员名或密码错误"})
        }

    });
})

// /* 
// API: patch  /admin
// 请求数据:{aname:"xxx",oldpwd:"xxx",newpwd:xxx""}
// 根据用户名和密码修改管理员密码
// 返回数据
// ：{code:200,msg:"修改成功"}
// //{code:400,msg:"用户名或密码错误"}
// {code:401,msg:"修改失败"}
// */
router.patch("/",(req,res)=>{
    var data=req.body;
   var sql="SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)";
   pool.query(sql,[data.aname,data.oldPwd],(err,result)=>{
       if(err) throw err;
       if(result.length==0){
           res.send({code:400,msg:"用户名或密码错误"})
           return;
       }
       var sql1="UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?";
       pool.query(sql1,[data.newPwd,data.aname],(err,result)=>{
           if(err) throw err;
           if(result.changedRows>0){
              res.send({code:200,msg:"修改成功"})
           }else{
               res.send({code:401,msg:"密码为做修改"})
           }
       })
   })
})