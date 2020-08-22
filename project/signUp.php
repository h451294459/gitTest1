<?php
header("content-type:text/html;charset=utf-8");
open_sql();
function open_sql(){
    // 数据库连接(地址，用户名，密码，库名，端口号)
   $sql=mysqli_connect("localhost","root","123456","xinhua","3306");
//    获取当前是否连接上数据库 如果返回为1就是没有连接上
    if(mysqli_connect_errno()) return;
    // 使用MySql语句 mysqli_query(打开的数据库对象,"MySQL语句")
    $res=mysqli_query($sql,"SELECT * FROM `user` WHERE `tell`='$_POST[tell]'");
    // $res->num_rows  表示查询到的结果有多少条
    
    if($res->num_rows>0){
        $arr = mysqli_fetch_assoc($res);
        if ($arr["password"] === $_POST["password"]) {
            echo "<script>
           $.ajax({
               type:get,
               url:='http://localhost:8888/index.html&id=$_POST[tell]',
               success：functiom(){
                localhost.href=`http://localhost:8888/index.html&id=$_POST[tell]`
               }
           })
         </script>";
        } else {
            echo "密码错误";
        }
    }else{
        echo "此用户名未拥有";
    }
   
}