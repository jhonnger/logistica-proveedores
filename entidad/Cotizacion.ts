
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'
import {CotizacionDetalle} from "./CotizacionDetalle";
import {CotizacionProveedor} from "./CotizacionProveedor";

export interface CotizacionDTO {
    id: number,
    fechacotizacion: Date,
    fechaentrega: Date,
    horaentrega: Date,
    fechavencimiento: Date,
    idrequerimiento: number,
    diascredito: number,
    observacion: string,
    lugarentrega: string,
    cotizaciondetalle: CotizacionDTO[];
    cotizacionproveedores: any[]
}

export class Cotizacion extends Sequelize.Model{}

Cotizacion.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fechacotizacion: {type: Sequelize.DATE, defaultValue: new Date() },
    fechavencimiento: {type: Sequelize.DATE, defaultValue: new Date() },
    fechaentrega: {type: Sequelize.DATE, defaultValue: new Date() },
    horaentrega: {type: Sequelize.DATE, defaultValue: new Date() },
    idrequerimiento: {type: Sequelize.INTEGER},
    diascredito: {type: Sequelize.INTEGER},
    observacion :{type: Sequelize.STRING, defaultValue: '' },
    lugarentrega :{type: Sequelize.STRING, defaultValue: '' },
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
},{tableName: 'cotizacion', freezeTableName: true, timestamps: true,sequelize  });

Cotizacion.hasMany(CotizacionDetalle, { foreignKey: 'idcotizacion' ,
    as: { singular: 'cotizaciondetalle', plural: 'cotizaciondetalle' } });

Cotizacion.hasMany(CotizacionProveedor, { foreignKey: 'idcotizacion' ,
    as: { singular: 'cotizacionproveedor', plural: 'cotizacionproveedores' } });

