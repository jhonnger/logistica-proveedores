
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'

export interface CotizacionDetalleEspecificacionDTO {
    id: number
    detalle: string
}

export class CotizacionDetalleEspecificacion extends Sequelize.Model{
}
CotizacionDetalleEspecificacion.init( {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    detalle: Sequelize.STRING,
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
},{freezeTableName: true, timestamps: true, tableName: 'cotizaciondetespecif', sequelize  });
