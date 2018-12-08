$(function(){
    var shopid;
    var areaid;
    render();
    // 店铺渲染
    function shop(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsshop",
            dataType: "json",
            success: function (info) {
               console.log(info);
               var htmlStr = template('jdTmp',info)
               $('.jddown ul').html( htmlStr );
            }
        });
    }

    // 区域渲染
    function area(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsshoparea",
            dataType: "json",
            success: function ( info ) {
                console.log(info);
                var htmlStr = template('hbTmp',info)
                $('.hbdown ul').html( htmlStr );
                
            }
        });
    }
        

    // 商品渲染
    function render(shopid,areaid){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsproduct",
            data: {
                shopid: shopid || 0,
                areaid: areaid || 0
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                console.log(shopid);
                console.log(areaid);
                
                var htmlStr = template('productTmp',info)
                $('.cdp_con ul').html( htmlStr );
                
            }
        });
    }
    

    shop();
    area();
    $('li.jd').click(function(){
        shop();
        $('.jddown').toggle();
    });
    $('li.hb').click(function(){
        area();
        $('.hbdown').toggle();
    })


    $('.jddown').on('click','li',function(){
        shopid = $(this).data('id');
        var txt = $(this).text();
        
        $('.jd>a span').text(txt);
        render(shopid,areaid);
        // $('jddown li').removeClass('show');
        // $(this).addClass('show');
    })
    $('.hbdown').on('click','li',function(){
        areaid = $(this).data('id');
        var txt = $(this).text();
        var index = txt.indexOf('（');
        
        txt = txt.substr(0,15);
        console.log(txt);
        
        
        $('.hb>a span').text(txt);
        render(shopid,areaid);

    })

})