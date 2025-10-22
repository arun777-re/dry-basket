import { ROUTES } from "@/constants/routes";
import { getRequest, postRequest } from "../middleware";
import {
  LoginProps,
  UpdatePasswordOutgoingDTO,
  UserPropsOutgoing,
} from "@/types/user";

export const AuthAPI = {
  signup: async (data: UserPropsOutgoing, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.SIGNUP}`,
      data: data,
      reject: reject,
    }),
  verifyEmail: async (token:string,reject: (value: any) => any) =>
    await getRequest({
      url: `${ROUTES.AUTH.VERIFY_EMAIL}?token=${token}`,
      reject: reject,
    }),
  signin: async (data: LoginProps, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.SIGNIN}`,
      data: data,
      reject: reject,
    }),
  logout: async (reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.LOGOUT}`,
      reject: reject,
    }),
  reset: async (email: string, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.RESET_REQUSET}}`,
      data: { email },
      reject: reject,
    }),
  update: async (
    token: string,
    password: string,
    reject: (value: any) => any
  ) =>
    await postRequest({
      url: `${ROUTES.AUTH.RESET_PASSWORD}?${token}}`,
      reject: reject,
      data: { password },
    }),
  getUser: async (reject: (value: any) => any) =>
    await getRequest({ url: `${ROUTES.AUTH.GET_USER}`, reject: reject }),
  Update_Password: async ({
    data,
    reject,
  }: {
    data: UpdatePasswordOutgoingDTO;
    reject: (value: any) => any;
  }) =>
    await postRequest({
      url: `${ROUTES.AUTH.UPDATE_PASSWORD}`,
      reject: reject,
      data: data,
    }),
};
