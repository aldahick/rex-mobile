import { action, observable } from "mobx";
import * as io from "socket.io-client";
import { config } from "../config";
import { RootStore } from "./RootStore";

export class SocketStore {
  @action.bound
  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  @observable socket?: SocketIOClient.Socket;

  constructor(
    root: RootStore
  ) {
    const socket = io.connect(config.apiUrl);
    socket.on("connect", () => {
      this.socket = socket;
    });
    socket.on("athena.error", (message: string) => {
      root.statusStore.setErrorMessage(message);
    });
  }
}
