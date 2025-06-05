export interface UserProps {
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    isActive?:boolean,
    phone:number
}