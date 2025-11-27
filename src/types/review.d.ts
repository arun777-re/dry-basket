
export interface ReviewOutgoingDTO {
    productId?:string;
    rating:number;
    reviewText:string;
}



export interface UserInReviewDTO{
  firstName:string;
}

export interface ReviewIncomingDTO {
    _id:string;
    rating:number;
    reviewText:string;
    userId:UserInReviewDTO;
    createdAt:Date | null;
}