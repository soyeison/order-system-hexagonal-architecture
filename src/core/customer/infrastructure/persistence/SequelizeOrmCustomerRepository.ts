import { Sequelize } from "sequelize"
import { ICustomerRepository } from "../../domain/CustomerRepository.interface"
import { Customer } from "../../domain/User"
import { CustomerInput } from "./sequelize/CustomerEntity.model"

export class CustomerRepository implements ICustomerRepository {
    constructor(
        private readonly sequelizeRepo: Sequelize
    ) {}

    async addCustomer(customer: Customer): Promise<void> {
        const adapter = {
            id: customer.id,
            name: customer.name,
            shippingAddress: customer.shippingAddress,
            email: customer.contactInfo.email,
            phoneNumber: customer.contactInfo.phoneNumber,
            dateOfBirth: customer.contactInfo.dateOfBirth,
        }
        await this.sequelizeRepo.models.Customer.create(adapter)
    }

    async getCustomers(): Promise<Customer[]> {
        const customerDB = await this.sequelizeRepo.models.Customer.findAll()
        return customerDB.map((element) => {
            const elementJSON = element.toJSON()
            return new Customer(
                elementJSON.id, 
                elementJSON.name, 
                elementJSON.shippingAddress, 
                {
                    email: elementJSON.email,
                    dateOfBirth: elementJSON.dateOfBirth,
                    phoneNumber: elementJSON.phoneNumber,
                },
            )
        })
    }

    async getCustomerById(id: string): Promise<Customer> {
        try {
            const customerDB = await this.sequelizeRepo.models.Customer.findByPk(id)
    
            if (!customerDB) {
                throw new Error('No existe el customer')
            }
    
            const customerJSON = customerDB.toJSON()
    
            return new Customer(
                customerJSON.id, 
                customerJSON.name, 
                customerJSON.shippingAddress, 
                {
                    email: customerJSON.email,
                    dateOfBirth: customerJSON.dateOfBirth,
                    phoneNumber: customerJSON.phoneNumber,
                },
            )
        } catch (error) {
            console.log(error)
            throw new Error('Customer no encontrado')
        }
    }

    async updateCustomer(id: string, customer: Customer): Promise<Customer> {
        try {
            const customerDB = await this.sequelizeRepo.models.Customer.findByPk(id)
    
            if (!customerDB) {
                throw new Error('No existe el customer')
            }

            const customerUpdated = await customerDB.update(customer)
            const customerJSON = customerUpdated.toJSON()
            return new Customer(
                customerJSON.id, 
                customerJSON.name, 
                customerJSON.shippingAddress, 
                {
                    email: customerJSON.email,
                    dateOfBirth: customerJSON.dateOfBirth,
                    phoneNumber: customerJSON.phoneNumber,
                },
            )
        } catch (error) {
            console.log(error)
            throw new Error('El customer no se ha podido actualizado')
        }
    }
}