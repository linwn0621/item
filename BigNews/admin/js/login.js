// 使用jq来处理先设置入口函数
$(function () {
    // debugger;

    var $username = $(".input_txt");
    var $password = $(".input_pass");
    const $btn = $(".input_sub");



    // 给登录按钮注册点击事件
    $btn.on("click", function (e) {
        // 获取用户名密码

        var username = $username.val().trim();
        var password = $password.val().trim();

        // 判断账号密码是否为空
        if (username == "" || password == "") {
            // 引入bootstrap模态框
            $('#myModal').modal();
            $('.modal-body').text("账号或密码不能为空");
            return false;
        };
        // 这个按钮是一个submit按钮会默认跳转,需要禁用它默认行为
        e.preventDefault();

        $.post({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: {
                username: username,
                password: password

            },
            dataType: "json",
            success: function (res) {
                // 引入bootstrap模态框
                $('#myModal').modal();
                $('.modal-body').text(res.msg);
                console.log(res);
                if (res.code == 200) {

                    // 本地保存token
                    localStorage.setItem("token", res.token);
                    // 模态框隐藏时触发事件
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 跳转页面
                        window.location.href = './index.html';


                    })
                }



            }

        })

    })
})