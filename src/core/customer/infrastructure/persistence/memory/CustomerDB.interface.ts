import { Customer } from "../../../domain/User"
import { CustomerModel } from "../Customer.model"

export interface ICustomerDB {
    addCustomer(customerModel: CustomerModel): Promise<void>
    getCustomers(): Promise<CustomerModel[]>
    getCustomerById(id: string): Promise<CustomerModel | undefined>
    updateCustomer(id: string, updatedCustomerModel: CustomerModel): Promise<CustomerModel>
}