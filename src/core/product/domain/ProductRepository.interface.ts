import { Product } from "./Product"

export interface IProductRepository {
    addProduct(product: Product): Promise<void>
    getProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product>
}