$(function(){
    // tab栏滑动
    // var ul = $("#wrapper");
    // var li = ul.find("li");
    // // console.log(ul);
    // // console.log(li);
    // var width = 0;
    // li.each(function () {
    //     width += $(this).outerWidth(true);
        
    // });
    // // console.log(width);

    // ul.width(width);
    // console.log( ul.width(width));
    
    new IScroll(".bcj_tab", {
        scrollX:true,
        scrollY:false
    });

    // tab栏渲染
    render();
    function render(titleid) {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template('tabTmp',info);
                $('#wrapper').html( htmlStr );
                $('#wrapper li:first-child').addClass('active');
                tabCon();
            }
        });
    }


    function tabCon(id){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
            data: {
                titleid:id || 0,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template('tabconTmp', info);
                $('.tab_pro ul').html( htmlStr )
                
            }
        });
    }
    // 注册tab点击事件
    $('#wrapper').on('click','li',function(){
        $('#wrapper li').removeClass('active');
        $(this).addClass('active');
        var titleid = $(this).data('id');
        console.log(titleid);
        tabCon(titleid);
    }) 
   
})