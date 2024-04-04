import { IProductRepository } from "../../domain/ProductRepository.interface"
import { GetProductByIdInput, GetProductByIdOutput, IGetProductById } from "./GetProductById.interface"

export class GetProductByIdImpl implements IGetProductById {
    constructor(
        private readonly productRepositoryRepo: IProductRepository
    ) {}

    async execute(input: GetProductByIdInput): Promise<GetProductByIdOutput> {
        const product = await this.getProductById(input.id)

        return {
            product
        }
    }

    private async getProductById(id: string) {
        const product = await this.productRepositoryRepo.getProductById(id)

        if (!product) {
            throw new Error('No se pudo encontrar el producto')
        }

        return product
    }
}