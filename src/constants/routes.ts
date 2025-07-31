    const SERVER_BASE_URL = 'http://localhost:8000'




export const ROUTES = {
    LOGIN:'/user/auth-login',
    CHECKOUT:'/checkout',
    CART:'/cart',
    HOME:'/',
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
     
    },
    PRODUCTAPI:{
         GET_A_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getsingle`,
        GET_FEATURED_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getfeatured`,
        GET_SEARCH_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getsearch`,
        GET_ALL_PRODUCTS:`${SERVER_BASE_URL}/v1/public/product/getall`,
        GET_ALL_CATEGORY_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getcatproduct`,
        GET_ALL_RECOMMENDED_PRODUCT:`${SERVER_BASE_URL}/v1/public/product/getrecommended`,
    }
}