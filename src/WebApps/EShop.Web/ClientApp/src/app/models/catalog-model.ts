export interface GetProductsRequest {
    PageNumber?: number;
    PageSize?: number;
  }

export interface ProductModel
{
    id: string;
    name: string;
    category: string[];
    description: string;
    imageFile: string;
    price: number;
}

export interface GetProductsResponse{
    products: ProductModel[]
}

export interface GetProductByCategoryResponse{
    products: ProductModel[]
};
export interface GetProductByIdResponse{
    product: ProductModel
};