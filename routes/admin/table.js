//桌台路由器
const express=require('express');
const pool=require('../../pool');
var router=express.Router();
module.exports=router


// get /admin/table
//获取所有的桌台信息
router.get('/',(req,res)=>{
  var sql="SELECT * FROM xfn_table ORDER BY tid";
  pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result);
  })
})


// put /admin/settings
//修改桌台
router.put('/',(req,res)=>{
    var sql="UPDATE xfn_settings SET ?";
    pool.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:"修改成功"});
    })
  })
  
