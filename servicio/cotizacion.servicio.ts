
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
import {Proveedor} from "../entidad/Proveedor";
import {RespuestaControlador} from '../util/RespuestaControlador';

export class CotizacionServicio {

    senderServicio: MailSenderServicio;
    constructor(){
        this.senderServicio = new MailSenderServicio();
    }

    static get CotizacionAttributes() {
        return ['id', 'fechacotizacion','fechavencimiento']
    }
    private static _cotizacion: any;
    static get cotizacion() {
        return CotizacionServicio._cotizacion;
    }

    public async listarTodos(){
        return await  Cotizacion.findAll({
            attributes: CotizacionServicio.CotizacionAttributes
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
            attributes: CotizacionServicio.CotizacionAttributes,
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
        let where: any = {};
        let respuesta;


        if(!UtilServicio.esNullUndefinedOVacio(codigo)){
            where.id = {
                [Op.eq]: codigo
            }
        }

        where.fechavencimiento = {[Op.gt]: new Date()};

        if(UtilServicio.esArrayNoVacio(estados)){
            where.estadoreq = {
                [Op.in]: estados
            }
        }
        respuesta = {ok: true, data:[]};
        respuesta.data = await  Cotizacion.findAndCountAll({
            attributes: CotizacionServicio.CotizacionAttributes,
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

        cotizacion = JSON.parse(cotizacion.data);

        let opciones, cotizacionCreado;
        opciones = {
            include: [{
                model: CotizacionProveedor,
                as: 'cotizacionproveedores'
            },{
                model: CotizacionDetalle,
                as: 'cotizaciondetalle',
                include: [{
                    model: CotizacionDetalleEspecificacion,
                    as: 'especificaciones'
                }]
            }
            ]};

        cotizacionCreado =await  Cotizacion.create(cotizacion,opciones);

        return {ok: true,data: cotizacionCreado.id, message: `Nueva cotizacion creado, Código: ${cotizacionCreado.id} `};
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
    public async guardarCotizacionProveedor(cotizacion: CotizacionProveedorDTO, usuario){
        let opciones, cotizacionCreado, tienePermisos;

        tienePermisos = await this.tienePermisosDeProveedor(usuario.id, cotizacion.idcotizacion);

        if(!tienePermisos) {
            return RespuestaControlador.obtenerRespuestaError('Operación no permitida')
        }
        opciones = {
            include: [{
                model: CotizacionProveedor,
                as: 'cotizacionproveedores'
            },{
                model: CotizacionDetalle,
                as: 'cotizaciondetalle',
                include: [{
                    model: CotizacionDetalleEspecificacion,
                    as: 'especificaciones'
                }]
            }
            ]};

        cotizacionCreado =await  CotizacionProveedor.create(cotizacion,opciones);

        return {ok: true,data: cotizacionCreado.id, message: `Nueva cotizacion creado, Código: ${cotizacionCreado.id} `};
    }

    public async actualizar(cotizacion: any){

        let cotizacionProveedores;
        let cotizacionEnBase;
        let especificaciones;
        let respuesta;
        let detalles;

        try {
            cotizacion = JSON.parse(cotizacion.data);
            //Buscamos el cotizacion para actualizarlo
            cotizacionEnBase= await Cotizacion.findOne({  where: {
                    id: cotizacion.id,
                    estado: true
                } });


            if(!UtilServicio.esNullUndefinedOVacio(cotizacionEnBase.id)){
                await cotizacionEnBase.update(cotizacion);
                detalles = cotizacion.cotizaciondetalle;
                cotizacionProveedores = cotizacion.cotizacionproveedores;

                cotizacionProveedores.forEach(async item => {
                    if(item.id){
                        await CotizacionProveedor.update(item,{where: {id: item.id}});
                    } else {
                        item.idcotizacion = cotizacionEnBase.id;
                        await CotizacionProveedor.create(item)
                    }
                });

                detalles.forEach( async (detalle) => {
                    if(detalle.id){
                        await CotizacionDetalle.update(detalle,{where: {id: detalle.id}});
                        especificaciones = detalle.especificaciones;

                        if(!UtilServicio.esNullUndefinedOVacio(especificaciones) && especificaciones.length> 0){
                            especificaciones.forEach(async (especificacion) => {
                                if(especificacion.id)
                                    await CotizacionDetalleEspecificacion.update(especificacion,{where: {id: especificacion.id}})
                                else {
                                    especificacion.idcotizaciondetalle = detalle.id;
                                    await CotizacionDetalleEspecificacion.create(especificacion)
                                }
                            })
                        }
                    } else {
                        detalle.idcotizacion = cotizacion.id;
                        return await CotizacionDetalle.create(detalle, {
                            include: [{
                                model: CotizacionDetalleEspecificacion,
                                as: 'especificaciones'
                            }
                            ]})
                    }
                });
                return {ok: true,data: cotizacion.id, message: `Cotizacion actualizado, Código: ${cotizacion.id} `};
            } else {
                respuesta = {ok: false, message: 'No se encontró la cotizacion para actualizar.'}
            }
        } catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Hubo un problema al actualizar.'}
        }
        return respuesta;
    }

    public async obtener(id){
        let cotizacion;
        let respuesta;
        cotizacion = await Cotizacion.findOne({
                attributes: ['id', 'fechacotizacion','diascredito','fechaentrega',
                    'lugarentrega',
                    'idrequerimiento','observacion','fechavencimiento'],
                include:[{
                    model: CotizacionProveedor,
                    as: 'cotizacionproveedores',
                    attributes:['id','estado'],
                    required: false,
                    include: [{
                        model: Proveedor,
                        as: 'proveedor',
                        attributes:['id','nombre']
                    }],
                    where: {
                        estado: true
                    }
                },{
                    model: CotizacionDetalle,
                    as: 'cotizaciondetalle',
                    attributes:['id','cantidad','estado'],
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
                }
                ],
                where: {
                    id: id,
                    estado: true
                }
        })

        respuesta = {ok: true,cotizacion};
        return respuesta;
    }
}

