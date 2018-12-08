$(function() {
    // 1、发送ajax请求，获取数据渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        dataType: "json",
        success: function ( info ) {
            console.log( info );
            var htmlStr = template('cateTitleTmp', info );
            $('.cate_title').html( htmlStr );
            // 分类列表渲染
            $('.cate_title').on('click','>li',function(e){
            /* 此处存在时间冒泡
            



            $('.cate_title').on('click','>li',function(e){
            e.stopPropagation();  */     
 
                var id = $(this).data('id')
                var index = $(this).data('index');
                // console.log(index);
                // console.log(id);
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:9090/api/getcategory",
                    data: {
                        titleid: id,
                    },
                    dataType: "json",
                    success: function ( info ) {
                        console.log(info);
                        var  htmlStr = template('cateListTmp', info );
                        $('.hide').html( htmlStr );
                        $('.cate_list').addClass('hide');
                        $('.cate_list').eq(index).toggleClass('hide');
                        // $('.cate_list').toggleClass('hide');

                    }
                });
            })
         
        }
    });


})
