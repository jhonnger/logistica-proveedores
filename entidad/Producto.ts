
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'

import {Marca} from "./Marca";

export interface ProductoDTO {
    id: number
    nombre: string,
    codbarras:string,
    codfabricante: string,
    inventariable: boolean,
    afectoigv: boolean,
    idmarca: number,
    stockminimo: number,
    idunidad: number,
    idtipoproducto: number,
    idfamilia: number,
}
export class Producto extends Sequelize.Model{}
Producto.init( {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    codfabricante: Sequelize.STRING,
    idmarca: Sequelize.INTEGER,
    idtipoproducto: Sequelize.INTEGER,
    idfamilia: Sequelize.INTEGER,
    idunidad: Sequelize.INTEGER,
    inventariable: {type: Sequelize.BOOLEAN,defaultValue: true},
    afectoigv: {type: Sequelize.BOOLEAN,defaultValue: true},
    stockminimo: {type: Sequelize.INTEGER,defaultValue: null},
    codbarras: {type: Sequelize.STRING,defaultValue: null},
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
},{tableName: 'producto',freezeTableName: true, timestamps: true, sequelize  })

Producto.belongsTo(Marca,{ foreignKey: 'idmarca' ,as: 'marca'} );
