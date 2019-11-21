// // 原生设置令牌获取用户信息
// $(function () {
//     var xhr = new XMLHttpRequest();
//     xhr.open("get", "http://localhost:8080/api/v1/admin/user/info")
//     xhr.setRequestHeader("Authorization", window.localStorage.getItem("token"));
//     xhr.onreadystatechange = (function () {
//         if (xhr.status == 200 && xhr.readyState == 4) {
//             var res = JSON.parse(xhr.responseText);
//             console.log(res);


//         }

//     });
//     xhr.send();

// })



// jq方法获取用户信息
$(function () {
    $.get({
            url: "http://localhost:8080/api/v1/admin/user/info",
            // 添加请求头
            // headers: {
            //     Authorization: window.localStorage.getItem("token")
            // },
            success: function (res) {
                console.log(res);
                $(".user_info>img").attr("src", res.data.userPic);
                $(".user_info>span").text(res.data.nickname);
                $(".user_center_link>img").attr("src", res.data.userPic);


            }
        }),

        // 退出按钮添加点击事件
        $(".logout").on("click", function () {
            // 清楚本地token
            window.localStorage.removeItem("token");
            window.location.href = "./login.html"


        })



    // 给工具栏添加点击高亮
    $(".level01").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");


        if ($(this).index() == 1) {
            $("ul.level02").toggle();

            $(".level02 li").eq(0).trigger("click");
            // 让箭头转向
            $(this).find("b").toggleClass("rotate0");
        }
    });
    $(".level02 li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");


    })



})