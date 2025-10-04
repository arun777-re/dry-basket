import { ROUTES } from "@/constants/routes";
import { getRequest } from "../middleware";

export const CATEGORY_API = {
  get_all_category: async ({ reject }: { reject: (value: any) => any }) =>
    await getRequest({ url: `${ROUTES.CATEGORYURLS.GETALL_CATEGORY}`, reject }),
};
