
<template>
  <div class="test">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        websock: null,
      }
    },
    created() {
        //实现化WebSocket对象
		//指定要连接的服务器地址与端口建立连接 
		//注意ws、wss使用不同的端口。我使用自签名的证书测试，
		//无法使用wss，浏览器打开WebSocket时报错
		//ws对应http、wss对应https。
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8080/ws/asset')
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
         // 连接错误
        this.websocket.onerror = this.setErrorMessage
        // 连接成功
        this.websocket.onopen = this.setOnopenMessage
        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage
        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage
        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage () {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage (event) {
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
      },
      setOncloseMessage () {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.closeWebSocket()
      },
      closeWebSocket () {
        this.websocket.close()
    },
    }
  }
</script>
 
