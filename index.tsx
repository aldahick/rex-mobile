import { AppRegistry } from "react-native";
import {name as appName} from "./app.json";
import { App } from "./src/App";
import { UserState } from "./src/component/auth";

console.log({ appName });

AppRegistry.registerComponent(appName, () => App);
UserState.init().then(() => {
}).catch(err => {
  console.error(err);
  // AppRegistry.registerComponent(appName, () => () => (
  //   <Text>
  //     Couldn&apos;t initialize user state:
  //     {" "}
  //     {err instanceof Error ? err.message : err as string}
  //   </Text>
  // ));
});
