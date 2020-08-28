
window.onload=function(){
var arr = Array.from($("input"));
var index;
var bool = false;
if (!bool) {
    // console.log("12232")
    $(".btn").attr("disabled", true);
} else {
    bool = false;
}
//节流没做
//没有对按钮进行disable设置
$("input").on("click", function (e) {
    index = arr.indexOf(this);
    $(this).on("input", function () {
        if (this == arr[0] || this == arr[1]) {
            if (testarr(this.value, index)) {
                $(this).parent().parent().removeClass("has-error").addClass("has-sucess");
                bool = true;
               

                if (index == 1) {
                    //    console.log(typeof(arr[index].value));
                    //    console.log(/[a-zA-Z]{2}/.test(arr[index].value));
                    if (/[a-zA-Z]{2}/.test(arr[index].value)) {
                        $(".ruo").css("background-color", "#DDDDDD");
                        $(".zhong").css("background-color", "#DDDDDD");
                        $(".qiang").css("background-color", "red");

                    } else if (/[a-zA-Z]{1}/.test(arr[index].value)) {
                        $(".ruo").css("background-color", "#DDDDDD");
                        $(".zhong").css("background-color", "red");
                        $(".qiang").css("background-color", "#DDDDDD");
                    } else {
                        $(".zhong").css("background-color", "#DDDDDD");
                        $(".qiang").css("background-color", "#DDDDDD");
                        $(".ruo").css("background-color", "red");
                    }

                }
            } else {
                $(this).parent().parent().removeClass("has-sucess").addClass("has-error");
                bool = false;
            }

        } else if (this == arr[2]) {
            if (this.value == arr[1].value) {
                $(this).parent().parent().removeClass("has-error").addClass("has-sucess");
                bool = true;
            }
            else {
                $(this).parent().parent().removeClass("has-sucess").addClass("has-error");
                bool = false;
            }

        } else {
            return;
        }
        if(arr[0].value==0||arr[1].value==0||arr[2].value==0){
            bool = false;
        }
        if (!bool) {
            console.log(arr[0].value==null||arr[1].value==null||arr[2].value==null);
            $(".btn").attr("disabled", true);
        } else {
            $(".btn").attr("disabled", false);
            bool = false;
        }
    });
   
});

function testarr(text, index) {
    switch (index) {
        case 0:
            return /^1\d{10}$/.test(text);
        case 1:
            return /^[a-zA-Z0-9]{8,16}$/.test(text);
    }
}
}