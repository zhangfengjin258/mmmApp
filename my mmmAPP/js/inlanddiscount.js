$(function() {
    // 进入页面渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getinlanddiscount",
        dataType: "json",
        success: function ( info ) {
            var arr = info.result;
            // 截取数据前四条
            var str = arr.splice(0,4);
            info.data = str;
            console.log(info);
            var htmlStr = template( 'productTmp', info );
            $('.gn_main ul').html( htmlStr );

            // 注册滚轮事件
            $(window).on('scroll',function(){
                var height = $('.gn_main').height() + $('.gn_main').offset().top -$(window).scrollTop() - $(window).height();
                if( height < -100) {
                    var str = arr.splice(0,2);
                    info.data = str;
                    $('.gn_main ul').append(template('productTmp',info ));
                }
            })
            
        }
    });
})