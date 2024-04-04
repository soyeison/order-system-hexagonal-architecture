import { CreateCustomerImpl } from "./core/customer/application/Create/CreateCustomer"
import { CreateCustomerInput } from "./core/customer/application/Create/CreateCustomer.interface"
import { UpdateCustomerImpl } from "./core/customer/application/Update/UpdateCustomer"
import { CustomerRepository } from "./core/customer/infrastructure/persistence/InMemoryCustomerRepository"
import { CustomerDB } from "./core/customer/infrastructure/persistence/memory/CustomerDB"
import { CreateOrderImpl } from "./core/order/application/Create/CreateOrder"
import { CreateOrderInput } from "./core/order/application/Create/CreateOrder.interface"
import { transitionStrategies } from "./core/order/application/UpdateStatus/StateTransitionStrategy/StateTransitionStrategy"
import { UpdateOrderStatusImpl } from "./core/order/application/UpdateStatus/UpdateOrderStatus"
import { UpdateOrderStatusInput } from "./core/order/application/UpdateStatus/UpdateOrderStatus.interface"
import { OrderRepository } from "./core/order/infrastructure/persistence/InMemoryOrderRepository"
import { OrderDB } from "./core/order/infrastructure/persistence/memory/OrderDB"
import { CreateProductImpl } from "./core/product/application/Create/CreateProduct"
import { CreateProductInput } from "./core/product/application/Create/CreateProduct.interface"
import { ProductRepository } from "./core/product/infrastructure/persistence/InMemoryProductRepository"
import { ProductDB } from "./core/product/infrastructure/persistence/memory/ProductDB"
import { OrderStatus } from "./shared/domain/OrderState.enum"

(async () => {
    // DB en memoria
    const customerDBInstance = new CustomerDB()
    const productDBInstance = new ProductDB()
    const orderDBInstance = new OrderDB()
    // Inicializar
    const customerRepositoryIntance = new CustomerRepository(customerDBInstance)
    const productRepositoryInstance = new ProductRepository(productDBInstance)
    const orderRepositoryInstance = new OrderRepository(orderDBInstance, customerRepositoryIntance)
    const orderUpdatedStateInstance = new UpdateOrderStatusImpl(orderRepositoryInstance, transitionStrategies)

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
    const { customer } = await createCustomerUsecasesInstance.execute(information)
    console.log("Cliente: ", customer)

    // Crear un producto
    const createProductUsecasesInstance = new CreateProductImpl(productRepositoryInstance)

    const productInformation: CreateProductInput = {
        name: 'Camiseta de algodon',
        description: 'Camiseta hecha de algodon',
        price: 10,
        quantityAvailable: 2
    }

    const { product } = await createProductUsecasesInstance.execute(productInformation)
    console.log("Producto: ", product)

    // Creamos una orden
    const createOrderUsecasesInstance = new CreateOrderImpl(orderRepositoryInstance)

    const orderInformation: CreateOrderInput = {
        customer: customer,
        products: [product]
    }
    const { order } = await createOrderUsecasesInstance.execute(orderInformation)
    console.log("Orden: ", JSON.stringify(order, null, 4))
    console.log("Precio total: ", order.calcTotalPrice())

    // Mover la orden entre los diferentes estados
    const inputUpdateState: UpdateOrderStatusInput = {
        orderId: order.id,
        newStatus: OrderStatus.Confirmed
    }
    const { order: orderUpdated } = await orderUpdatedStateInstance.execute(inputUpdateState)
    console.log("Orden actualizada: ", orderUpdated)
    console.log("Orden actualizada con precio total: ", orderUpdated.calcTotalPrice())
})()

/* // Implementacion del patron state

export interface State {
    sendEmail(): void
}

export class InitialState implements State {
    sendEmail(): void {
        console.log("Se envia email en el estado inicial")
    }
}

export class ReadyState implements State {
    sendEmail(): void {
        console.log("Se envia email en el estado ready")
    }
}

export class OrderTest {
    private state: State

    constructor() {
        this.state = new InitialState()
    }

    setState(state: State) {
        this.state = state
    }

    sendEmail() {
        this.state.sendEmail()
    }
}

const newOrder = new OrderTest()
newOrder.sendEmail()
newOrder.setState(new ReadyState())
newOrder.sendEmail() */