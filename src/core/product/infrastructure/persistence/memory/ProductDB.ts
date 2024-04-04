import { ProductModel } from "../Product.model"
import { IProductDB } from "./ProductDB.interface"

export class ProductDB implements IProductDB {
    private products: ProductModel[]

    constructor() {
        this.products = []
    }

    async addProduct(productModel: ProductModel): Promise<void> {
        try {
            this.products.push(productModel)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getProducts(): Promise<ProductModel[]> {
        try {
            return this.products
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getProductById(id: string): Promise<ProductModel | undefined> {
        try {
            return this.products.find((product) => product.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async updateProduct(id: string, updatedProductModel: ProductModel): Promise<ProductModel> {
        try {
            const index = this.products.findIndex((product) => product.id === id)
            if (index !== -1) {
                this.products[index] = updatedProductModel
                return updatedProductModel
            } else {
                throw new Error('Produto no encontrado')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
    
}