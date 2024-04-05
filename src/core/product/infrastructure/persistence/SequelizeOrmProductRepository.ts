import { Sequelize } from "sequelize"
import { IProductRepository } from "../../domain/ProductRepository.interface"
import { Product } from "../../domain/Product"
import { ProductInput } from "./sequelize/ProductEntity.model"

export class ProductRepository implements IProductRepository {
    constructor(
        private readonly sequelizeRepo: Sequelize
    ) {}

    async addProduct(product: Product): Promise<void> {
        const adapter: ProductInput = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantityAvailable: product.quantityAvailable
        }
        await this.sequelizeRepo.models.Product.create(adapter)
    }

    async getProducts(): Promise<Product[]> {
        const productDB = await this.sequelizeRepo.models.Product.findAll()
        return productDB.map((element) => {
            const productJSON: ProductInput = element.toJSON()
            return new Product(
                productJSON.id as string,
                productJSON.name, 
                productJSON.description, 
                productJSON.price,
                productJSON.quantityAvailable,
            )
        })
    }

    async getProductById(id: string): Promise<Product> {
        const productDB = await this.sequelizeRepo.models.Product.findByPk(id)

        if (!productDB) {
            throw new Error('No existe el customer')
        }

        const productJSON: ProductInput = productDB.toJSON()

        return new Product(
            productJSON.id as string,
            productJSON.name, 
            productJSON.description, 
            productJSON.price,
            productJSON.quantityAvailable,
        )
    }

    updateProduct(id: string, product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}