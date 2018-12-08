$(function(){

  var url = new UrlSearch()
  var categoryid = url.categoryid
  var productid = url.productid

  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getcategorybyid',
    data:{
      categoryid:categoryid
    },
    dataType:'json',
    success:function(info){
      $('.cate').html(template('cate_tmp',info))
    }
  })


  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getproduct',
    data:{
      productid:productid || 0
    },
    dataType:'json',
    success:function(info){
      var proName = info.result[0].productName.split(' ')[0]
      // console.log(proName);
      // 三级分类的渲染
      $('.cata').html(template('pro_tmp',{list:proName}))
      // 标题以及图片渲染
      $('.product_bijia').html(template('duct_tmp',info))
      // 京东商城渲染
      $('.price').html(template('price_tmp',info))
    }
  })


  $.ajax({
    type:'get',
    url:'http://127.0.0.1:9090/api/getproductcom',
    data:{
      productid:productid || 0
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      $('.commont_content ul').html(template('com_tmp',info))
    }
  })
  




})