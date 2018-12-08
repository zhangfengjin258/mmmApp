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
    var id = getLocation('brandTitleid');
    // 品牌排行
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrand",
        data: {
            brandtitleid:id
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('brandrankTmp',info);
            $('.list_content ul').html( htmlStr );
        }
    });
    // 销量排行
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrandproductlist",
        data: {
            brandtitleid:id,
            // pagesize:1
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('salerankTmp',info);
            $('.sale_product ul').html( htmlStr );
            // console.log(id);
            var  id = $('.sale_product li ').data('id');
            var img = $('.sale_product li').data('img');
            var title =$('.sale_product li').data('title');
            // console.log(img);
            // console.log(title);
            
            
            // 最新评论
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:9090/api/getproductcom",
                data: {
                    productid:id,
                },
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    var htmlStr = template('newcomTmp',info);
                    $('.com_main ul').html( htmlStr );
                    $('.img').html( img );
                    $('.com_info').html( title );

                }
            });
        }
    });


    // 分类标题
    var title = getLocation('brandtitle');
    var index = title.indexOf('十');
    // console.log(index);
    title = title.slice(0,index);
    // console.log(title);
    $('.title_i').text(title);
    

    
    
})