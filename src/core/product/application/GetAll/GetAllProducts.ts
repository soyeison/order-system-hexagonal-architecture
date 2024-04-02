import { IProductRepository } from "../../domain/ProductRepository.interface"
import { GetAllProductsOutput, GetAllProductsUseCase } from "./GetAllProducts.interface"

export class GetAllProductsImpl implements GetAllProductsUseCase {
    constructor(
        private readonly productRepositoryRepo: IProductRepository
    ) {}

    async execute(input: void): Promise<GetAllProductsOutput> {
        const products = await this.productRepositoryRepo.getProducts()

        return {
            products
        }
    }
}