// //菜品相关路由
const express=require("express");
const pool=require("../../pool");
var router=express.Router();
module.exports=router;

/*
API get /admin/disn
获取所有的菜品（按类别进行分类）
返回数据
[
    {cid:1,cname:"肉类",dishList[{},{},{}....]}
     {cid:2,cname:"丸滑",dishList[{},{},{}....]}
      {cid:2,cname:"菌菇类",dishList[{},{},{}....]}
       {cid:2,cname:"河鲜类",dishList[{},{},{}....]}
]
*/
router.get("/",(req,res)=>{
    //查询菜品类别
    var sql="SELECT cid,cname FROM xfn_category ORDER BY cid";
    pool.query(sql,(err,result)=>{
        if(err) throw err
      //  res.send(result);
      // 循环遍历每个菜品类别 查询该类别下有哪些菜品
      var categoryList=result;//类别列表
      var finishCount=0;//已经查询完菜品的类别数量
      for(let c of categoryList){
          pool.query("SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC",c.cid,(err,result)=>{
              if(err) throw err;
              c.dishList=result;
              finishCount++;
              //必须保证所有的类别下的菜品都查询完成才能发送响应消息
              if(finishCount==categoryList.length){
                  res.send(categoryList);
              }
          })
      }
    })
})


/*
接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
请求参数:
post /admin/dish/image 
*/
const multer=require("multer");
const fs=require("fs");
var upload=multer({
    dest:"tmp/"    //指定客户端上传的文件临时存储路径
})

router.post('/image',upload.single("dishImg"),(req,res)=>{
 //   console.log(req.file); 客户端上传的图片
 //   console.log(req.body);  客户端随同图片提交的字符数据
   //把客户端上传的文件从临时目录转移到永久的图片路径下
   var tmpFile=req.file.path;//临时文件 
   var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf("."))
   var newFile=randFileName(suffix);//目标文件名
   fs.rename(tmpFile,"img/dish/"+ newFile,()=>{
       res.send({code:200,msg: "upload succ",fileName:newFile}//临时文件转移
    )
   })
  // res.send({});
})
//生成一随机文件名
//suffix 表示要生成的文件名中的后缀
function randFileName(suffix){
  var time=new Date().getTime(); //当前系统时间
  var num=Math.floor(Math.random()*(10000-1000)+1000)//4位随机数
  return time+'-'+num+suffix;
}


/*
添加菜品
post /admin/dish
*/
router.post("/",(req,res)=>{
    var sql="INSERT INTO xfn_dish SET ?";
    pool.query(sql,req.body,(err,result)=>{
         if(err) throw err;
         res.send({code:200 ,msg:"dish add succ",dishId:result.insertId})
    })
})



/*删除商品

*/



/*修改菜品

*/