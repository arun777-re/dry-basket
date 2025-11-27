import { ErrorProps, IncomingAPIResponseFormat } from "@/types/response";
import { UserPropsIncoming } from "@/types/user";


export const defaultUserState:IncomingAPIResponseFormat<UserPropsIncoming> = {
    success:false,
    message:"",
    status:0,
    data:{
    _id:"",
    firstName:"",
    lastName:"",
    email:"",
    }
}

export const defaultError:ErrorProps = {
    message:"",
    status:0,
    success:false
}