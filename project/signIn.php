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
 
    // echo $res->num_rows;
    // echo $_POST['tell'];
    // $res->num_rows  表示查询到的结果有多少条
    if($res->num_rows>0){
        echo "<script>
            location.href='http://10.30.156.215:8888/signIn.html';
            alert('用户名重复，请重新输入'); 
         </script>";
         return;
    }
    
    $result=mysqli_query($sql,"INSERT INTO `user`(`tell`, `password`) VALUES ('$_POST[tell]','$_POST[password]')");
    echo $result;
    echo "1";
    
    if($result){
        
        echo "<script>
            location.href='http://10.30.156.215:8888/signUp.html';
            alert('注册成功，请登录');
        </script>";
    }
}