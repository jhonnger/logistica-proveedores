
import {Usuario, UsuarioDTO} from '../entidad/Usuario';
import bcryptjs  from 'bcryptjs';
import {Rol} from "../entidad/Rol";
import {Op} from 'sequelize';
import {logger} from "../global/environment";

export class UsuarioServicio {

    static get UsuarioAttributes() {
        return ['id', 'login','nombre','dni']
    }

    private static _usuario: any;
    static get usuario() {
        return UsuarioServicio._usuario;
    };
    
    public login( usuario: UsuarioDTO ){
        return Usuario.findAll({
            attributes: ['id','nombre','login','clave'],
            include: [],
            where: {
              login: usuario.login,
              estado: true
            }
          })
    };

    public listarTodos(){
        return  Usuario.findAll({
            attributes: UsuarioServicio.UsuarioAttributes,
        });
    }
    // *************** listar usuarios END ***************
    // ======================================================


    public obtenerUsuario(id){
        return  Usuario.findOne({
            attributes: ['id','nombre','login','direccion','dni','modificaclave'],
            include: [],
            where: {
                id: id
            }
        }).then(function(usuario) {
            if (!usuario) {
                return 'not find';
            }
            return usuario
        }).catch(err =>{
            logger.error(err);
            return 'Error al obtener usuario';
        }) ;
    }

    // ======================================================
    // *************** crear usuario START ***************
    public crearUsuario( datausuario: any ){
        datausuario.clave = bcryptjs.hashSync( datausuario.clave , 10 );
            return Usuario
            .findOne({  where: {
                    estado: true,
                    [Op.or]: [
                        { login: {
                            [Op.eq]: datausuario.login}
                            },
                        {idpersonal: {
                            [Op.eq]: datausuario.idpersonal
                        }
                        }
                    ]
            } })
            .then((data: any) =>{
                let respuesta;
                    if(data) { // update
                        if(data.login == datausuario.login){
                            respuesta = `Ya existe un registro con el usuario ${data.login}`
                        } else {
                            respuesta = `El personal indicado ya fue vinculado con otro suuario`
                        }
                        return {
                            ok: false,
                            message: respuesta
                        };

                    }
                    else { // insert
                        return Usuario.create(datausuario)
                            .then((data: any )=> {
                                 return {
                                    ok: true,
                                    message: data.id
                                };
                            }).catch(error => {
                                return {
                                    ok: false,
                                    message: error
                                };
                            });
                    }

            }).catch(error => {
                    logger.error(error);
                return error
                })
    };


    // *************** crear usuario END ***************
    // ======================================================

    public actualizar( datausuario: any ){

        if(datausuario!=null && datausuario.clave!==null && datausuario.clave!==undefined && datausuario.clave!=='' ){
            datausuario.clave = bcryptjs.hashSync( datausuario.clave);
        }

        return Usuario
            .findOne({  where: {
                    [Op.or]: [
                        { login:      {[Op.eq]: datausuario.login}},
                        { idpersonal: {[Op.eq]: datausuario.idpersonal}}
                    ],
                    id: {
                        [Op.ne]: datausuario.id},
                    estado: true
                } })
            .then(function(obj: any) {
                let respuesta;
                if(obj) { // Ya existe un registro
                    if(obj.login == datausuario.login){
                        respuesta = `Ya existe un registro con el usuario ${obj.login}`
                    } else {
                        respuesta = `El personal indicado ya fue vinculado con otro suuario`
                    }
                    return {
                        ok: false,
                        message: respuesta
                    };
                } else {  //Está todo ok, buscamos y acualizamos
                    return Usuario
                        .findOne({  where: {
                                id:  datausuario.id,
                                estado: true
                        }})
                        .then(function(usuario) {
                            if(usuario) { // update
                                usuario.update(datausuario);
                                return {
                                    ok: true,
                                    message: 'Usuario actualzado correctamente'
                                };
                            }
                            else { // insert
                                return {
                                    ok: false,
                                    message: 'No se encontró usuario'
                                };
                            }
                        }).catch((err)=> {console.log(err)})
                }

            }).catch((err)=> {console.log(err)})
    }
    public busquedaPaginada(busquedaPaginada, cantidad, pagina, filtros){
        let nombre = filtros.nombre!= null? filtros.nombre: '';
        return  Usuario.findAndCountAll({
            attributes: UsuarioServicio.UsuarioAttributes,
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
}

