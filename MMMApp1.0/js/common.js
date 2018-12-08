

  $(".return").on("click", function () {
    // console.log("haha");
    $(window).scrollTop("0");
  })

  function UrlSearch() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //str得到?之后的字符串

    var arr = str.split("&"); //得到&分割的参数，放入数组中
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf("=");
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = arr[i].substr(num + 1);
        this[name] = value;
      }
    }
  }
  // var url = new UrlSearch()
