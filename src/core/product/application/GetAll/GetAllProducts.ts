import { IProductRepository } from "../../domain/ProductRepository.interface"
import { GetAllProductsOutput, IGetAllProducts } from "./GetAllProducts.interface"

export class GetAllProductsImpl implements IGetAllProducts {
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