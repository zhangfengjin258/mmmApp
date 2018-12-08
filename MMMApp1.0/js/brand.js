$(function () {
  var url = new UrlSearch();
  var id = url.brandtitleid;


  $.ajax({
    url: "http://127.0.0.1:9090/api/getbrand",
    data: {
      brandtitleid: id
    },
    dataType: "json",
    success: function (info) {
      // console.log(info);
      $(".mm_sign ul").html(template("sign_tmp", info));
      $(".mm_sign ul li .number").eq(0).css("backgroundColor", "#f10f0f");
      $(".mm_sign ul li .number").eq(1).css("backgroundColor", "#ff9315");
      $(".mm_sign ul li .number").eq(2).css("backgroundColor", "#8adf5b");
    }
  })


  $.ajax({
    url: "http://127.0.0.1:9090/api/getbrandproductlist",
    data: {
      brandtitleid: id,
      pagesize: 4
    },
    dataType: "json",
    success: function (info) {
      // console.log(info);
      $(".list_content ul").html(template("list_tmp", info));
      var firstId = $(".list_content ul li").eq(0).data("id");
      var img = $(".list_content .discount_product:eq(0) img").attr("src");
      var text = $(".list_content .discount_product:eq(0) .info_title div").text();
      $.ajax({
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {
          productid: firstId
        },
        dataType: "json",
        success: function (info) {
          if (info) {
            var result = info.result;
            result.forEach(function (v, i) {
              v.text = text;
              v.img = img;
            })
            $(".mm_comment ul").html(template("con_tmp", info));
          }

        }
      })
    }
  })

  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandtitle',
    dataType: 'json',
    success: function (info) {
      var str = info.result[id].brandTitle;
      var name = str.substring(0, str.length - 4);
      console.log(name);
      $(".re_top").text(name);
    }
  })


})