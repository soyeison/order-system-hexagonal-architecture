import express from 'express'
import bodyParser from 'body-parser'
import dbInit from '../persistence/sequelize/init'
import sequelizeConnection from '../persistence/sequelize/SequelizeOrmConfig'
import { CustomerRepository } from '../../../core/customer/infrastructure/persistence/SequelizeOrmCustomerRepository'
import { ProductRepository } from '../../../core/product/infrastructure/persistence/SequelizeOrmProductRepository'
import { GetAllCustomersImpl } from '../../../core/customer/application/GetAll/GetAllCustomers'
import { GetCustomerByIdImpl } from '../../../core/customer/application/GetById/GetCustomerById'
import { CreateCustomerImpl } from '../../../core/customer/application/Create/CreateCustomer'
import { GetAllProductsImpl } from '../../../core/product/application/GetAll/GetAllProducts'
import { GetProductByIdImpl } from '../../../core/product/application/GetById/GetProductById'
import { CreateProductImpl } from '../../../core/product/application/Create/CreateProduct'
import { OrderRepository } from '../../../core/order/infrastructure/persistence/SequelizeOrmOrderRepository'
import { CreateOrderImpl } from '../../../core/order/application/Create/CreateOrder'

(async () => {
    const app = express()

    app.use(bodyParser.json())
    await dbInit()
    
    app.get('/customer', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const getAllCustomersRepository = new GetAllCustomersImpl(customerRepositoryIntance)
        try {
            const { customers } = await getAllCustomersRepository.execute()
            res.json({
                message: 'Customers obtenidos con exito',
                data: customers
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })
    
    app.get('/customer/:id', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const getOneCustomersRepository = new GetCustomerByIdImpl(customerRepositoryIntance)
        try {
            const { customer } = await getOneCustomersRepository.execute({ customerId: req.params.id })
            res.json({
                message: 'Customer obtenido con exito',
                data: customer
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })
    
    app.post('/customer', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const createCustomerRepository = new CreateCustomerImpl(customerRepositoryIntance)
        try {
            const { name, email, dateOfBirth, phoneNumber, shippingAddress } = req.body
            const { customer } = await createCustomerRepository.execute({
                name,
                contactInfo: {
                    email,
                    dateOfBirth: new Date(dateOfBirth),
                    phoneNumber,
                },
                shippingAddress,
            })
            res.json({
                message: 'Customer creado',
                data: customer.id
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.get('/product', async (req, res) => {
        const productRepositoryInstance = new ProductRepository(sequelizeConnection)
        const getAllProductUsecasesInstance = new GetAllProductsImpl(productRepositoryInstance)
        try {
            const { products } = await getAllProductUsecasesInstance.execute()
            res.json({
                message: 'Productos obtenidos con exito',
                data: products
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.get('/product/:id', async (req, res) => {
        const productRepositoryInstance = new ProductRepository(sequelizeConnection)
        const getOneProductRepository = new GetProductByIdImpl(productRepositoryInstance)
        try {
            const { product } = await getOneProductRepository.execute({ id: req.params.id })
            res.json({
                message: 'Producto obtenido con exito',
                data: product
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.post('/product', async (req, res) => {
        const productRepositoryInstance = new ProductRepository(sequelizeConnection)
        const createProductUsecasesInstance = new CreateProductImpl(productRepositoryInstance)
        try {
            const { name, description, price, quantityAvailable } = req.body
            const { product } = await createProductUsecasesInstance.execute({
                name,
                description,
                price,
                quantityAvailable
            })
            res.json({
                message: 'Producto creado con exito',
                data: product
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.get('/order', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const orderRepositoryInstance = new OrderRepository(sequelizeConnection, customerRepositoryIntance)
        try {
            const order = await orderRepositoryInstance.getOrders()
            res.json({
                message: 'Ordenes obtenidas con exito',
                data: order
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.get('/order/:id', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const orderRepositoryInstance = new OrderRepository(sequelizeConnection, customerRepositoryIntance)
        try {
            const order = await orderRepositoryInstance.getOrderById(req.params.id)
            res.json({
                message: 'Orden obtenida con exito',
                data: order
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    app.post('/order', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const orderRepositoryInstance = new OrderRepository(sequelizeConnection, customerRepositoryIntance)
        const createOrderUsecasesInstance = new CreateOrderImpl(orderRepositoryInstance)
        const getOneCustomersRepository = new GetCustomerByIdImpl(customerRepositoryIntance)
        try {
            const { customerId } = req.body
            const { customer } = await getOneCustomersRepository.execute({customerId})
            const { order } = await createOrderUsecasesInstance.execute({
                customer,
                products: []
            })
            res.json({
                message: 'Orden creada con exito',
                data: order.id
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    })

    /* app.post('/order/make-payment', async (req, res) => {
        const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
        const orderRepositoryInstance = new OrderRepository(sequelizeConnection, customerRepositoryIntance)
        const updateOrderStatusUsecasesInstance = new UpdateOrderStatusImpl(orderRepositoryInstance, transitionStrategies)
        const wompiServiceInstance = new WompiPaymentService('')
        const generatePaymentUsecaseInstance = new MakePaymentImpl(wompiServiceInstance, orderRepositoryInstance, updateOrderStatusUsecasesInstance)
        try {
            const { orderId, cardType, cardNumber, expirationDate } = req.body
            await generatePaymentUsecaseInstance.execute({
                orderId,
                paymentDetails: {
                    type: cardType,
                    cardNumber,
                    expirationDate: new Date(expirationDate)
                }
            })
            res.json({
                message: 'Pago ejecutado con exito',
            })
        } catch (error) {
            res.json({
                message: error
            })
        }
    }) */

    app.listen(3000, () => {
        console.log("Server listo")
    })
})()