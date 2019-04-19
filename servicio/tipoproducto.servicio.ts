
import {TipoProducto, TipoProductoDTO} from '../entidad/TipoProducto';
import {Op} from "sequelize";
import {logger} from "../global/environment";

export class TipoProductoServicio {

    static get TipoProductoAttributes() {
        return ['id', 'nombre']
    }
    private static _tipoproducto: any;
    static get tipoproducto() {
        return TipoProductoServicio._tipoproducto;
    }

    public listarTodos(){
        return  TipoProducto.findAll({
            attributes: TipoProductoServicio.TipoProductoAttributes
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
                message: 'No se pudo listar los tipos de producto.'
            };
        })
    }
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  TipoProducto.findAndCountAll({
            attributes: TipoProductoServicio.TipoProductoAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }
            }
        });
    }
    public guardar(tipoproducto: any){

        tipoproducto = JSON.parse(tipoproducto.data);
        return  TipoProducto.findOne({  where: {
                nombre: tipoproducto.nombre,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    throw new Error('Ya existe un tipo de producto con el mismo nombre');
                }
                else { // insert
                    return TipoProducto.create(tipoproducto);
                }
            });
    }
    public actualizar(tipoproducto: any){
        tipoproducto = JSON.parse(tipoproducto.data);
        return  TipoProducto.findOne({  where: {
                id: tipoproducto.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    return obj.update(tipoproducto);
                }
                else { // insert
                    throw new Error('No se encontró tipo de producto');
                }
            });
    }
}

