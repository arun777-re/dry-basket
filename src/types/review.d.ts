import { Document,Types } from "mongoose";

export interface ReviewDocument extends Document {
    rating:number;
    comment:string;
    user:Types.ObjectId;
    product:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}