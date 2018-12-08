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
    // 渲染面包屑导航
    var categoryid = getLocation('categoryid');

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {
            categoryid: categoryid,
        },
        dataType: "json",
        success: function ( info ) {
            // console.log(info);
            var htmlStr = template('catenavTmp' , info );
            $('.cate_nav ol').html( htmlStr );
            
        }
    });
    // console.log(title);
    // title = " > " + title;
    // $('.cate_nav li:last-child').text(title);
    var pageid = 1;
    var pages;
    // 进入页面渲产品页
    function render(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: {
                categoryid: categoryid,
                pageid:pageid,
            },
            dataType: "json",
            success: function ( info ) {
                console.log(info);
                pages = Math.floor( info.totalCount / info.pagesize);
                var htmlStr = template('productTmp', info );
                $('.pro_content ul').html( htmlStr );
                $('#dropDown').html(template('selectTmp',{
                    pageid:pageid,
                    pages:pages
                }))

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