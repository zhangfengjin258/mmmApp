$(function () {
  var shopId = 0;
  var areaId = 0;
  // 定义一个商铺信息函数，当点击京东是调用
  function market() {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsshop",
      dataType: "json",
      success: function (info) {
        $(".market").html(template("sort_tmp", info));
      }
    })
  }

  market();
  // 定义一个地区函数，当地区是调用
  function location() {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsshoparea",
      dataType: "json",
      success: function (info) {
        $(".location").html(template("cate_tmp", info));
      }
    })
  }
  location();

  function productInfo(shopId, areaId) {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsproduct",
      data: {
        shopid: shopId,
        areaid: areaId
      },
      dataType: "json",
      success: function (info) {
        $(".mm_product_list ul").html(template("list_temp", info));
      }

    })
  }
  productInfo(shopId, areaId);



  // 获取导航栏li的个数
  var flag = true;
  var links = $(".nav_left>ul>li>a");
  $(links).eq(0).on("click", function () {
    // market();
    $(this).next("ul").toggleClass("popsort");
    if (flag) {
      $(this).next("ul").find(".check").eq(0).show();
    }
    flag = false;

    //让其它盒子隐藏
    $(".location").removeClass("popcat");
    $(".com").removeClass("popprice");


    $(this).next("ul").unbind("click").on("click", "li", function () {

      $(this).find(".check").show();
      $(this).siblings().find(".check").hide();
      shopId = $(this).data("id");
      productInfo(shopId, areaId);
      $(".market").removeClass("popsort");
      var text = $(this).find("a").text();
      $(".jd").text(text);
      console.log(text);
    });
  })

  var index = true;
  $(links).eq(1).bind("click", function () {
    $(this).next("ul").toggleClass("popcat");

    if (index) {
      $(this).next("ul").find(".check").eq(0).show();
    }
    index = false;

    // //让其它盒子隐藏
    $(".com").removeClass("popprice");
    $(".market").removeClass("popsort");

    // $(links).eq(1).unbind("click");

    $(this).next("ul").unbind("click").on("click", "li", function () {

      $(this).find(".check").show();
      $(this).siblings().find(".check").hide();
      areaId = $(this).data("id");
      productInfo(shopId, areaId);
      $(".location").removeClass("popcat");

      var text = $(this).find("a").text();
      var str = text.substring(0, 2);
      $(".loca").text(str);
    });
  })
  // 点击全部
  $(links).eq(2).on("click", function () {
    $(this).next("ul").toggleClass("popprice");
    $(this).next("ul").find(".check").show();

    //让其它盒子隐藏
    $(".location").removeClass("popcat");
    $(".market").removeClass("popsort");
  })

})