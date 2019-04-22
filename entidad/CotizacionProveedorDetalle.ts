
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'
import {Producto} from './Producto';
import {UnidadMedida} from './UnidadMedida';
import {CotizacionDetalle} from './CotizacionDetalle';
import {CotizacionProveedorDetEsp} from './CotizacionProveedorDetalleEspecificacion';

export interface CotizacionProveedorDetalleDTO {
    id: number
    cantidad: number,
    idproducto: number,
    idunidad: number,
    precio: number,
    observacion: string
}
export class CotizacionProveedorDetalle extends Sequelize.Model{

}
CotizacionProveedorDetalle.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: Sequelize.DECIMAL,
    precio: Sequelize.DECIMAL,
    idunidad: Sequelize.INTEGER,
    observacion: Sequelize.STRING,
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
},{freezeTableName: true, timestamps: true, tableName:'cotizacionproveedordet', sequelize  });

CotizacionProveedorDetalle.hasMany(CotizacionProveedorDetEsp, { foreignKey: 'idcotizacionproveedordet' ,
    as: { singular: 'especificaciones', plural: 'especificaciones' } });
CotizacionProveedorDetalle.belongsTo(Producto,{ foreignKey: 'idproducto' ,as: 'producto'} );
CotizacionProveedorDetalle.belongsTo(UnidadMedida,{ foreignKey: 'idunidad' ,as: 'unidad'} );
