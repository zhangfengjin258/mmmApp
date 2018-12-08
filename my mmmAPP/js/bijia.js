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
    // 面包屑导航渲染
    // 一级菜单渲染
    var categoryid = getLocation('categoryid');
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data:{
            categoryid:categoryid,
        },
        dataType: "json",
        success: function ( info ) {
            console.log(info);
            var htmlStr = template('firstTmp',info);
            $('.first').html( htmlStr );    
            
        }
    });
    var productid = getLocation('productid');
    var index = getLocation('productlistid');    // 二级菜单获取
    


   
    // console.log(productid);
    // 获取商品信息，渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproduct",
        data: {
            productid:productid
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('bjTmp',info);
            $('.bj_content').html( htmlStr );
            // 二级菜单列表
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:9090/api/getproduct",
                data: {
                    productid:productid
                },
                dataType: "json",
                success: function (info) {
                    var proName = info.result;
                    var proName = $('.title').text().trim();
                    // console.log(proName);
                    // console.log(typeof(proName));
                    
                    var num = proName.indexOf(" ");
                    console.log(num);
                    
                    var proName ="> "+ proName.slice(0,num);
                    info.name = proName;
                    // console.log(info);
                    var htmlStr = template('secondTmp',info)
                    $('.second').html(htmlStr);
                }
            });
        }
    });

    // 获取评论渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {
            productid:productid,
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template('comTmp', info );
            $('.textarea').html( htmlStr );
            
        }
    });
})