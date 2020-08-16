import { AuthCheck } from "../component/auth";

export interface SceneDefinition {
  component: React.ComponentType<unknown>;
  route: string;
  authCheck?: AuthCheck;
}
