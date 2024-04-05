import { Sequelize } from "sequelize"

const sequelizeConnection = new Sequelize({
    dialect: 'sqlite',
    storage: './src/shared/infrastructure/persistence/sequelize/database.sqlite'
})
  
  export default sequelizeConnection