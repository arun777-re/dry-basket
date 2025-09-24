    const SERVER_BASE_URL = 'http://localhost:8000'




export const ROUTES = {
    LOGIN:'/user/auth-login',
    CHECKOUT:'/checkout',
    CART:'/cart',
    HOME:'/',
    USER_DASHBOARD:'/user/user-dashboard',
    USER_LOGIN:"/user/auth-login",
    ABOUT:"/about",
    COMPLETE_ORDER:"/complete-order",
    OPEN_ROUTE_API_KEY:process.env.DISTANCE_API_KEY,
    WAREHOUSE_LAT:28.996682,
    WAREHOUSE_LNG:77.030826,
    OPEN_CAGE_API_KEY:process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
    AUTH:{
        SIGNUP:`${SERVER_BASE_URL}/v1/public/auth/signup`,
        SIGNIN:`${SERVER_BASE_URL}/v1/public/auth/signin`,
        LOGOUT:`${SERVER_BASE_URL}/v1/public/auth/logout`,
        RESET_REQUSET:`${SERVER_BASE_URL}/v1/public/auth/reset-request`,
        RESET_PASSWORD:`${SERVER_BASE_URL}/v1/public/auth/reset-password`,
        UPDATE_PASSWORD:`${SERVER_BASE_URL}/v1/public/auth/update-password`,
        GET_USER:`${SERVER_BASE_URL}/v1/public/auth/get`,
     
    },
    PRODUCTAPI:{
         GET_A_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getsingle`,
        GET_FEATURED_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getfeatured`,
        GET_SEARCH_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getsearch`,
        GET_ALL_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getall`,
        GET_ALL_CATEGORY_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getcatproduct`,
        GET_ALL_RECOMMENDED_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getrecommended`,
        GET_ALL_RELATED_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getrelated`,
        GET_NAV_SEARCH_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getnavsearch`,
    },
    REVIEWAPI:{
        CREATE_REVIEW:`${SERVER_BASE_URL}/v1/public/review/create`,
        GET_REVIEW:`${SERVER_BASE_URL}/v1/public/review/getall`
    },
    CARTAPI:{
        CREATE_CART_OR_ADD_ITEM_TO_CART:`${SERVER_BASE_URL}/v1/public/cart/additem`,
        GET_CART:`${SERVER_BASE_URL}/v1/public/cart/getcart`,
        UPDATE_QTY:`${SERVER_BASE_URL}/v1/public/cart/updateqty`,
        REMOVE_ITEM_FROM_CART:`${SERVER_BASE_URL}/v1/public/cart/removeitem`,
        APPLY_COUPON:`${SERVER_BASE_URL}/v1/public/cart/coupon`,
        DELETE_CART:`${SERVER_BASE_URL}/v1/public/cart/clear`,
    },
    ORDERAPI:{
        CREATE_ORDER:`${SERVER_BASE_URL}/v1/public/payment/create-order`,
        VERIFY_PAYMENT:`${SERVER_BASE_URL}/v1/public/payment/verify-payment`,
        GET_LATEST_ORDER:`${SERVER_BASE_URL}/v1/public/order/latest-order`,
        GET_ALL_ORDERS:`${SERVER_BASE_URL}/v1/public/order/getall-orders`,
        GET_SINGLE_ORDER_OR_TRACK_ORDER:`${SERVER_BASE_URL}/v1/public/order/get-single-track`,
        CANCEL_ORDER:`${SERVER_BASE_URL}/v1/public/order/cancel-order`
    },
    SHIPPINGAPI:{
        GET_SHIPPING_CHARGES:`${SERVER_BASE_URL}/v1/public/shipment/rate-calculator`,
        CREATE_AND_ASSIGN_ORDER:`${SERVER_BASE_URL}/v1/public/shipment/create-assign-order`,
    },
     BANNERURLS:{
        GETALL_BANNER:`${SERVER_BASE_URL}/v1/public/banner/getall`,
    },
    BLOGSURLS:{
        GETALL_BLOG:`${SERVER_BASE_URL}/v1/public/blog/getall`,
        GETSINGLE_BLOG:`${SERVER_BASE_URL}/v1/public/blog/get-single`,
    },
}