import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Product } from "../../domain/Product";

export interface GetAllProductsOutput {
    products: Product[]
}

export interface GetAllProductsUseCase extends BaseUseCase<void, GetAllProductsOutput> {}