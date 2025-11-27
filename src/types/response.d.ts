export interface IncomingAPIResponseFormat<T>{
    success:boolean,
    status:number,
    message:string,
    data: T | null,
}


// error if coming from req
export interface ErrorProps{
    success:boolean,
    status:number,
    message:string,
    data?:null,
}


export interface PaginatedProductResponse<T>{
    success:boolean,
    status:number,
    message:string,
    data: T[] | null,
    currentPage?:number;
    hasNextPage?:boolean;
    hasPrevPage?:boolean;
}


export type PaginationQuery = {
    page:number;
    limit:number;
}
