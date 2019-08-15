export default class SocketIo{
  constructor(options) {
    this.url = options.url;
    this.cb = options.cb;
    this.userId = options.userId;
    this.ws = null;
    this.timer = 0;
    this.init();
  }
  init() {
    this.ws = new WebSocket(this.url, this.userId);
    this.ws.onopen = () => {
      console.log('链接成功');
      this.ws.send(JSON.stringify({'userId': this.userId, type: 'join'}));
      this.addLinster();
      // 链接成功后发送ping消息
      clearInterval(this.timer);
      setInterval(() => {
        if (this.ws.readyState === 3) {
          clearInterval(this.timer);
          this.ws = new WebSocket(this.url, this.userId);
        } else {
          this.ws.send(JSON.stringify({'userId': this.userId, type: 'ping'}));
        }
      }, 5000);
    }
  }
  addLinster() {
    const ws = this.ws;
    ws.onmessage = evt => {
      this.cb(JSON.parse(evt.data));
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