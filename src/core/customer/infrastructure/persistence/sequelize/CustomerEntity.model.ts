import { DataTypes, Model, Optional } from "sequelize";
import { Customer } from "../../../domain/User";
import sequelizeConnection from "../../../../../shared/infrastructure/persistence/sequelize/SequelizeOrmConfig";
import { CustomerDB } from "../../../../../shared/infrastructure/persistence/memory/CustomerDB";

export interface CustomerAttributes {
    id: string;
    name: string;
    shippingAddress: string
    email: string
    phoneNumber: string
    dateOfBirth: Date
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> {}

export interface CustomerOutput extends Customer {}

export class CustomerEntity extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
    public id!: string;
    public name!: string;
    public shippingAddress!: string;
    public email!: string;
    public phoneNumber!: string;
    public dateOfBirth!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CustomerEntity.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: 'Customer'
})

export default CustomerDB