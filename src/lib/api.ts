import { SOCKET_URL } from '../config';

export type Line = {
  type: 'line';
  boardId: string;
  data: {
    color: string;
    width: number;
    points: number[];
  };
};

export type Message = {
  action: string;
  payload: object;
};

export type WsCallback = (message: Message) => void;

export class WS {
  private socket?: WebSocket = undefined;
  private url: string;

  private callbacks: {
    [key: string]: WsCallback[];
  } = {};

  constructor(url: string, params?: { [key: string]: number | string }) {
    const qs =
      params &&
      Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
    this.url = qs ? `${url}?${qs}` : url;
  }

  open() {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);
      this.socket.onerror = event => {
        reject(event);
      };

      this.socket.onopen = event => {
        resolve(event);
      };

      this.socket.onmessage= event => {
        this.handleMessage(JSON.parse(event.data) as Message);
      }
    });
  }

  send(data: object) {
    if (this.socket) {
      return this.socket.send(JSON.stringify(data));
    }
  }

  on(action: string, callback: WsCallback) {

    if (!this.callbacks[action]) {
      this.callbacks[action] = [];
    }

    this.callbacks[action].push(callback);
  }

  handleMessage(message: Message) {
    const callbacks: WsCallback[] | undefined = this.callbacks[message.action];
    if (callbacks) {
      for (const callback of callbacks) {
        callback(message);
      }
    }
  }
}

export class API {
  private ws?: WS = undefined;

  constructor(private socketUrl: string) {}

  isOpen() {
    return !!this.ws;
  }

  /**
   * Open a whiteboard. If whiteboardId is ignored, then create a new whiteboard.
   * @param whiteboardId whiteboard id.
   */
  open(boardId?: string) {
    this.ws = new WS(this.socketUrl, { bid: boardId || 'new' });
    return this.ws.open();
  }

  addLine(line: Line) {
    if (!this.ws) {
      throw new Error('Socket not open');
    }

    this.ws.send({
      action: 'addLine',
      payload: line,
    });
  }

  registerOnLineAdded(callback: (line: Line) => void) {
    if (!this.ws) {
      throw new Error('Socket not open');
    }

    this.ws.on('lineAdded', (message: Message) => {
      callback(message.payload as Line)
    });
  }
}

const api = new API(SOCKET_URL);

export default api;
