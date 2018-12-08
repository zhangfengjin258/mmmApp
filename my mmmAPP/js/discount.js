$(function() {
    function getLocation(k) {
        // 获取地址栏参数
        var  str  =  location.search;
        // 解码
        str = decodeURI( str );
        // 切割去除？[slice切割字符串]
        str = str.slice( 1 );   
        // 将字符串分割为数组【split()】
        var arr = str.split('&');
        var obj = {};
        // 遍历数组获取键值
        arr.forEach(function(v,i) {
            var key = v.split('=')[0];
            var value = v.split('=')[1];
            obj[key] = value;
        })
        return obj[k];
    }
    
    // 进入页面渲染整个详情页
    var productid = getLocation('productid');
    var id = Number(productid)
    console.log(productid);
        
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getdiscountproduct",
        data: {
            productid: productid //商品id，number型
        },
        dataType: "json",
        success: function ( info ) {
            console.log(info);
            
            var htmlStr = template('detailTmp', info );
            $('.sqg_detail').html( htmlStr );
        }
    });
    
})