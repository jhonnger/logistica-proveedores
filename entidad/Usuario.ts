
import * as Sequelize from 'sequelize'
import { sequelize } from '../database/config'

export interface UsuarioDTO {
    login : string
    clave : string
    estado : boolean
    usuario : string
    nombre: string,
    idpersonal: number,
    direccion: string,
    dni: string,
    modificaclave?:boolean,
    pc : string
    ip : string
    fecha : Date
    usuariomod : string
    pcmod : string
    ipmod : string
    observacionmod : string
    fechamod : Date
}
export class Usuario extends Sequelize.Model{

}
Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {type: Sequelize.STRING }, 
    clave: {type: Sequelize.STRING },
    dni: {type: Sequelize.STRING },
    idpersonal: {type: Sequelize.INTEGER },
    direccion: {type: Sequelize.STRING },
    nombre: {type: Sequelize.STRING },
    telefono: {type: Sequelize.STRING },
    modificaclave: {type: Sequelize.BOOLEAN, defaultValue: true },
    estado: {type: Sequelize.BOOLEAN, defaultValue: true },
    usuario :{type: Sequelize.STRING, defaultValue: '' },
    pc : {type: Sequelize.STRING, defaultValue: '' },
    ip : {type: Sequelize.STRING, defaultValue: '' },
    createdAt: {type: Sequelize.DATE, field:'fecha' },
    usuariomod: {type: Sequelize.STRING, defaultValue: '' },
    pcmod: {type: Sequelize.STRING, defaultValue: '' },
    ipmod : {type: Sequelize.STRING, defaultValue: '' },
    observacionmod :{type: Sequelize.STRING, defaultValue: '' },
    updatedAt : {type: Sequelize.DATE, field: 'fechamod' },
},{freezeTableName: true, timestamps: true, tableName: 'usuario', sequelize });
