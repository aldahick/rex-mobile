import AsyncStorage from "@react-native-community/async-storage";
import { AccessControl } from "accesscontrol";
import * as _ from "lodash";
import { action, computed, observable } from "mobx";
import { AuthCheck } from "../component/auth";
import { IRole } from "../graphql/types";

const TOKEN_KEY = "rex.auth.token";
const ROLES_KEY = "rex.auth.roles";

export class AuthStore {
  @observable token?: string;

  private accessControl?: AccessControl;

  private roles?: IRole[];

  @action.bound
  async setAuth(token: string, roles: IRole[]): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(ROLES_KEY, JSON.stringify(roles));
    this.token = token;
    this.roles = roles;
    this.createAccessControl();
  }

  @action.bound
  async removeAuth(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(ROLES_KEY);
    delete this.token;
    delete this.roles;
    delete this.accessControl;
  }

  @computed
  get isAuthenticated(): boolean {
    return this.token !== undefined && !!this.roles && !!this.accessControl;
  }

  isAuthorized(check: AuthCheck): boolean {
    if (!this.roles) {
      return false;
    }
    return this.roles.some(r =>
      this.accessControl
      && (typeof check === "function"
        ? check(this.accessControl.can(r.name)).granted
        : this.isAuthenticated
      )
    );
  }

  async init(): Promise<void> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    let roles: IRole[] | undefined;
    const rolesJson = await AsyncStorage.getItem(ROLES_KEY);
    if (rolesJson !== null) {
      roles = JSON.parse(rolesJson) as IRole[] | null ?? undefined;
    }
    if (token !== null && roles) {
      await this.setAuth(token, roles);
    }
  }

  private createAccessControl() {
    if (!this.roles) {
      return;
    }
    this.accessControl = new AccessControl(_.flatten(
      this.roles.map(role => role.permissions.map(permission => ({
        role: role.name,
        resource: permission.resource,
        action: permission.action,
        attributes: "*",
      }))),
    ));
  }
}
