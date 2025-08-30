import { OrderIncomingReqDTO } from "@/types/order";
import { PaginatedProductResponse } from "@/types/response";
import { defaultPopulatedCartResponse } from "../cart/cartresponse";


export const paginatedOrderResponse:PaginatedProductResponse<OrderIncomingReqDTO> =  {
     success:false,
    message:"",
    status:0,
    data:[{
      _id: "",
      cartId:defaultPopulatedCartResponse,
      userId:'',
      shippingDetails:{},
      orderStatus:"",
      amount:0,
      currency:"",
      razorpayOrderId:"",
      blogsAgree:false
    }],
    hasNextPage:false,
    hasPrevPage:false,
    currentPage:0,
}