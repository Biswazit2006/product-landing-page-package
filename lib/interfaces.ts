export type IRole = "customer" | "admin" | "moderator";

export interface IDecodedUser {
  id: string;
  role: IRole;
  email?: string;
  shopId?: string;
}
