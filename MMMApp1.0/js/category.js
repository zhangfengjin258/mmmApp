$(function () {
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorytitle',
    dataType: 'json',
    success: function (info) {
      // console.log(info);
      $('.category_title').html(template('titlt_tmp', info))
      $('.category_title').on('click', 'a', function () {
        var id = $(this).data('titleId')
        var content = $(this).next()
        $(this).next().toggleClass("move"); 
        $.ajax({
          type: 'get',
          url: 'http://127.0.0.1:9090/api/getcategory',
          data: {
            titleid: id
          },
          dataType: 'json',
          success: function (info) {
            console.log(info);  
            content.html(template('cate_tmp',info))
          }
        })
      })
    }
  })


})