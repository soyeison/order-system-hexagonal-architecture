import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface"
import { Product } from "../../domain/Product"

export interface GetProductByIdInput {
    id: string
}

export interface GetProductByIdOutput {
    product: Product
}

export interface IGetProductById extends BaseUseCase<GetProductByIdInput, GetProductByIdOutput> {}