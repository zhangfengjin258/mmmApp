$(function() {
    // 获取数据渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcoupon",
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('productTmp',info);
            $('.yhq_main ul').html( htmlStr );
            
        }
    });
})