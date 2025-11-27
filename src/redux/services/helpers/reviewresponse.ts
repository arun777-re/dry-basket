import { ReviewIncomingDTO } from "@/types/review";

export const defaultReviews:ReviewIncomingDTO = {
      _id:'',
        rating:0,
        reviewText:'',
        userId:{
            firstName:''
        },
        createdAt:null,
}