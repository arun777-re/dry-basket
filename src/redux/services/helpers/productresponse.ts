import { ProductIncomingDTO } from "@/types/product"
import { IncomingAPIResponseFormat, PaginatedProductResponse } from "@/types/response"


export const defaultProductState:PaginatedProductResponse<ProductIncomingDTO> = 
   {
     success:false,
    message:"",
    status:0,
    data:[{
      _id: "",
      slug: "",
      productName: "",
      description: "",
      category:"",
      avgRating:0,
      images: [],
      variants: [
        {
          stock: 0,
          price: 0,
          discount: 0,
          discountExpiry: null,
          priceAfterDiscount:0,
          weight: 0,
        },
      ],
      status: "available",
      tags: [],
      isFeatured: false,
    }],
    hasNextPage:false,
    hasPrevPage:false,
    currentPage:0,
}

export const singleProductState:IncomingAPIResponseFormat<ProductIncomingDTO> = {
    success:false,
    message:"",
    status:0,
    data:{
      _id: "",
      slug: "",
      productName: "",
      description: "",
      category:'',
      avgRating:0,
      images: [],
      variants: [
        {
          stock: 0,
          price: 0,
          discount: 0,
          discountExpiry: null,
          weight: 0,
        },
      ],
      status: "available",
      tags: [],
      isFeatured: false,
    },
}