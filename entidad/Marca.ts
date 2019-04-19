
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'

export interface MarcaDTO {
    id: number,
    nombre: string
}

export class Marca extends Sequelize.Model{

}

Marca.init( {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
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
},{tableName: 'marca',freezeTableName: true, timestamps: true,sequelize  })