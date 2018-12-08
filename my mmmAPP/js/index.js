$(function() {
    // 1、进入页面，首先渲染菜单栏数据
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getindexmenu",
        dataType: "json",
        success: function ( info ) {
            console.log(info)
            var htmlStr = template('navTmp', info );
            $('.mmm_nav ul').html( htmlStr );
            // 剩余
            var flag = true;
            var more = $('.mmm_nav li[data-id="7"]');
            console.log(more);
            
            // 点击导航栏更多按钮，显示隐藏导航
            $(more).on('click',function() {
                if(flag){
                    console.log(1);
                    $('.mmm_nav li[data-type="1"]').show();
                }else{
                    console.log(3);
                    $('.mmm_nav li[data-type="1"]').hide();
                }
                flag = !flag;
            })
        }
    });
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        dataType: "json",
        success: function ( info ) {
            console.log(info);
            var htmlStr = template('productTmp', info );
            
            $('.pro_content ul').html( htmlStr);
            
        }
    });
    
})