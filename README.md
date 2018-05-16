# mpvue-component

> mpvue 组件库


<img src="https://raw.githubusercontent.com/JRliu/JRliu.github.io/master/img/toast.gif" style="margin-right: 30px;height:500px">
<img src="https://raw.githubusercontent.com/JRliu/JRliu.github.io/master/img/popup.gif"  style="margin-right: 30px;height:500px">
----
## toast

### usage
```
<!-- template 内引入组件，并设置ref -->
<toast ref='toast'></toast>

<!-- script 内引入组件 -->
import toast from '@/components/toast'

<!-- 执行组件里的方法 -->
...
this.$refs.toast.toast('hello')
或
this.$refs.toast.toast({
  text: 'haha',
  position: 'top',
  duration: 3000
})
```
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|text|文字内容|String|-|-|
|position|位置|String|<code>center</code>,<code>top</code>,<code>bottom</code>|<code>bottom</code>|
|duration|持续时间|Number|-|3000|

----
## popup
### usage
```
<!-- template 内引入组件，设置ref，填充插槽内容 -->
<popup ref="leftPopup"  type="left">
  <p>哈哈哈</p>
</popup>

<!-- script 内引入组件 -->
import toast from '@/components/popup'

<!-- 执行组件里的方法 -->
...
this.$refs.leftPopup.toggle('show')
```
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|type (prop)|类型|String|`center`,`top`,`left`,`right`,`bottom`|`center`|
|isShow (组件toggle方法的参数)|是否显示|String|`show`,`hide`|-|
