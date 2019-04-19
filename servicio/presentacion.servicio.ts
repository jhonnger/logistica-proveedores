
import {Presentacion, PresentacionDTO} from '../entidad/Presentacion';
import Bluebird = require("bluebird");
import {Op} from "sequelize";
import {logger} from "../global/environment";

export class PresentacionServicio {

    static get PresentacionAttributes() {
        return ['id', 'nombre']
    }
    private static _Presentacion: any;
    static get Presentacion() {
        return PresentacionServicio._Presentacion;
    }

    public listarTodos(){
        return  Presentacion.findAll({
            attributes: PresentacionServicio.PresentacionAttributes,
            where:{
                estado:true
            }
        }).then(
            function (data) {
                return {
                    ok: true,
                    data: data
                };
            }
        ).catch(err =>{
            logger.error(err);
            return {
                ok: false,
                message: 'No se pudo listar las presentaciones.'
            };
        })
    }
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  Presentacion.findAndCountAll({
            attributes: PresentacionServicio.PresentacionAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }, estado: true
            }
        })
    }
    public guardar(presentacion: any){
        presentacion = JSON.parse(presentacion.data);
        return  Presentacion.findOne({  where: {
                nombre: presentacion.nombre,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    throw new Error('Ya existe un Presentacion con el mismo nombre');
                }
                else { // insert
                    return Presentacion.create(presentacion);
                }
            })
    }
    public actualizar(presentacion: any){
        presentacion = JSON.parse(presentacion.data);
        return  Presentacion.findOne({  where: {
                id: presentacion.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    return obj.update(presentacion);
                }
                else { // insert
                    throw new Error('No se encontró Presentacion');
                }
            })
    }
    public eliminar(id){
        return Presentacion.findOne
        ({  where: {
                id: id,
                estado: true
            } })
        .then(function(obj :any){
            if(obj) {
                return Presentacion.update({
                    estado: false
                },{
                    where:{
                        attribute: 'id',
                        comparator: id}
                })
                    .then(data => {
                        return {
                            ok: true,
                            message: 'Registro eliminado correctamente'
                        };
                    }).catch(err => {
                        logger.error(err);
                        return {
                            ok: false,
                            message: 'Error al eliminar'
                        };
                    })

            } else {
                return {
                    ok: false,
                    message: 'No se pudo eliminar'
                };

            }
        }).catch(error1 => {
                logger.error(error1);
                return {
                    ok: false,
                    message: 'No se pudo eliminar',
                    err: error1
                };
            })
    }
}

