$(function(){
  var url = new UrlSearch()
  var productid = url.productid
  console.log(productid);
  

  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getdiscountproduct',
    data:{
      productid:productid
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.mm_details').html(template('dis_tmp',info))
      
    }
  
  })


})