$(function () {
  var url = new UrlSearch()
  var couponid = url.couponid


  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcouponproduct',
    data: {
      couponid: couponid
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.ken_info').html(template('tmp', info))
      var infoLength = info.result.length;

      $(".ken_info ").on("click", "li", function () {
        var index = $(this).index();
        var img1 = info.result[index].couponProductImg;
        $(".mm_mask").css("display", "block");
        $(".mm_mask .pic").html(img1);
        $(".mm_mask .arrow_right").on("click", function () {
          if (index < infoLength - 1) {
            index++;
            img1 = info.result[index].couponProductImg;
            $(".mm_mask .pic").html(img1);
          }
          return false;
        })
        $(".mm_mask .arrow_left").on("click", function () {
          if (index > 0) {
            index--;
            img1 = info.result[index].couponProductImg;
            $(".mm_mask .pic").html(img1);
          }
          return false;
        })
      })

    }
  })
})