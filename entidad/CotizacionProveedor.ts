
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'
import {Proveedor} from "./Proveedor";
import {CotizacionProveedorDetalle} from './CotizacionProveedorDetalle';

export interface CotizacionProveedorDTO {
    id: number
    idproveedor: number,
    idcotizacion: number,
    observacion: string,
    formapago: string,
    tiempoentrega: string
}
export class CotizacionProveedor extends Sequelize.Model{

}
CotizacionProveedor.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
    },
    observacion: Sequelize.STRING,
    formapago: Sequelize.STRING,
    tiempoentrega: Sequelize.STRING,
    idproveedor: Sequelize.INTEGER,
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
},{freezeTableName: true, timestamps: true, tableName:'cotizacionproveedorcab', sequelize  });
CotizacionProveedor.belongsTo(Proveedor,{ foreignKey: 'idproveedor' ,as: 'proveedor'} );

CotizacionProveedor.hasMany(CotizacionProveedorDetalle, { foreignKey: 'idcotizacionproveedorcab' ,
    as: { singular: 'cotizaciondetalle', plural: 'cotizaciondetalle' } });
