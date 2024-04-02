import { Product } from "./Product"

export interface IProductRepository {
    addProduct(product: Product): Promise<void>
    getProducts(): Promise<Product[]>
    getOneProduct(id: string): Promise<Product | undefined>
    updateProduct(id: string, product: Product): Promise<Product>
}