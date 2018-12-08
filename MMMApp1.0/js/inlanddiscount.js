$(function () {

  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getinlanddiscount',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      
      var arr = info.result;
      var str = arr.splice(0, 4);
      info.obj = str;
      $('.mm_discount_list ul').html(template('list_tmp', info))
      console.log(info);
      
      $(window).on("scroll", function () {
        var height = $(".mm_discount_list").height() + $(".mm_discount_list").offset().top -
          $(window).scrollTop() - $(window).height();
        if (height < -100) {
          var str = arr.splice(0, 2);
          info.obj = str;
          $(".mm_discount_list ul").append(template("list_tmp", info));
        }
      })
    }
  })

})