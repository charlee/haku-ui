import { SOCKET_URL } from '../config';

export type Line = {
  type: 'line';
  data: {
    color: string;
    points: number[];
  };
};

export type Message = {
  action: string;
  payload: object;
};

export class WS {
  private socket?: WebSocket = undefined;
  private url: string;

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
    });
  }

  send(data: object) {
    if (this.socket) {
      return this.socket.send(JSON.stringify(data));
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
    this.ws = new WS(SOCKET_URL, { bid: boardId || 'new' });
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
}

const api = new API(SOCKET_URL);

export default api;
