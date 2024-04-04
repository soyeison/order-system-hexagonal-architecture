import { Product } from "../../domain/Product"
import { IProductRepository } from "../../domain/ProductRepository.interface"
import { ProductModel } from "./Product.model"
import { ProductDB } from "./memory/ProductDB"

export class ProductRepository implements IProductRepository {
    constructor(private readonly productRepo: ProductDB) {}

    async addProduct(product: Product): Promise<void> {
        try {
            const productModel = new ProductModel(
                product.id,
                product.name,
                product.description,
                product.price,
                product.quantityAvailable
            )
            await this.productRepo.addProduct(productModel)
        } catch (error) {
            console.log(error)
            throw new Error('El producto no se ha podido crear')
        }
    }

    async getProducts(): Promise<Product[]> {
        try {
            const productsModel = await this.productRepo.getProducts()

            return productsModel.map((productModel) => {
                return new Product(
                    productModel.id,
                    productModel.name,
                    productModel.description,
                    productModel.price,
                    productModel.quantityAvailable
                )
            })
        } catch (error) {
            console.log(error)
            throw new Error('No ha sido posible obtener todos los registros')
        }
    }

    async getProductById(id: string): Promise<Product> {
        const productModel = await this.productRepo.getProductById(id)

        if (!productModel) {
            throw new Error('No se pudo encontrar el producto')
        }

        return new Product(
            productModel.id,
            productModel.name,
            productModel.description,
            productModel.price,
            productModel.quantityAvailable
        )
    }
}