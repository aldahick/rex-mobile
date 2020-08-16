import { IndexScene } from "./scene";
import { LoginScene } from "./scene/login";
import { SceneDefinition } from "./util/SceneDefinition";

export const scenes: SceneDefinition[] = [
  {
    component: IndexScene,
    route: "/",
    authCheck: true
  },
  {
    component: LoginScene,
    route: "/login"
  }
];
