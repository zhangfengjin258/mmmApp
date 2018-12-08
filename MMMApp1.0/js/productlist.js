$(function () {
  var url = new UrlSearch()
  var id = url.categoryid
  var pageid = 1
  var pages

  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcategorybyid',
    data: {
      categoryid: id
    },
    dataType: 'json',
    success: function (info) {
      $('.list_title').html(template('list_tmp', info))
    }
  })

  function render(page) {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: {
        categoryid: id || 0,
        pageid: pageid
      },
      dataType: 'json',
      success: function (info) {
        pages = Math.ceil(info.totalCount / info.pagesize)
        $('.list_content ul').html(template('productListTmp', info))
        $('#dropDown').html(template('select_tmp',{
          pageid:pageid,
          pages:pages
        }))

      }
    })
  }
  render()


  $('.page2').on('click', function () {    
    if (pageid >= pages) {
      return
    }
    pageid++
    render()
  })

  $('.page1').on('click',function(){    
    if(pageid==1){
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