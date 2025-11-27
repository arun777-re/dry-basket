

export interface UserPropsOutgoing{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}

export interface UpdatePasswordOutgoingDTO{
    email:string,
    password:string,
    confirmPassword?:string
}


export interface UserPropsIncoming {
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    isActive?:boolean,
}


export interface LoginProps extends Omit<UserPropsOutgoing, "firstName" | "lastName" | "phone"> {}