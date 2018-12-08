function getLocation(k) {
    // 获取地址栏参数
    var  str  =  location.search;
    // 解码
    str = decodeURI( str );
    // 切割去除？[slice切割字符串]
    str = str.slice( 1 );
    console.log(str);
    
    // 将字符串分割为数组【split()】
    var arr = str.split('&');
    var obj = {};
    // 遍历数组获取键值
    arr.forEach(function(v,i) {
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;
    })
    return obj[k];
}
