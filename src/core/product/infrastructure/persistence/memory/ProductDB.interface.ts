import { ProductModel } from "../Product.model"

export interface IProductDB {
    addProduct(productModel: ProductModel): Promise<void>
    getProducts(): Promise<ProductModel[]>
    getProductById(id: string): Promise<ProductModel | undefined>
    updateProduct(id: string, updatedProductModel: ProductModel): Promise<ProductModel>
}