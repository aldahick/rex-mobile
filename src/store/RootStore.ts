import { computed } from "mobx";
import { SocketStore } from "./SocketStore";
import { StatusStore } from "./StatusStore";

export class RootStore {
  readonly socketStore = new SocketStore(this);

  readonly statusStore = new StatusStore();

  @computed
  get allStores(): Omit<RootStore, "allStores"> & { rootStore: Omit<RootStore, "allStores"> } {
    return {
      rootStore: this,
      ...this,
    };
  }
}
