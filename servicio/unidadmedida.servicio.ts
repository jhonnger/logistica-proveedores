
import {UnidadMedida, UnidadMedidaDTO} from '../entidad/UnidadMedida';
import {Op} from "sequelize";
import {logger} from "../global/environment";

export class UnidadMedidaServicio {

    static get UnidadMedidaAttributes() {
        return ['id', 'nombre','codigosunat']
    }
    private static _unidadMedida: any;
    static get unidadMedida() {
        return UnidadMedidaServicio._unidadMedida;
    }

    public listarTodos(){
        return  UnidadMedida.findAll({
            attributes: UnidadMedidaServicio.UnidadMedidaAttributes
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
                message: 'No se pudo listar las unidades.'
            };
        })
    }
    public guardar(unidadMedida: any){

        unidadMedida = JSON.parse(unidadMedida.data);
        return  UnidadMedida.findOne({  where: {
                nombre: unidadMedida.nombre,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    return {
                        ok: false,
                        message: 'Ya existe una unidad con el mismo nombre.'
                    }
                }
                else { // insert
                    return UnidadMedida.create(unidadMedida)
                        .then(data => {
                            return {
                                ok: true,
                                message: 'Unidad registrada correctamente.'
                            }
                        })
                        .catch(error => {
                            logger.error(error);
                            return {
                                ok: false,
                                message: 'Error al registrar.'
                            }
                    })

                }
            })
    }
    public actualizar(unidadMedida: any){

        unidadMedida = JSON.parse(unidadMedida.data);
        return  UnidadMedida.findOne({  where: {
                id: unidadMedida.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Actualizamos
                    obj.update(unidadMedida);
                    return {
                        ok: true,
                        message: 'UnidadMedida actualizada correctamente.'
                    };
                }
                else { // insert
                    return {
                        ok: false,
                        message: 'No se encontró unidadMedida.'
                    }
                }
            })
    }
    public obtener(id){
        return  UnidadMedida.findOne({
            attributes: ['id','nombre','codigosunat'],
            where: {
                id: id
            }
        }).then(function(unidadMedida) {
            if (!unidadMedida) {
                return 'not find';
            }
            return unidadMedida
        }).catch(err =>{
            logger.error(err);
            return 'Error al obtener unidad de medida';
        }) ;
    }

    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  UnidadMedida.findAndCountAll({
            attributes: UnidadMedidaServicio.UnidadMedidaAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }
            }
        });
    }
}

