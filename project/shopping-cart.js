window.onload=function(){
  //获取json中的数据进行数据加载
 var obj=JSON.parse($.cookie("chooseRead"));
 var arrNum=[];
 var count=0;
//  console.log(obj);

 $.ajax({
   type:"get",
   url:"10.30.156.185:8888/index.json",
   success(arr){
     $.each(arr,function(index,value){ 
      if(value.id==obj.id){
        console.log(value.id);
        var str= ``;
        str+=`<div class="littleBox">
    <img src="${value.mainImage}" alt="" id="littleImg">
    <div class="loupe"></div>
  </div>
    <div class="bigBox">
      <img src="${value.mainImage}" alt="">
    </div>
      <div class="goods-right">
        <p class="goods-name">${value.name}</p>
        <h3 class="goods-tell">${value.advertise}</h3>
        <p class="goods-writer">${value.otherAttributeMap.BASIC.出版时间.attrKey}:${value.otherAttributeMap.BASIC.出版时间.attrVal} ${value.otherAttributeMap.BASIC.出版社.attrKey}${value.otherAttributeMap.BASIC.出版社.attrVal}${value.otherAttributeMap.BASIC.作者.attrKey}${value.otherAttributeMap.BASIC.作者.attrVal}</p>
        <p class="change-num">数量  <button class="reduce">-</button><span class="itemNum">1</span><button class="add">+</button></p> 
        <ul class="choose-shopping">
          <li class="goods-chooseadd">加入购物车</li>
          <li class="goods-buy">立即购买</li>
        </ul>
    
  </div>`;
  $(".goods").html(str);
      }
     
     })
   }
 })
 //添加事件委托点击按钮时
 //1判断是否存在shoppingcount 如果存在就进行数据提取添加数量到购物车数量中去
 
 //当点击时 使购物车中的数量进行变化
 if($.cookie("shoppingcount")){
       
       arrNum=JSON.parse($.cookie("shoppingcount"));
       console.log(JSON.parse($.cookie("shoppingcount")));
       $.each(arrNum,function(index,value){
       count+=(value.item-0);
       })
       console.log( arrNum);
       $(".num").html(count);
     }
    
     $(".goods").on("click","button,li",function(){
       if($(".goods li").index($(this))==0){
        //点击提交时 获取input购物车数量
        var itemnum=$(".itemNum").text();
        var boolgoods=false;
        if($.cookie("shoppingcount")){
          $.each(arrNum,function(index,value){
            if(value.id==obj.id){
             value.item=(value.item-0)+(itemnum-0);
             boolgoods=true;
            }
          })
          if(!boolgoods){
            arrNum.push({id:obj.id,item:itemnum});
          }
        }else{
          arrNum.push({id:obj.id,item:itemnum});
          console.log("1");
        }
        itemnum=0;
        $.each(arrNum,function(index,value){
          itemnum+=(value.item-0);
        })
        $(".num").html((itemnum-0));
        $.cookie("shoppingcount",JSON.stringify(arrNum),{
          expries:7
        })
       
       }else if($(".goods button").index($(this))==0){
        if($(".itemNum").text()==1){
          $(".itemNum").html($(".itemNum").text())
        }else if($(".itemNum").text()>1){
          $(".itemNum").html($(".itemNum").text()-1)
        }

       }else if($(".goods button").index($(this))==1){
        //  console.log($(".itemNum").text())
        $(".itemNum").html(($(".itemNum").html()-0)+(1-0));
       }
     })
     
       //放大镜
       //添加事件委托
       $(".goods ").on("mouseenter",".littleBox",function(){
        $(".loupe").add(".bigBox").show();
        }).on("mouseleave",".littleBox",function(){
          $(".loupe").add(".bigBox").hide();
          $(".littleBox").unbind("mousemove");
        }).on("mousemove",".littleBox",function(e){
          var l = e.clientX - $(this).offset().left - 97.5;
                l = Math.max(l, 0);
                l = Math.min(185, l);
                var t = e.clientY - $(this).offset().top - 97.5;
                t = Math.max(t, 0);
                t = Math.min(185, t);
              $(".loupe").css({
                left: l,
                top: t
       })
       $(".bigBox img").css({
                left: -2 * l,
                top: -2 * t
              })
        })
        // mouseenter(function(){
      //    $(".loupe").add(".bigBox").show();
      //  }).mouseleave(function(){
      //   $(".loupe").add(".bigBox").hide();
      //   $(".littleBox").unbind("mousemove")
      //  }).mousemove(function(e){
      //           var l = e.clientX - $(this).offset().left - 97.5;
      //           l = Math.max(l, 0);
      //           l = Math.min(185, l);
      //           var t = e.clientY - $(this).offset().top - 97.5;
      //           t = Math.max(t, 0);
      //           t = Math.min(185, t);
      //         $(".loupe").css({
      //           left: l,
      //           top: t
      //  })
      //  $(".bigBox img").css({
      //           left: -2 * l,
      //           top: -2 * t
      //         })
      //       })
          
       
      //  $(function(){
      //       $("#small").mouseenter(function(){
      //         $("#mark").add("#big").show();
      //       }).mouseleave(function(){
      //         $("#mark").add("#big").hide();
      //       }).mousemove(function(ev){
      //           var l = ev.clientX - $(this).offset().left - 100;
      //           l = Math.max(l, 0);
      //           l = Math.min(300, l);
      //           var t = ev.clientY - $(this).offset().top - 100;
      //           t = Math.max(t, 0);
      //           t = Math.min(529, t);
      //         $("#mark").css({
      //           left: l,
      //           top: t
      //         })
      //         //放大的图片，反方向对应倍数移动
      //         $("#big img").css({
      //           left: -2 * l,
      //           top: -2 * t
      //         })
      //       })
      //     })



    sideNav();
    $(".side-nav>div").not(".side-nav-one"  ).hide();
    $(".side-nav").css("height", "40px");
    $(".side-nav").on({"mouseenter":function () {
        $(".side-nav div").show();
        $(".side-nav").stop().animate({
            "height":"560px"
        },300)
        // $(".side-nav").css("height", "560px");
    },
    "mouseleave":function () {
        $(".side-nav>div").not(".side-nav-one").hide();
        $(".side-nav").stop().animate({
            "height":"40px"
        },200)
    } 
})

    function sideNav(){
  let sideindex;
  let sideindexString;
  $(".ceshi").on({
    "mouseenter":function(){
    sideindex=$(".ceshi").index($(this))-0+1;
    console.log(sideindex);
     sideindexString= "."+"Secondary-"+String.fromCharCode(0x60+sideindex);
     console.log(sideindexString);
   $(sideindexString).css("display","block");
  },
  "mouseleave":function(){
    $(sideindexString).css("display","none");
  }
  })
}
}