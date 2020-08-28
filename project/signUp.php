<?php
header("content-type:text/html;charset=utf-8");
open_sql();
function open_sql(){
    // 数据库连接(地址，用户名，密码，库名，端口号)
   $sql=mysqli_connect("localhost","root","123456","xinhua","3306");
//    获取当前是否连接上数据库 如果返回为1就是没有连接上
    if(mysqli_connect_errno()) return;
    // 使用MySql语句 mysqli_query(打开的数据库对象,"MySQL语句")
    // echo $_POST["tell"];
    $res=mysqli_query($sql,"SELECT * FROM `user` WHERE `tell`='$_POST[tell]'");
    // $res->num_rows  表示查询到的结果有多少条
    
    if($res->num_rows>0){
        $arr = mysqli_fetch_assoc($res);
        if ($arr["password"] === $_POST["password"]) {
            echo "<script>
            alert('登陆成功');
                location.href='http://10.30.156.215:8888/index.html';
         </script>";
        } else {
            echo "<script>
            alert('密码错误');
            location.href='http://10.30.156.215:8888/signUp.html';
     </script>";
    
        }
    }
    if($res->num_rows<=0){
        echo "<script>
        alert('用户名木找到');
        location.href='http://10.30.156.215:8888/signUp.html';
        </script>";
    }   
   
}