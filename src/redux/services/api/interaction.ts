import { ROUTES } from "@/constants/routes";
import {  postRequest } from "../middleware";
import { InteractionOutgoingDTO } from "@/types/interaction";


export const InteractionAPISFETCH = {
      createUserInteraction:async({query,reject}:{
        reject:(value:any)=>any,query:InteractionOutgoingDTO
    })=>await postRequest({url:`${ROUTES.INTERACTIONURLS.CREATE_INTERACTION}`,reject,data:query}),
}