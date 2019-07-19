export default class SocketIo{
  constructor(options) {
    this.url = options.url;
    this.cb = options.cb;
    this.ws = null;
    this.timer = 0;
    this.init();
  }
  init() {
    this.ws = new WebSocket(this.url, 1944821630);
    this.ws.onopen = () => {
      console.log('链接成功');
      this.ws.send(JSON.stringify({'userId': 1944821630, type: 'join'}));
      // 链接成功后发送ping消息
      clearInterval(this.timer);
      setInterval(() => {
        try {
          this.ws.send(JSON.stringify({'userId': 1944821630, type: 'ping'}));
        } catch (error) {
          console.log(error)
        }
      }, 5000);
    }
  }
  addLinster() {
    const ws = this.ws;
    ws.onmessage = evt => {
      console.log(evt.data, 'mesg');
      this.cb(evt.data);
    };
    ws.onerror = err => {
      console.log(err, 'socket connect err');
    };
  }
  send(msg){
    this.ws.send(msg);
  }
  close() {
    this.ws.onclose = () => {
      clearInterval(this.timer);
    };
  }
}