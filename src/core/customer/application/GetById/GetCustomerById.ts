import { ICustomerRepository } from "../../domain/CustomerRepository.interface"
import { GetCustomerByIdInput, GetCustomerByIdOutput, IGetCustomerById } from "./GetCustomerById.interface"

export class GetCustomerByIdImpl implements IGetCustomerById {
    constructor(
        private readonly customerRepositoryRepo: ICustomerRepository
    ) {}

    async execute(input: GetCustomerByIdInput): Promise<GetCustomerByIdOutput> {
        const customer = await this.getCustomerById(input.customerId)

        return {
            customer
        }
    }

    private async getCustomerById(id: string) {
        const customer = await this.customerRepositoryRepo.getCustomerById(id)

        if (!customer) {
            throw new Error('El customer no existe')
        }

        return customer
    }
}