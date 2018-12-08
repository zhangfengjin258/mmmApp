$(function () {

  var pageid = 0
  var pages

  function render() {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        pages = Math.floor(info.totalCount / info.pagesize)

        $('.mm_discount ul').html(template('discount_tmp', info))
        $('#dropDown').html(template('select_tmp',{
          pageid:pageid,
          pages:pages
        }))

      }
    })
  }
  render()

  $('.page2').on('click', function () {
    if (pageid >= pages ) {
      return
    }
    pageid++
    render()
  })

  $('.page1').on('click',function(){
    if(pageid == 0){
      return
    }
    pageid--
    render()
  })


  $('#dropDown').on('change',function(){
    pageid = $(this).val()
    render()
  })



})