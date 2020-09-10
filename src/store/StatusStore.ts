import { action, observable } from "mobx";
import { Alert } from "react-native";

export class StatusStore {
  @observable successMessage?: string;

  @observable errorMessage?: string;

  @action.bound
  setSuccessMessage(message: string): void {
    this.setMessage("successMessage", message);
    Alert.alert("", message);
  }

  @action.bound
  setErrorMessage(message: string): void {
    this.setMessage("errorMessage", message);
    Alert.alert("An error occurred", message);
  }

  private setMessage(key: "successMessage" | "errorMessage", message: string) {
    if (message === this[key]) {
      this[key] += " ";
    } else {
      this[key] = message;
    }
  }
}
