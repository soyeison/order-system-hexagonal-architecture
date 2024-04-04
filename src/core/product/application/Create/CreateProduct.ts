import { Product } from "../../domain/Product"
import { CreateProductInput, CreateProductOutput, ICreateProduct } from "./CreateProduct.interface"
import { IProductRepository } from "../../domain/ProductRepository.interface"
import { UUIDGenerator } from "../../../../shared/domain/Uuid"

export class CreateProductImpl implements ICreateProduct {
    constructor(
        private readonly productRepositoryRepo: IProductRepository
    ) {}

    async execute(input: CreateProductInput): Promise<CreateProductOutput> {
        const product = await this.createProduct(input)

        await this.productRepositoryRepo.addProduct(product)

        return {
            product
        }
    }
    
    private async createProduct(input: CreateProductInput) {
        try {
            const id = UUIDGenerator.generateUUID()
            const newProduct = new Product(
                id,
                input.name,
                input.description,
                input.price,
                input.quantityAvailable,
            )
            return newProduct
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear el producto')
        }
    }
}