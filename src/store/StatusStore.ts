import { action, observable } from "mobx";

export class StatusStore {
  @observable successMessage?: string;

  @observable errorMessage?: string;

  @action.bound
  setSuccessMessage(message: string): void {
    this.setMessage("successMessage", message);
  }

  @action.bound
  setErrorMessage(message: string): void {
    this.setMessage("errorMessage", message);
  }

  private setMessage(key: "successMessage" | "errorMessage", message: string) {
    if (message === this[key]) {
      this[key] += " ";
    } else {
      this[key] = message;
    }
  }
}
