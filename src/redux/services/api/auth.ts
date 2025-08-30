import { ROUTES } from "@/constants/routes";
import { postRequest } from "../middleware";
import { LoginProps, UserPropsOutgoing } from "@/types/user";

export const AuthAPI = {
  signup: async (data: UserPropsOutgoing, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.SIGNUP}`,
      data: data,
      reject: reject,
    }),
  signin: async (data: LoginProps, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.SIGNIN}`,
      data: data,
      reject: reject,
    }),
  logout: async (userId: string, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.LOGOUT}`,
      reject: reject,
    }),
  reset: async (email: string, reject: (value: any) => any) =>
    await postRequest({
      url: `${ROUTES.AUTH.RESET_REQUSET}}`,
      data: {email},
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
      data:{password}
    }),
};
