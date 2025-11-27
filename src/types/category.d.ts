import { ErrorProps, PaginatedProductResponse } from "./response";

export interface OutgoingCategoryDTO {
    name:string;
    parent?:Types.ObjectId | string;
}

export interface CategoryIncomingDTO extends OutgoingCategoryDTO {
    slug:string;
    _id:string;
    children?:IncomingCategoryDTO[];
}

export interface CategoryState {
    loading:boolean;
    error:ErrorProps;
    category:PaginatedProductResponse<CategoryIncomingDTO>
}