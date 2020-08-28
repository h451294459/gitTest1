
    var arrPrice = [];
    var arrShopping = [];

    // var t=0;
    //送货地址
    $(".provice").click(function () {
      $(".provice-num").show();
      $(".provice").css("border-color", "red");
      $.ajax({
        type: "get",
        url: "http://10.30.156.215:8888/address.json",
        success: function (arrAddress) {
          let str = "";
          $.each(arrAddress, function (index, value) {
            str += ` <span class="${value.code}">${value.name}</span>`;

          })
          $(".provice-num").html(str);
        }
      })
    })
    $(".provice-num").on("click", "span", function () {
      let provice = $(this).attr("class");
      $(".provice-num").hide();
      $(".city-num").show();
      $(".provice").html($(this).html());
      $(".city").css("border-color", "red");
      $.ajax({
        type: "get",
        url: "http://10.30.156.215:8888/address.json",
        success: function (arrProvice) {
          console.log(arrProvice);
          let str = "";
          for (let i = 0; i < arrProvice.length; i++) {
            console.log(arrProvice[i].name);
            console.log(provice);
            if (arrProvice[i].code == provice) {

              for (let j = 0; j < arrProvice[i].children.length; j++) {
                str += ` <span class="${arrProvice[i].children[j].code}">${arrProvice[i].children[j].name}</span>`;
                console.log(str);
              }
            }

          }
          $(".city-num").html(str);
          console.log(str);
        }
      })
    })

    $(".city-num").on("click", "span", function () {
      let city = $(this).attr("class");
      $(".city-num").hide();
      $(".area-num").show();
      $(".city").html($(this).html());
      $(".area").css("border-color", "red");
      $.ajax({
        type: "get",
        url: "http://10.30.156.215:8888/address.json",
        success: function (arrCity) {
          let str = "";
          for (let i = 0; i < arrCity.length; i++) {
            for (let j = 0; j < arrCity[i].children.length; j++) {
              if (city == arrCity[i].children[j].code) {
                for (let k = 0; k < arrCity[i].children[j].children.length; k++) {
                  str += ` <span class="${arrCity[i].children[j].children[k].code}">${arrCity[i].children[j].children[k].name}</span>`;
                }
              }
            }
          }
          $(".area-num").html(str);
          console.log(str);
        }
      })
    })
    $(".area-num").on("click", "span", function () {
      $(".area-num").hide();
      $(".area").html($(this).html());
    })
    //订单
    init()
    //下面的数据增加监听每次点击li重新加载订单
    $(".shoppingAllbook").on("click", "li", function () {
      let b = $(this);
      let bool = false;
      $.cookie("chooseRead", { id: $(b).attr("class"), item: 1 });
      $.each(arrShopping, function (index, value) {
        if (value.id == $(b).attr("class")) {
          bool = true;
        }
      })
      if (!bool) {
        arrShopping.push({ id: $(b).attr("class"), item: 1 });
        $.cookie("shoppingcount", JSON.stringify(arrShopping), {
          expries: 7
        })
        console.log(arrShopping);
        init();
      }
    })
    // 数量加减操作
    $("table").on("click", "button", function () {
      //  console.log($(`#${ Math.floor($("table button").index($(this))/2)}`));
      let a = $(`#${Math.floor($("table button").index($(this)) / 2)}`);
      let b = $("table button").index($(this)) % 2
      console.log($(a).text());
      if (!b) {
        if ($(a).text() == 1) {
          $(a).text(1);
        } else if ($(a).text() > 1) {
          $(a).text($(a).text() - 1);
        }
      } else {
        $(a).text(($(a).text() - 0) + (1 - 0));
      }
      //更新cookie
      $.each(arrShopping, function (index, value) {
        if ($(a).parent().parent().attr("id") == value.id) {
          // console.log(value.id);
          $(".num").html(($(a).text() - value.item) + ($(".num").text() - 0));

          value.item = $(a).text();
        }
      })
      //更新数据 
      $.cookie("shoppingcount", JSON.stringify(arrShopping), {
        expries: 7
      })
      let t = 0;
      let check = $("input[name='check']");
      t = allPrice(arrShopping, arrPrice, check, t);
      $(".allprice").html(t / 100);
    })
    //删除操作

    $("tbody").on("click", ".delete", function () {
      console.log($(this).parent().parent().attr("id"));
      let c = $(this).parent().parent().attr("id");
      $.each(arrShopping, function (index, value) {
        if (c == value.id) {
          console.log("1");
          arrShopping.splice(index, 1);
          $(".num").html($(".num").text() - value.item);
        }
      })
      $(this).parent().parent().css("display", "none");
      $.cookie("shoppingcount", JSON.stringify(arrShopping), {
        expries: 7
      })
      init()
    })

    //全选
    $("input[name='checkAll']").click(function () {
      let check = $("input[name='check']");
      console.log($(this));
      let bool = $(this)[0].checked;

      console.log(bool);
      $.each(check, function (index, value) {
        value.checked = bool;
      })

      var t = 0;
      t = allPrice(arrShopping, arrPrice, check, t);
      $(".allprice").html(t / 100);
    })
    console.log($("input[name='check']"));
    $("tbody").on("click", "input[name='check']", function () {
      let check = $("input[name='check']");
      let bool = true;
      $.each(check, function (index, value) {
        if (value.checked == false) {
          bool = false;
        }
      })
      if (bool) {
        $("input[name='checkAll']")[0].checked = true;
      } else {
        $("input[name='checkAll']")[0].checked = false;
      }
      var t = 0;
      t = allPrice(arrShopping, arrPrice, check, t);

      $(".allprice").html(t / 100);
    })






    function allPrice(arrShopping, arrPrice, check, t) {
      $.each(check, function (index, value) {
        console.log($(value).parent());
        if (value.checked == true) {
          $.each(arrShopping, function (index1, value1) {
            if ($(value).parent().parent().attr('id') == value1.id) {
              console.log(value1.id);
              $.each(arrPrice, function (index2, value2) {
                if (value2.id == value1.id) {
                  t = t - 0;
                  console.log(value2.item);
                  console.log(value1.price);
                  t += value1.item * value2.price;
                  //  console.log(t/100);
                }
              })
            }
          })

        }
      })
      return t;
    }

    function init() {
      var count = 0;
      if ($.cookie("shoppingcount")) {
        //数据加载
        arrShopping = JSON.parse($.cookie("shoppingcount"));
        $.ajax({
          type: "get",
          url: "http://10.30.156.215:8888/index.json",
          success: function (arr) {
            var str = ``;
            $.each(arrShopping, function (index1, value1) {
              $.each(arr, function (index2, value2) {
                if (value1.id == value2.id) {
                  arrPrice[index1] = { id: value1.id, price: value2.highPrice };
                  count += (value1.item - 0);
                  str += `<tr class="hang" id="${value1.id}">
          <th scope="row" > <input type="checkbox" name="check"><img src="${value2.mainImage}" alt=""></th>
          <td class="bookName">${value2.name}</td>
          <td><button >-</button><span class="itemNum" id=${index1}>${value1.item}</span><button>+</button></td>
          <td>单价￥<span class="rich">${value2.highPrice / 100}</span>元 </td>
          <td  ><span class="delete">删除</span></td>
        </tr>`
                }

              })
            })
            var str1 = '';
            $.each(arr, function (index, value) {
              str1 += `<li class="${value.id}">
        </br>
        <img src="${value.mainImage}" alt=""></a>
        <span>${value.name}</span>
        <p>￥${value.highPrice / 100}</p>
      </li>`
            })

            $(".shoppingAllbook").html(str1);
            $("tbody").html(str);

            $(".num").html(count);
          }
        })
      } else {
        $(".clearchopping").html("<p class='shopping-none'>当前详情页啥也没有，请加入购物车,再来！！</p>")
      }
    }

 