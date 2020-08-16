import { Permission, Query } from "accesscontrol";

export type AuthCheck = boolean | ((can: Query) => Permission);
