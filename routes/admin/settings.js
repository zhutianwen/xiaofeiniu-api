//全局设置
const express=require('express');
const pool=require('../../pool');
var router=express.Router();
module.exports=router


// get /admin/settings
//获取所有的全局设置信息
router.get('/',(req,res)=>{
  var sql="SELECT * FROM xfn_settings LIMIT 1";
  pool.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result[0]);
  })
})


// put /admin/settings
//获取所有的全局设置信息
router.put('/',(req,res)=>{
    var sql="UPDATE xfn_settings SET ?";
    pool.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:"修改成功"});
    })
  })
  
