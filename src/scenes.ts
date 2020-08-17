/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IndexScene } from "./scene";
import { GarageDoorsScene } from "./scene/garageDoors";
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
  },
  {
    component: GarageDoorsScene,
    route: "/garageDoors",
    authCheck: can => can.readAny("garageDoor")
  }
];
