import { IProductRepository } from "../../domain/ProductRepository.interface"
import { GetOneProductInput, GetOneProductOutput, GetOneProductUseCase } from "./GetProductById.interface"

export class GetOneProductImpl implements GetOneProductUseCase {
    constructor(
        private readonly productRepositoryRepo: IProductRepository
    ) {}

    async execute(input: GetOneProductInput): Promise<GetOneProductOutput> {
        const product = await this.getOneCustomer(input.id)

        return {
            product
        }
    }

    private async getOneCustomer(id: string) {
        const product = await this.productRepositoryRepo.getOneProduct(id)

        if (!product) {
            throw new Error('')
        }

        return product
    }
}