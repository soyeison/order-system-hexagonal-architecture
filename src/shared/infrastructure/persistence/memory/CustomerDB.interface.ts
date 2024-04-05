import { Customer } from "../../../../core/customer/domain/User"
import { CustomerModel } from "../../../../core/customer/infrastructure/persistence/memory/Customer.model"

export interface ICustomerDB {
    addCustomer(customerModel: CustomerModel): Promise<void>
    getCustomers(): Promise<CustomerModel[]>
    getCustomerById(id: string): Promise<CustomerModel | undefined>
    updateCustomer(id: string, updatedCustomerModel: CustomerModel): Promise<CustomerModel>
}