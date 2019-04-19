
import {Producto, ProductoDTO} from '../entidad/Producto';
import {Marca} from "../entidad/Marca";
import {Op} from "sequelize";
import {logger} from "../global/environment";

export class ProductoServicio {

    static get ProductoAttributes() {
        return ['id', 'nombre']
    }
    private static _producto: any;
    static get producto() {
        return ProductoServicio._producto;
    }

    public listarTodos(){
        return  Producto.findAll({
            attributes: ['id', 'nombre','idtipoproducto']
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
                message: 'No se pudo listar los productos.'
            };
        })
    }
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  Producto.findAndCountAll({
            attributes: ProductoServicio.ProductoAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }
            },
            order: [
                ['id', 'DESC'],
                ]
        })
    }
    public guardar(producto: any){

        producto = JSON.parse(producto.data);
        return  Producto.findOne({  where: {
                nombre: producto.nombre,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                    return {
                        ok: false,
                        message: 'Ya existe un registro con el mismo nombre'
                    };
                }
                else { // insert
                   return Producto.create(producto)
                        .then(data => {
                            return {
                                ok: true,
                                data:{}
                            };
                        })
                       .catch(error => {
                           logger.error(error);
                           return {
                               ok: false,
                               message: 'No se pudo crear el producto'
                           };
                       })


                }
            })
    }
    public actualizar(producto: any){

        producto = JSON.parse(producto.data);
        return  Producto.findOne({  where: {
                id: producto.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists
                     obj.update(producto);
                     return {
                         ok: true,
                         message: 'Producto actualizado correctamente.'
                     }
                }
                else { // insert
                    return {
                        ok: false,
                        message: 'No se encontró el producto'
                    }
                }
            })
    }

    public obtener(id: any){
        return  Producto.findOne({
            attributes: ['id','nombre','idfamilia',
                        'codbarras','inventariable','afectoigv','stockminimo',
                        'codfabricante','idmarca','idtipoproducto','idunidad'],
            include: [{
                model: Marca,
                as: 'marca',
                attributes: ['id', 'nombre']
            }],
            where: {
                id: id
            }
        }).then(function(producto: any) {
            if (!producto) {
                return 'not find';
            }
            return producto
        }).catch((err: any )=>{
            logger.error(err);
            return 'Error al obtener producto';
        }) ;
    }
}

