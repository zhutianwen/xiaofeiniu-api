//菜品类别相关的路由
//创建路由器
const express = require("express");
const pool = require("../../pool");
var router = express.Router();
module.exports = router;

/*API: get/admin/category
 客户端获取所有菜品类别 按菜品类别的编号升序排列
返回值形如：
[{cid:1,cname:"...."},{...}]
*/
router.get("/", (req, res) => {
    var sql = "SELECT * FROM xfn_category ORDER BY cid";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


/*API: DELETE /admin/category/:cid
含义:根据菜品编号的路由参数 删除该菜品
返回值形如:
{code:200,msg:"1 category deleted"}
{code:400,msg:"0 category deleted"}
*/
router.delete("/:cid", (req, res) => {
    //注意:删除菜品类别之前必须先把属于该类别的菜品的类别变化设置为nll
    var sql = "UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?";
    pool.query(sql, req.params.cid, (err, result) => {
        if (err) throw err;
        //至此指定，类别的菜品已经修改完毕

        var sql = "DELETE FROM xfn_category WHERE cid=?";
        pool.query(sql, req.params.cid, (err, result) => {
            if (err) throw err;
            //获取DELETE语句在数据库中影响的行数
            if (result.affetedRows > 0) {
                res.send({ code: 200, msg: "1 category deleted" })
            } else {
                res.send({ code: 400, msg: "0 category deleted" })
            }
        })
    })

})


/*
API: post/admin/category
请求参数:{cname:"xxx"}
含义:添加新的菜品类别 
返回值形如：
{cid:200,msg:"1 category added",cid:x}
*/
router.post("/",(req,res)=>{
   var data=req.body; 
   var sql="INSERT INTO xfn_category SET ?";
   pool.query(sql,data,(err,result)=>{
       if(err) throw err;
       res.send({code:200,msg:"1 category added"})
   })
})

/*
API: put/admin/category
请求参数:{cid:xx,cname:"xxx"}
含义:根据菜品的类别编号修改类别 
返回值形如：
{cid:200,msg:"1 category modified"}
{cid:400,msg:"0 category modified,not exists"}
{cid:401,msg:"0 category modified,no modification"}
*/
router.put("/",(req,res)=>{
    var data=req.body;
    console.log(data)
    var sql="UPDATE xfn_category  SET ? WHERE cid=?";
    pool.query(sql,[data,data.cid],(err,result)=>{
        if(err) throw err;
        if(result.changedRows>0){
            res.send({cid:200,msg:"1 category modified"})  
        }else if(result.affectedRows==0){
            res.send({cid:400,msg:"0 category modified,not exists"})
        }else if(result.affectedRows==1 && result.changedRows==0){
            //影响到1行 但修改0行--新值
            res.send({cid:401,msg:"0 category modified,no modification"})
        }
        
    })
})