
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'


export interface PresentacionDTO {
    id: number
    nombre: string
}

export class Presentacion extends Sequelize.Model{

}
Presentacion.init( {
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
},{tableName: 'presentacion',freezeTableName: true, timestamps: true, sequelize  })