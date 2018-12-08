$(function() {
    // 进入页面，先渲染商品
    var pageid = 0;
    var  pages;
    function render() {
       $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getmoneyctrl",
            data: {
                // 后期动态获取
                pageid: pageid,
            },
            dataType: "json",
            success: function ( info ) {
                console.log(info);
                pages = Math.floor( info.totalCount / info.pagesize);
                var htmlStr = template('productTmp', info);
                $('.pro_content ul').html( htmlStr );
               
                
                $('#dropDown').html(template('selectTmp',{
                    pageid:pageid,
                    pages:pages
                }))
                console.log(pageid);
                console.log(pages);
                
                
            }
        }); 
    }
    render();
    // 下一页 
    $('.btn_next').on('click',function(){
        if(pageid > pages){
            return;
        }
        pageid++;
        render();
    })
    // 上一页
    $('.btn_prev').on('click',function(){
        if(pageid == 0){
            return;
        }
        pageid--;
        render();
    })

    $('#dropDown').on('change',function(){
        pageid = $(this).val()
        render()
      })
    
})