import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Product } from "../../domain/Product";

export interface CreateProductInput extends Omit<Product, 'id'> {}

export interface CreateProductOutput {
    product: Product
}

export interface ICreateProduct extends BaseUseCase<CreateProductInput, CreateProductOutput> {}