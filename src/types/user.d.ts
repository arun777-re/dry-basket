

export interface UserPropsOutgoing{
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    password:string,
}


export interface UserPropsIncoming {
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    isActive?:boolean,
    phone:string
}


export interface LoginProps extends Omit<UserPropsOutgoing, "firstName" | "lastName" | "phone"> {}