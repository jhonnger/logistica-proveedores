
import {Marca, MarcaDTO} from '../entidad/Marca';
import Bluebird = require("bluebird");
import {Op} from "sequelize";
import {logger} from "../global/environment";

export class MarcaServicio {

    static get MarcaAttributes() {
        return ['id', 'nombre']
    }
    private static _marca: any;
    static get marca() {
        return MarcaServicio._marca;
    }

    public listarTodos(){
        return  Marca.findAll({
            attributes: MarcaServicio.MarcaAttributes
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
                message: 'No se pudo listar las marcas.'
            };
        })
    }
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  Marca.findAndCountAll({
            attributes: MarcaServicio.MarcaAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }, estado: true
            }
        })
    }
    public guardar(marca: any){
        marca = JSON.parse(marca.data);
        return  Marca.findOne({  where: {
                nombre: marca.nombre,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    return {
                        ok: false,
                        message: 'Ya existe una marca con el mismo nombre.'
                    }
                }
                else { // insert
                    Marca.create(marca);
                    return {
                        ok: true,
                        message: 'Marca registrada correctamente.'
                    }
                }
            })
    }
    public actualizar(marca: any){
        marca = JSON.parse(marca.data);
        return  Marca.findOne({  where: {
                id: marca.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Actualizamos
                    obj.update(marca);
                    return {
                        ok: true,
                        message: 'Marca actualizada correctamente.'
                    };
                }
                else { // insert
                    return {
                        ok: false,
                        message: 'No se encontró marca.'
                    }
                }
            })
    }
    public obtener(id){
        return  Marca.findOne({
            attributes: ['id','nombre'],
            where: {
                id: id
            }
        }).then(function(marca) {
            if (!marca) {
                return 'not find';
            }
            return marca
        }).catch(err =>{
            logger.error(err);
            return 'Error al obtener producto';
        }) ;
    }
}

