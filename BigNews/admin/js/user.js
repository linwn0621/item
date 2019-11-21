
       $(function () {
           // 获取用户信息
           $.get({
               url: "http://localhost:8080/api/v1/admin/user/detail",
               success: function (res) {
                   // console.log(res);
                   if (res.code == 200) {
                       // 将获取的信息赋值
                       // $("#inputEmail1").val(res.data.username);
                       // $("#inputEmail2").val(res.data.nickname);
                       // $("#inputEmail3").val(res.data.email);
                       // $("#inputEmail4").val(res.data.password);
                       for (var key in res.data) {
                           $("input." + key).val(res.data[key]);
                       }

                       $(".user_pic").attr("src", res.data.userPic);

                   }
               }
           })

           $("#exampleInputFile").on("change", function () {
               // 将图片信息转化为url
               var url = URL.createObjectURL(this.files[0]);
               //将这个地址设置给img的src属性
               $('.user_pic').attr('src', url);

           });

           // 给修改按钮添加点击事件
           $('button.btn-edit').on('click', function (e) {
               // 阻止表单默认跳转行为
               e.preventDefault();
               // 获取表单
               var form = $("#form")[0];
               // console.log($("#form"));
               // 转化为二进制,只能处理原生的对象
               var data1 = new FormData(form);
               // 发送ajax请求提交数据
               $.post({
                   url: "http://localhost:8080/api/v1/admin/user/edit",
                   data: data1,
                   // 不需要请求类型和编码
                   contentType: false,
                   processData: false,
                   success: function (res) {
                       if (res.code == 200) {
                           //    刷新子页面
                           // window.location.reload();
                           //  parent.window.location.reload();

                           $.get({
                               url: "http://localhost:8080/api/v1/admin/user/info",
                               // 添加请求头
                               headers: {
                                   Authorization: window.localStorage.getItem(
                                       "token")
                               },
                               success: function (res) {
                                   console.log(res);
                                   parent.$(".user_info>img").attr("src", res
                                       .data.userPic);
                                   parent.$(".user_info>span").text(res
                                       .data.nickname);
                                   parent.$(".user_center_link>img").attr(
                                       "src", res.data.userPic);


                               }
                           })

                           window.location.reload();
                       }
                   }

               })

               // window.localStorage.removeItem("token");
               // parent.window.location.href = "./login.html";

           })

       }) 