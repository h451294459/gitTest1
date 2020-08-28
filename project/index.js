window.onload = function () {
    //轮播图
    var arr = $(".index li");
    var index;
    var j = 0;
    //左侧导航栏
    sideNav()
    function sideNav() {
      let sideindex;
      let sideindexString;
      $(".ceshi").on({
        "mouseenter": function () {
          sideindex = $(".ceshi").index($(this)) - 0 + 1;
          console.log(sideindex);
          sideindexString = "." + "Secondary-" + String.fromCharCode(0x60 + sideindex);
          console.log(sideindexString);
          $(sideindexString).css("display", "block");
        },
        "mouseleave": function () {
          $(sideindexString).css("display", "none");
        }
      })
    }

    //轮播图实现
    banner();
    $(arr).eq(j).css("background-color", "yellow");
    $(".banner").on({
      "mouseenter": function () {
        console.log(j);
        clearInterval(index);
        $(".banneranniu").css("display", "block");
        $(".banneranniu-left").click(function () {
          j--;
          change();
          if (j < 0) j += 7;
        })
        $(".banneranniu-right").click(function () {
          j++;
          change();
          if (j > 6) j = j % 7;

        })
      },
      "mouseleave": function () {
        banner();
        $(".banneranniu").css("display", "none");
        $('.banneranniu').unbind("click");
      }
    })
    $(arr).on({
      "mouseenter": function () {
        $(this).css("background-color", 'yellow');
        j = $(arr).index($(this));
        change();
      },
    })

    //json数据加载
    var arrClick = [];
    $(".pp-one").css("background-color",'yellow');
    $.ajax({
      type: "get",
      url: "http://10.30.156.215:8888/index.json",
      success: function (arr) {
        var str = ``;
        $.each(arr, function (index, value) {
          if(index<=6){
          str += `<li id="${value.id}">
        </br>
        <a href="http://10.30.156.215:8888/shopping-cat.html"><img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
      </li>`;
      }
        })
        console.log(str);
        $(".p-party ul").html(str);
        $(".p-party").on("click", "li", eventDelegate);
      },
      error: function (msg) {
        console.log(msg);
      }
    })

    $(".pp-one").click(function(){
      $(".pp-one").css("background-color",'yellow');
      $(".pp-two").css("background-color",'white');
      $(".pp-three").css("background-color",'white');
      $.ajax({
      type: "get",
      url: "http://10.30.156.215:8888/index.json",
      success: function (arr) {
        var str = ``;
        $.each(arr, function (index, value) {
          if(index<=6){
          str += `<li id="${value.id}">
        </br>
        <a href="http://10.30.156.215:8888/shopping-cat.html"><img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
      </li>`;
      }
        })
        console.log(str);
        $(".p-party ul").html(str);
        $(".p-party").on("click", "li", eventDelegate);
      },
      error: function (msg) {
        console.log(msg);
      }
    })
    })

    $(".pp-two").click(function(){
      $(".pp-one").css("background-color",'white');
      $(".pp-two").css("background-color",'yellow');
      $(".pp-three").css("background-color",'white');
      $.ajax({
      type: "get",
      url: "http://10.30.156.215:8888/index.json",
      success: function (arr) {
        var str = ``;
        $.each(arr, function (index, value) {
          if(index>6&&index<=14){
          str += `<li id="${value.id}">
        </br>
        <a href="http://10.30.156.215:8888/shopping-cat.html"><img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
      </li>`;
      }
        })
        console.log(str);
        $(".p-party ul").html(str);
        $(".p-party").on("click", "li", eventDelegate);
        
      },
      error: function (msg) {
        console.log(msg);
      }
    })
    })

    $(".pp-three").click(function(){
      $(".pp-one").css("background-color",'white');
      $(".pp-two").css("background-color",'white');
      $(".pp-three").css("background-color",'yellow');
      $.ajax({
      type: "get",
      url: "http://10.30.156.215:8888/index.json",
      success: function (arr) {
        var str = ``;
        $.each(arr, function (index, value) {
          if(index>14){
          str += `<li id="${value.id}">
        </br>
        <a href="http://10.30.156.215:8888/shopping-cat.html"><img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
      </li>`;
      }
        })
        console.log(str);
        $(".p-party ul").html(str);
        $(".p-party").on("click", "li", eventDelegate);
        
      },
      error: function (msg) {
        console.log(msg);
      }
    })
    })

    $.ajax({
      type: "get",
      url: "http://10.30.156.215:8888/index.json",
      success: function (arr) {
        var str = ``;
        $.each(arr, function (index, value) {
          if(index<=6){

          
          str += `<li id="${value.id}">
        </br>
        <a href="http://10.30.156.215:8888/shopping-cat.html"><img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
      </li>`;
    }
        })
        $(".p-party ul").html(str);
        $(".p-party").on("click", "li", eventDelegate);
      },
      error: function (msg) {
        console.log(msg);
      }
    })
   
    //购物车 物品数量
    
    if ($.cookie("shoppingcount")) {
      var count=0;
      arrClick = JSON.parse($.cookie("shoppingcount"));
      $.each(arrClick, function (index, value) {
        console.log(value.item);
        count += (value.item-0);
      })
   console.log(count);
      $(".num").html(count);
    }


    // 事件委托
    function eventDelegate() {
      var  arrClickRead = { id: $(this).attr("id") };
      $.cookie("chooseRead", JSON.stringify(arrClickRead),
        {
          expires: 7
        });
    }
    //点击左右按钮
    function banner() {
      index = setInterval(() => {
        j++;
        change();
      }, 2000);
    }
    //改变轮播图样式
    function change() {
      $(arr).not(":eq(j)").css("background-color", "red");
      $(arr).eq(j).css("background-color", "yellow");
      $(".box").stop().animate({
        "left": `${-j * 1519 - 1519}` + `px`
      }, 500);
      if(j==7){
        j=j%7;
        $(arr).not(":eq(j)").css("background-color", "red");
      $(arr).eq(j).css("background-color", "yellow");
        $(".box").animate({
        "left": `${-j * 1519 - 1519}` + `px`
      }, 0);
      
      }else if(j<0){
        j+=7;
        $(arr).not(":eq(j)").css("background-color", "red");
      $(arr).eq(j).css("background-color", "yellow");
        $(".box").animate({
        "left": `${-j * 1519 - 1519}` + `px`
      }, 0);
      }
    }
  }