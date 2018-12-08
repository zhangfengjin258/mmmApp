$(function(){

  var url = new UrlSearch()
  var productid = url.productid
  console.log(productid);
  
  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
    data:{
      productid:productid || 0
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.mm_details').html(template('pro_tmp',info))
    }

  })



})