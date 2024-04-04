import { ICustomerRepository } from "../../domain/CustomerRepository.interface"
import { UpdateCustomerInput, UpdateCustomerOutput, IUpdateCustomer } from "./UpdateCustomer.interface"

export class UpdateCustomerImpl implements IUpdateCustomer {
    constructor(
        private readonly customerRepositoryRepo: ICustomerRepository
    ) {}

    async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {
        const customer = await this.customerRepositoryRepo.getCustomerById(input.customerId)

        if (!customer) {
            throw new Error('Cliente no encontrado')
        }
        const updatedCustomer = {...customer, ...input.changes}

        await this.customerRepositoryRepo.updateCustomer(input.customerId, updatedCustomer)

        return {
            updatedCustomer
        }
    }
}