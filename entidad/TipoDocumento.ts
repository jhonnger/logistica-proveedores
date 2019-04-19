
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'

export interface TipoDocumentoDTO {
    id: number
    nombre: string,
    abreviatura: string,
    longitudmaxima: number,
    longitudminima: number,
    eslongitudfija: boolean
}
export class TipoDocumento extends Sequelize.Model{

}
TipoDocumento.init( {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    abreviatura: Sequelize.STRING,
    longitudmaxima: Sequelize.INTEGER,
    longitudminima: Sequelize.INTEGER,
    eslongitudfija: {type: Sequelize.BOOLEAN, defaultValue: true },
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
},{freezeTableName: true, timestamps: true, tableName: 'tipodocumento',sequelize  })