
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'
import {TipoDocumento} from "./TipoDocumento";

export interface ProveedorDTO {
    id: number,
    nombre: string,
    numdocumento: string,
    idtipodocum: number,
    telefono: string,
    representante: string,
    email: string,
    clave: string
}
export class Proveedor extends Sequelize.Model{}
Proveedor.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    idtipodocum: Sequelize.INTEGER,
    numdocumento: Sequelize.STRING,
    telefono: Sequelize.STRING,
    representante: Sequelize.STRING,
    email: Sequelize.STRING,
    clave: Sequelize.STRING,
    estado: {type: Sequelize.BOOLEAN, defaultValue: true },
    usuario :{type: Sequelize.STRING, defaultValue: '' },
    pc : {type: Sequelize.STRING, defaultValue: '' },
    ip : {type: Sequelize.STRING, defaultValue: '' },
    createdAt: {type: Sequelize.DATE, field:'fecha' },
    usuariomod: {type: Sequelize.STRING, defaultValue: '' },
    pcmod: {type: Sequelize.STRING, defaultValue: '' },
    ipmod : {type: Sequelize.STRING, defaultValue: '' },
    observacionmod :{type: Sequelize.STRING, defaultValue: '' },
    updatedAt : {type: Sequelize.DATE, field: 'fechamod' }
},{tableName: 'proveedor', freezeTableName: true, timestamps: true ,sequelize })

Proveedor.belongsTo(TipoDocumento,{ foreignKey: 'idtipodocum' ,as: 'tipodocumento'} )
