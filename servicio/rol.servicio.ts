
import {Rol, RolDTO} from '../entidad/Rol';
import {logger} from "../global/environment";

export class RolServicio {

    static get RolAttributes() {
        return ['id', 'login','nombre','dni']
    }

    private static _rol: any;
    static get rol() {
        return RolServicio._rol;
    };
    
    public listarTodos(){
        return  Rol.findAll({
            attributes: RolServicio.RolAttributes,
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
                message: 'No se pudo listar los roles.'
            };
        })
    }
    // *************** listar rols END ***************
    // ======================================================


    
    // ======================================================
    // *************** crear rol START ***************
    public crearRol( datarol: any ){
            return Rol
            .findOne({  where: {
                nombre: datarol.nombre,
                estado: true
            } })
            .then((data: any) =>{

                    if(data) { // update
                        return {
                            ok: false,
                            message: 'Ya existe un registro con el mismo rol'
                        };

                    }
                    else { // insert
                        return Rol.create(datarol).then(data => {
                            return {
                                ok: true,
                                message: 'Rol creado exitosamente'
                            };
                        })
                        ;
                    }

            }).catch(error => {
                logger.error(error);
                    return {
                        ok: false,
                        message: 'No se pudo crear el registro'
                    };
                })
    };


    // *************** crear rol END ***************
    // ======================================================

    public actualizar( datarol: any ){
        
        return Rol
            .findOne({  where: {
                    id: datarol.id,
                    estado: true
                } })
            .then(function(obj) {
                if(obj) { // update
                     obj.update(datarol);
                    return {
                        ok: true,
                        message: 'Rol actualzado correctamente'
                    };
                }
                else { // insert
                    return {
                        ok: false,
                        message: 'No se encontró rol'
                    };
                }
            });
    }

    // =======================================
    // ============== Obtener Rol start ================
    public obtenerRol(id: any){
        return  Rol.findOne({
            attributes: ['id','nombre'],
            where: {
                id: id
            }
        }).then((datarol: any) => {
            if (!datarol) {
                return 'not find';
            }
            return datarol
        }).catch((err: any) =>{
            logger.error(err);
            return {
                ok: false,
                message: 'No se pudo obtener rol'
            };

        }) ;
    }
    // ============== Obtener Rol end ================
    // =======================================
}
