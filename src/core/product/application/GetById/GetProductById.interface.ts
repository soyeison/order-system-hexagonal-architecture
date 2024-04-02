import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface"
import { Product } from "../../domain/Product"

export interface GetOneProductInput {
    id: string
}

export interface GetOneProductOutput {
    product: Product
}

export interface GetOneProductUseCase extends BaseUseCase<GetOneProductInput, GetOneProductOutput> {}