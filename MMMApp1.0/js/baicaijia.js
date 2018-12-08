$(function () {
  // var id
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.nav_left ul').html(template('nav_tmp', info))
      $(window).on("resize", function () {
        var lis = $(".nav_left ul li");
        var liWidth = 0;
        lis.eq(0).children("a").addClass("active");
        lis.each(function (i, v) {
          liWidth += $(v).width();
          $(v).on("click", function () {
            $(this).siblings().children().removeClass("active");
            $(this).children("a").addClass("active");
            var id = $(this).data("id");
            render(id);
          })
        })
        $(".nav_left ul").width(liWidth + 1);
        // 触摸滚动
        new IScroll(".nav_left", {
          scrollX: true,
          scrollY: false
        })
      }).resize();

    }
  })


  function render(id) {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
      data: {
        titleid: id || 0
      },
      dataType: "json",
      success: function (info) {
        // console.log(info);
        $(".bargain_conttent ul").html(template("con_tmp", info));
      }
    })

  }
  render();




})