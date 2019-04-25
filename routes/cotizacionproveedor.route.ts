import {Request, Response, Router} from "express";
import {verificarToken} from "../middlewares/auth";
import {logger} from "../global/environment";
import {verificarIp} from '../middlewares/ippermitida';
import {CotizacionProveedorServicio} from '../servicio/cotizacionproveedor.servicio';

const cotizacionproveedorrouter = Router();

const cotizacionProveedorServicio: CotizacionProveedorServicio = new CotizacionProveedorServicio();
cotizacionproveedorrouter.route('/')

    .post(verificarIp, async (req: Request, res: Response) => {

        let respuesta;
        try {
            respuesta = await cotizacionProveedorServicio.guardar(req.body);
            res.status(200).send(respuesta);
        } catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Error al intentar guardar el cotizacion'};
            res.status(400).send(respuesta);
        }
    })
    .put(verificarIp, (req: Request, res: Response) => {
        cotizacionProveedorServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            logger.error(err);
            res.send(err)
        })
    });

cotizacionproveedorrouter.get('/obtenerparacomparar/:id', verificarIp, async (req: Request, res: Response) => {
    let respuesta;

    try{
        respuesta = await cotizacionProveedorServicio.obtenerParaCuadroComparativo(req.params.id);
        res.status(200).send(respuesta);
    }catch (e) {
        logger.error(e);
        respuesta = {ok: false, message: 'Hubo un error al obtener la cotizacion'};
        res.status(400).send(respuesta);
    }
});
cotizacionproveedorrouter.get('/:cotizacion', verificarToken, async (req: any, res: Response) => {
    let respuesta;

    try{
        respuesta = await cotizacionProveedorServicio.obtenerParaProveedor(req.params.cotizacion,req.usuario.id);
        res.status(200).send(respuesta);
    }catch (e) {
        logger.error(e);
        respuesta = {ok: false, message: 'Hubo un error al obtener la cotizacion'};
        res.status(400).send(respuesta);
    }
});
cotizacionproveedorrouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, async (req: any, res: Response) => {
        let respuesta;
        let filtros = req.body;
        try{
            respuesta = await cotizacionProveedorServicio.busquedaPaginadaPorProveedor(req.usuario, req.params.cantidad, req.params.pagina,filtros);
            res.status(200).send(respuesta);
        }catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Hubo un error al listar las cotizaciones'};
            res.status(400).send(respuesta);
        }
    });

export default cotizacionproveedorrouter;
