import { CreateCustomerImpl } from "./core/customer/application/Create/CreateCustomer"
import { CreateCustomerInput } from "./core/customer/application/Create/CreateCustomer.interface"
import { CustomerRepository } from "./core/customer/infrastructure/persistence/InMemoryCustomerRepository"
import { CustomerDB } from "./core/customer/infrastructure/persistence/memory/CustomerDB"

(async () => {
    // DB en memoria
    const customerDBInstance = new CustomerDB()
    // Inicializar
    const customerRepositoryIntance = new CustomerRepository(customerDBInstance)
    // Creamos un customer
    const createCustomerUsecasesInstance = new CreateCustomerImpl(customerRepositoryIntance)
    
    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452',
            dateOfBirth: new Date('2000/04/03')
        }
    }
    const customerCreated = await createCustomerUsecasesInstance.execute(information)
    console.log(customerCreated)
})()