import {Sequelize} from "sequelize";

 let user = process.env.DB_USER || 'postgres';
 let database = process.env.DB_NAME || 'logisticaproveedor';
 let password = process.env.DB_PASS || 'root';
 let host = process.env.DB_HOST || 'localhost';

export const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialectOptions: { decimalNumbers: true },
    dialect:'postgres'
});
sequelize
    .authenticate()
    .then( ( resp: any) => {
        console.log('Connection has been established correctamente.');
        
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });

;
