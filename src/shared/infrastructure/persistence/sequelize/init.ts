import { CustomerEntity } from "../../../../core/customer/infrastructure/persistence/sequelize/CustomerEntity.model"
import OrderEntity from "../../../../core/order/infrastructure/persistence/sequelize/OrderEntity.model"
import ProductEntity from "../../../../core/product/infrastructure/persistence/sequelize/ProductEntity.model"

const dbInit = async () => {
    await CustomerEntity.sync()
    await OrderEntity.sync()
    await ProductEntity.sync()
}
export default dbInit