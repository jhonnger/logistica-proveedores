
import {Proveedor, ProveedorDTO} from '../entidad/Proveedor';
import {TipoDocumento} from "../entidad/TipoDocumento";
import {Op} from "sequelize";
import {logger} from "../global/environment";
import {Usuario} from '../entidad/Usuario';

export class ProveedorServicio {

    static get ProveedorAttributes() {
        return ['id', 'nombre','numdocumento']
    }
    private static _proveedor: any;
    static get proveedor() {
        return ProveedorServicio._proveedor;
    }

    public listarTodos(){
        return  Proveedor.findAll({
            attributes: ProveedorServicio.ProveedorAttributes
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
                message: 'No se pudo listar los proveedores.'
            };
        })
    }
    public login( usuario: ProveedorDTO ){
        return Proveedor.findAll({
            attributes: ['id','nombre','numdocumento','clave'],
            include: [],
            where: {
                numdocumento: usuario.numdocumento,
                estado: true
            }
        })
    };
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  Proveedor.findAndCountAll({
            attributes: ProveedorServicio.ProveedorAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where:{
                nombre:{
                    [Op.iLike]: `%${nombre}%`
                }
            },
            order: [
                ['nombre', 'ASC'],
            ]
        })
    }
    public guardar(proveedor: any){
        proveedor = JSON.parse(proveedor.data);
        return  Proveedor.findOne({  where: {
                nombre: proveedor.nombre,
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
                 return Proveedor.create(proveedor)
                        .then(data => {
                            return {
                                ok: true,
                                data : []
                            };
                        }).catch( error => {
                         logger.error(error);
                         return {
                             ok: false,
                             message: 'Error al registrar proveedor'
                         };
                     })

                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    public actualizar(proveedor: any){
        proveedor = JSON.parse(proveedor.data);
        return  Proveedor.findOne({  where: {
                id: proveedor.id,
                estado: true
            } })
            .then(function(obj) {
                if(obj) { //Alread y exists

                    obj.update(proveedor);
                    return {
                        ok: true,
                        message: 'Proveedor actualizado correctamente.'
                    }
                }
                else { // insert
                    return {
                        ok: false,
                        message: 'No se encontró el proveedor'
                    }
                }
            })
    }

    public obtener(id){
        return  Proveedor.findOne({
            attributes: ['id','nombre','clave','representante','idtipodocum','numdocumento','telefono','email'],
            include: [{
                model: TipoDocumento,
                as: 'tipodocumento',
                attributes: ['id', 'nombre','abreviatura']
            }],
            where: {
                id: id
            }
        }).then(function(proveedor) {
            if (!proveedor) {
                return 'not find';
            }
            return proveedor
        }).catch(err =>{
            logger.error(err);
            return 'Error al obtener proveedor';
        }) ;
    }
}

