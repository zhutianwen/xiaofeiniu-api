/*小肥牛扫码点餐项目子系统*/

const PORT=8090;
const express=require('express');
const cors=require("cors")
const bodyParser=require("body-parser");
const categoryRouter=require("./routes/admin/category")

//启动主服务器
var app=express();
app.listen(PORT,()=>{
    console.log('API服务器启动成功...');
});

//使用中间件
app.use(cors());
app.use(bodyParser.json());//把json格式的请求主题数据解析出来放入req.body属性


//挂载路由器
app.use("/admin/category",categoryRouter);