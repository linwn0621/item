$(function () {


    // 获取信息
    // 制作模板填入信息渲染
    //    封装成函数
    hqxx();

    function hqxx() {
        $.get({
            url: "http://localhost:8080/api/v1/admin/category/list",
            success: function (res) {
                // console.log(res);
                var htmlarr = template("list", res);
                // console.log(htmlarr);
                $("#tbody").html(htmlarr);
            }

        })

    }
    // 引入模态框
    $('#myModal').on('show.bs.modal', function (e) {
        // 获取触发模态框的按钮
        var mytarget = e.relatedTarget;
        // 判断是点击哪个按钮触发模态框
        if (e.relatedTarget == $("#xinzengfenlei")[0]) {
            // 更改模态框内容
            $("#exampleModalLabel").text("新增分类");
            $(".btn-primary").text("新增");
            // 点击新增分类按钮时清空模态框
            $(".modal-body form")[0].reset();

            //   给新增按钮添加点击事件
            // 新增文章请求
            // 获取新增文章内容
            $(".btn-primary").on("click", function () {
                var name = $("#recipient-name").val();
                var slug = $("#message-text").val();
                $.post({
                    url: "http://localhost:8080/api/v1/admin/category/add",
                    data: {
                        name: name,
                        slug: slug
                    },
                    success: function (res) {
                        console.log(res);
                    }
                })
                //    点击后模态框隐藏
                $('#myModal').modal('hide');

                // $('#myModal').off().on('show', 'hidden.bs.modal');
                // 调用函数让页面更新
                hqxx();


            })



        } else {

            $("#exampleModalLabel").text("编辑");
            $(".btn-primary").text("提交");

            // 点击编辑按钮时获取id发请求获取文章信息并渲染进模态框

            var myId = $(e.relatedTarget).attr("data-id");
            console.log(myId);
            $.get({
                url: "http://localhost:8080/api/v1/admin/category/search",
                data: {
                    id: myId
                },
                success: function (res) {
                    // console.log(res);
                    if (res.code == 200) {
                        $("#recipient-name").val(res.data[0].name);
                        $("#message-text").val(res.data[0].slug);
                    }
                }

            })
            $(".btn-primary").on("click", function () {
                var id = myId;
                var name = $("#recipient-name").val();
                var slug = $("#message-text").val();

                // 编辑文章请求
                $.post({
                    url: "http://localhost:8080/api/v1/admin/category/edit",
                    data: {
                        id: id,
                        name: name,
                        slug: slug

                    },
                    success: function (res) {

                    },

                });
                $('#myModal').modal('hide');
                hqxx();
            })

        }

    })

    $("#tbody").on("click", "#delete", function () {
        var ans = confirm('亲，你真的要删除吗？');
        console.log(ans);
        if (ans) {
            var deleteId = $(this).attr("data-id");
            console.log(deleteId);
            $.post({
                url: "http://localhost:8080/api/v1/admin/category/delete",
                data: {
                    id: deleteId
                },
                success: function (res) {
                    // console.log(res);
                    if (res.code == 204) {
                        hqxx();
                    }
                }

            })
        }

    })

})