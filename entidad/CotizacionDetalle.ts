
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'
import {Producto} from './Producto';
import {UnidadMedida} from './UnidadMedida';
import {CotizacionDetalleEspecificacion} from "./CotizacionDetalleEspecificacion";

export interface CotizacionDTO {
    id: number
    cantidad: number,
    idproducto: number,
    idunidad: number,
}
export class CotizacionDetalle extends Sequelize.Model{

}
CotizacionDetalle.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    cantidad: Sequelize.DECIMAL,
    idunidad: Sequelize.INTEGER,
    idproducto: Sequelize.INTEGER,
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
},{freezeTableName: true, timestamps: true, tableName:'cotizaciondetalle', sequelize  });

CotizacionDetalle.hasMany(CotizacionDetalleEspecificacion, { foreignKey: 'idcotizaciondetalle' ,
    as: { singular: 'cotizaciondetalle', plural: 'especificaciones' } });
CotizacionDetalle.belongsTo(Producto,{ foreignKey: 'idproducto' ,as: 'producto'} );
CotizacionDetalle.belongsTo(UnidadMedida,{ foreignKey: 'idunidad' ,as: 'unidad'} );
