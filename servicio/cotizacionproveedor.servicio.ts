
import {Cotizacion, CotizacionDTO} from '../entidad/Cotizacion';
import {CotizacionDetalle} from '../entidad/CotizacionDetalle';
import {CotizacionDetalleEspecificacion} from '../entidad/CotizacionDetalleEspecificacion';
import {Op} from 'sequelize';
import {Producto} from '../entidad/Producto';
import {UnidadMedida} from '../entidad/UnidadMedida';
import {logger} from "../global/environment";
import {UtilServicio} from "../util/UtilServicio";
import {MailSenderServicio} from "./MailSender.servicio";
import {CotizacionProveedor, CotizacionProveedorDTO} from '../entidad/CotizacionProveedor';
import {RespuestaControlador} from '../util/RespuestaControlador';
import {CotizacionProveedorDetalle} from '../entidad/CotizacionProveedorDetalle';
import {CotizacionProveedorDetEsp} from '../entidad/CotizacionProveedorDetalleEspecificacion';

export class CotizacionProveedorServicio {

    senderServicio: MailSenderServicio;
    constructor(){
        this.senderServicio = new MailSenderServicio();
    }

    static get CotizacionproveedorServicioAttributes() {
        return ['id', 'fechacotizacion','fechavencimiento']
    }
    private static _cotizacion: any;
    static get cotizacion() {
        return CotizacionProveedorServicio._cotizacion;
    }

    public async listarTodos(){
        return await  Cotizacion.findAll({
            attributes: CotizacionProveedorServicio.CotizacionproveedorServicioAttributes
        });
    }

    public async busquedaPaginada(usuario, cantidad, pagina, filtros){


        let codigo  = UtilServicio.obtenerFiltroComoString(filtros,'codigo');
        let estados = UtilServicio.obtenerFiltroComoArray(filtros,'estadoPedido');
        let idPersonalSol = filtros.idPersonalSolicitante;
        let where: any = {};
        let respuesta;


        if(!UtilServicio.esNullUndefinedOVacio(codigo)){
            where.id = {
                [Op.eq]: codigo
            }
        }
        if(!UtilServicio.esNullUndefinedOVacio(idPersonalSol)){
            where.idpersonalsolicitante = {
                [Op.eq]: idPersonalSol
            }
        }
        if(UtilServicio.esArrayNoVacio(estados)){
            where.estadoreq = {
                [Op.in]: estados
            }
        }
        respuesta = {ok: true, data:[]};
        respuesta.data = await  Cotizacion.findAndCountAll({
            attributes: CotizacionProveedorServicio.CotizacionproveedorServicioAttributes,
            limit: cantidad,
            offset: pagina*cantidad,
            where,
            order: [
                ['id', 'DESC'],
            ]
        });
        return respuesta;
    }
    public async busquedaPaginadaPorProveedor(usuario, cantidad, pagina, filtros){


        let codigo  = UtilServicio.obtenerFiltroComoString(filtros,'codigo');
        let estados = UtilServicio.obtenerFiltroComoArray(filtros,'estadoPedido');
        let idPersonalSol = filtros.idPersonalSolicitante;
        let where: any = {};
        let respuesta;


        if(!UtilServicio.esNullUndefinedOVacio(codigo)){
            where.id = {
                [Op.eq]: codigo
            }
        }
        if(!UtilServicio.esNullUndefinedOVacio(idPersonalSol)){
            where.idpersonalsolicitante = {
                [Op.eq]: idPersonalSol
            }
        }
        if(UtilServicio.esArrayNoVacio(estados)){
            where.estadoreq = {
                [Op.in]: estados
            }
        }
        respuesta = {ok: true, data:[]};
        respuesta.data = await  Cotizacion.findAndCountAll({
            attributes: CotizacionProveedorServicio.CotizacionproveedorServicioAttributes,
            include: [{
                model: CotizacionProveedor,
                as: 'cotizacionproveedores',
                where: {
                    idproveedor: usuario.id
                }
            }],
            limit: cantidad,
            offset: pagina*cantidad,
            where,
            order: [
                ['id', 'DESC'],
            ]
        });
        return respuesta;
    }
    public async guardar(cotizacion: any){

        return {ok: false, message: `No permitido`};
    }
    private async tienePermisosDeProveedor(proveedorId: number, cotizacionId: number): Promise<boolean>{
        let cotizaciones;
        cotizaciones = await CotizacionProveedor.findAndCountAll({
            attributes: ['id'],
            where: {
                idproveedor: proveedorId,
                idcotizacion: cotizacionId,
                estado: true
            }
        });

        return  cotizaciones.count > 0;

    }


    public async actualizar(cotizacionProveedor: any){

        let cotizacionProveedorEnBase;
        let especificaciones;
        let respuesta;
        let detalles;
        let detalleEnBase;

        try {
            //Buscamos el cotizacion para actualizarlo
            cotizacionProveedorEnBase= await CotizacionProveedor.findOne({  where: {
                    id: cotizacionProveedor.id,
                    estado: true
                } });


            if(!UtilServicio.esNullUndefinedOVacio(cotizacionProveedorEnBase.id)){
                await CotizacionProveedor.update({observacion: cotizacionProveedor.observacion},
                    {where: {id: cotizacionProveedorEnBase.id}});
                detalles = cotizacionProveedor.cotizaciondetalle;


                detalles.forEach( async (detalle) => {
                    if(detalle.id){
                        detalleEnBase = await CotizacionProveedorDetalle.findOne({where: {
                            id: detalle.id,
                            estado: true,
                            idcotizacionproveedorcab: cotizacionProveedor.id
                        }});

                        if(!UtilServicio.esNullUndefinedOVacio(detalleEnBase)){
                            await CotizacionProveedorDetalle.update({
                                precio: detalle.precio,
                                observacion: detalle.observacion
                            } ,{where: {id: detalle.id}});

                            especificaciones = detalle.especificaciones;

                            if(UtilServicio.esArrayNoVacio(especificaciones)){
                                especificaciones.forEach(async (especificacion) => {
                                    if(especificacion.id){
                                        // No se debe modificar por el momento
                                    }
                                    else {
                                        especificacion.idcotizaciondetalle = detalle.id;
                                        await CotizacionProveedorDetEsp.create(especificacion)
                                    }
                                })
                            }
                        }
                    } else {
                        detalle.idcotizacionproveedorcab = cotizacionProveedor.id;
                        return await CotizacionProveedorDetalle.create(detalle, {
                            include: [{
                                model: CotizacionProveedorDetEsp,
                                as: 'especificaciones'
                            }
                            ]})
                    }
                });
                return {ok: true,message: `Cotizacion guardada correctamente `};
            } else {
                respuesta = {ok: false, message: 'No se encontró la cotizacion para actualizar.'}
            }
        } catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Hubo un problema al actualizar.'}
        }
        return respuesta;
    }

    public async obtenerParaProveedor(idCotizacion,idUsuario){
        let cotizacionProveedor;
        let respuesta;

        cotizacionProveedor = await CotizacionProveedor.findOne({
                attributes: ['id', 'idproveedor','idcotizacion'],
                include:[{
                    model: CotizacionProveedorDetalle,
                    as: 'cotizaciondetalle',
                    required: false,
                    attributes:['id','cantidad','estado','precio','observacion'],
                    include:[{
                        model: Producto,
                        as: 'producto',
                        attributes:['id','nombre']
                    },{
                        model: UnidadMedida,
                        as: 'unidad',
                        attributes:['id','nombre']
                    },{
                        model: CotizacionProveedorDetEsp,
                        as: 'especificaciones',
                        required: false,
                        attributes:['id','detalle'],
                        where: {
                            estado: true
                        }
                    }
                    ],
                    where: {
                        estado: true
                    }
                },{
                    model: Cotizacion,
                    as: 'cotizacion',
                    attributes:['id','estado','fechacotizacion','fechaentrega','fechavencimiento','lugarentrega','observacion'],
                    required: true,
                    include: [{
                        model: CotizacionDetalle,
                        as: 'cotizaciondetalle',
                        attributes:['cantidad','estado','idproducto','idunidad'],
                        include:[{
                            model: Producto,
                            as: 'producto',
                            attributes:['id','nombre']
                        },{
                            model: UnidadMedida,
                            as: 'unidad',
                            attributes:['id','nombre']
                        },{
                            model: CotizacionDetalleEspecificacion,
                            as: 'especificaciones',
                            required: false,
                            attributes:['id','detalle','estado'],
                            where: {
                                estado: true
                            }
                        }
                        ],
                        where: {
                            estado: true
                        }
                    }],
                    where: {
                        estado: true,
                        fechavencimiento:
                            {[Op.gt]: new Date()}
                    }
                }
                ],
                where: {
                    idcotizacion: idCotizacion,
                    idproveedor: idUsuario,
                    estado: true
                }
        });

        cotizacionProveedor  = JSON.parse(JSON.stringify(cotizacionProveedor))
        if(!UtilServicio.esArrayNoVacio(cotizacionProveedor.cotizaciondetalle)){
            cotizacionProveedor.cotizaciondetalle = ( cotizacionProveedor.cotizacion.cotizaciondetalle);
        }
        delete cotizacionProveedor.cotizacion.cotizaciondetalle;

        respuesta = {ok: true,cotizacionProveedor};
        return respuesta;
    }
}

