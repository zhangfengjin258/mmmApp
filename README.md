慢慢买项目总结：



## 

## ！important：地址栏传参

```
function getLocation(k) {
    // 获取地址栏参数【？后面的所有用&链接的参数】
    var  str  =  location.search;
    // 解码【decodeURI将乱码转化为中文】
    str = decodeURI( str );
    // 切割去除？[slice切割字符串]
    str = str.slice( 1 );
    console.log(str);
    
    // 将字符串分割为数组【split()】
    var arr = str.split('&');
    var obj = {};
    // 遍历数组获取键值【将数组以键值对的形式添加到对象中】
    arr.forEach(function(v,i) {
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;
    })
    return obj[k];
}
```

## ！importent：自定义属性的使用

【1】设置自定义属性 data-属性名

【2】获取自定义属性：$(selecter).data(' 属性名 ')；【标签[data-id = 1]】



## 首页：

### 1、菜单栏

【**效果：只显示2行菜单，点击更多，加载第三行菜单栏，再次点击隐藏第三行菜单栏**】

【1】第三行菜单栏显示与隐藏问题：

jquery的**show(),hide()**两种方法的切换

自定义属性**data-type**获取显示与隐藏得状态

```
data-type="{{ i > 7 ? "1" : ""}}"//1表示显示

li[data-id="7"]'
```

【2】数据渲染中条件判断渲染问题：

使用行内style样式，巧妙运用三元运算符

```
display：{{ i > 7 ? "none" : "block"}}
```





## 比价搜索：

### 1、category（分类页）

【**效果：点击分类标题，分类列表展开，进行切换选择或者再次点击收起分类列表**】

【1】分类标题与分类列表问题

使用**addClass，removeClass**实现切换【**排他思想**】

**toggleClass**也可以实现隐藏与显示的切换

### 2、productlist（商品列表页）

【1】三级菜单问题

【**效果：点击首页返回index页面，点击全部分类回到category页面**】

【2】分页完成

**模板引擎：**

其中<%%>表示识别符号，后续可以处理js的事情。

模板包含表达式：用于嵌入子模板。{{include 'template_name'}} 

倘若后台返回的是一个标签，模板渲染时记得加**@符号，**且前面不能有空格，例如：**{{@ v.productImg }}**

**select标签：**

巧妙使用三元运算符，判断option的选中状态。

**<%= %>获取后台的变量值，**比如后台一个session["ab"]="ab";前台<%=session["ab"]%>就能取到值；
<%:%>同<%=%>。

**jquery中的change事件：**

**$(selector).change()**

当元素的值发生改变时，会发生 change 事件。

该事件仅适用于文本域（text field），以及 textarea 和 select 元素。

change() 函数触发 change 事件，或规定当发生 change 事件时运行的函数。

注释：当用于 select 元素时，change 事件会在选择某个选项时发生。当用于 text field 或 text area 时，该事件会在元素失去焦点时发生。

```
 <html>部分：
     <!-- 分页 -->
     <div class="page clearfix">
         <div class="btn_prev"><button>上一页</button></div>
         <div class="list_page">
             <select class="page_box" name="select" id="dropDown">
                 <option value="1">1/3</option>
                 <option value="2">2/3</option>
                 <option value="3">3/3</option>
             </select>
         </div>
         <div class="btn_next"><button>下一页</button></div>
     </div>
     
      <script type="text/html" id="selectTmp">
        <% for(var i = 0; i <= pages; i++ ) { %>
        	//利用三元预算符，判断option选中状态
            <option value="{{i}}" {{ i== pageid ? 'selected="selected"' : ''}}>
            	//<%= %>与<%:%>都是获取后台变量值
            	<%= i %>/<%= pages %>
            </option>
        <% } %>
    
    </script>
```

```
 js部分：
 
 function render(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: {
                categoryid: categoryid,
                pageid:pageid,
            },
            dataType: "json",
            success: function ( info ) {
                console.log(info);
                //向下取整Math.floor();【获取数据总条数 / 当前页数据条数】
                pages = Math.floor( info.totalCount / info.pagesize);
                //此处使用模板引擎【引入template.web.js文件】
                var htmlStr = template('productTmp', info );
                $('.pro_content ul').html( htmlStr );
                //渲染select框内容
                $('#dropDown').html(template('selectTmp',{
                    pageid:pageid,
                    pages:pages
                }))

            }
        });
    }
    render();
  // 下一页 
  $('.btn_next').on('click',function(){
    if(pageid > pages){
        return;
    }
    pageid++;
    render();
})
// 上一页
$('.btn_prev').on('click',function(){
    if(pageid == 0){
        return;
    }
    pageid--;
    render();
})

$('#dropDown').on('change',function(){
    pageid = $(this).val()
    render()
  })
```

### 3、bijia（商品详情页）

【1】三级菜单问题【元素查找+字符串截取】

使用地址栏传参，将商品列表id传递过来，通过id找到商品数据

**indexOf()方法的使用：**

indexOf() 方法可返回数组中某个指定的元素位置。

该方法将从头到尾地检索数组，看它是否含有对应的元素。开始检索的位置在数组 start 处或数组的开头（没有指定 start 参数时）。如果找到一个 item，则返回 item 的第一次出现的位置。开始位置的索引为 0。

如果在数组中没找到指定元素则返回 -1。

**字符串截取：【slice】【substr】【substring】**

1、 **substring() 方法**返回一个索引与另一个索引之间字符串

语法：str.substring(indexStart, [indexEnd])

**注意：**

- substring()从提取的字符indexStart可达但**不包括 indexEnd**
- 如果**indexStart 等于indexEnd**，substring()返回一个空字符串。
- 如果**indexEnd省略**，则将substring()字符**提取到字符串的末尾**。
- 如果任一参数小于0或是NaN，它被视为为0。
- 如果任何一个参数都大于stringName.length，则被视为是stringName.length。
- 如果indexStart大于indexEnd，那么效果substring()就好像这两个论点被交换了一样； 例如，str.substring(1, 0) == str.substring(0, 1)

2、**substr（）方法**返回从指定位置开始的字符串中指定字符数的字符

语法：str.substr(start, [length])

**注意：**

- `substr()`会从`start`获取长度为`length`字符（如果截取到字符串的末尾，则会停止截取）。

- 如果`start`是正的并且大于或等于字符串的长度，则`substr()`返回一个空字符串。

- 若`start`**为负数,则将该值加上字符串长度后再进行计算**（如果加上字符串的长度后还是负数，则从0开始截取）。

- 如果`length`为0或为负数，`substr()`返回一个空字符串。**如果`length`省略，则将`substr()`字符提取到字符串的末尾。**

  3、**slice（）方法**方法返回一个索引和另一个索引之间的字符串【不包括结束索引值】

语法：str.slice(beginIndex[, endIndex])

**注意:**

- **若`beginIndex`为负数,则将该值加上字符串长度后再进行计算**（如果加上字符串的长度后还是负数，则从0开始截取）。
- 如果`beginIndex`大于或等于字符串的长度，则`slice()`返回一个空字符串。
- 如果`endIndex`省略，则将`slice()`字符提取到字符串的末尾。如果为负，它被视为`strLength + endIndex`其中`strLength`是字符串的长度。

## 省钱控：

### 1、moneyctrl（省钱控功能页 ）

【1】分页列表问题

##   白菜价：

### 1、baicaijia（白菜价功能列表页）

#### iScroll使用：

【1】引入iScroll的js文件

【2】html格式（可视宽高的盒子包裹，ul宽度设置大于可视宽度，li左浮动，不布满l）

【3】js样式

    new IScroll(".bcj_tab", {
      	scrollX:true,// X轴
        scrollY:false // Y轴
    });
```
html
<div class="bcj_tab">
    <ul id="wrapper" class="clearfix">
    <!-- 数据渲染 -->
    	<li data-id="{{ v.titleId }}">
     	   <a href="#">{{ v.title }}</a>
        </li>
    </ul>
</div>
```

```
css
 .bcj_tab{
        width: 100%;//可视宽
        height: 1.07rem;//可视高
        background-color: #fff;
        overflow: hidden;//溢出隐藏
        ul#wrapper {
            width: 20rem;//大于可视宽
            li{
                width: 1.53rem;
                height: 1.07rem;
                float: left;
                text-align: center;
                border-bottom: 2px solid transparent;
                a{
                    margin: 0;
                    line-height: 1.07rem;
                    display: inline-block;
                    font-size: .37rem;
                    color: #666;
                }     
            }
            li.active{
                border-bottom: 2px solid red;

            }
        }
    }
```

## 凑单品：

### 1、gsproduct（凑单品功能页面）

【1】店铺地区切换问题

