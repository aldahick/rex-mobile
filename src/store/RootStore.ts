import { AuthStore } from "./AuthStore";
import { SocketStore } from "./SocketStore";
import { StatusStore } from "./StatusStore";

export class RootStore {
  readonly authStore = new AuthStore();

  readonly socketStore = new SocketStore(this);

  readonly statusStore = new StatusStore();

  allStores: Omit<RootStore, "allStores"> & { rootStore: Omit<RootStore, "allStores"> } = {
    rootStore: this,
    ...this,
  };
}
