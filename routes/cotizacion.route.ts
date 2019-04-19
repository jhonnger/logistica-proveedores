import {Request, Response, Router} from "express";
import {CotizacionServicio} from "../servicio/cotizacion.servicio";
import {verificarToken} from "../middlewares/auth";
import {logger} from "../global/environment";
import {verificarIp} from '../middlewares/ippermitida';

const cotizacionrouter = Router();

const cotizacionServicio: CotizacionServicio = new CotizacionServicio();
cotizacionrouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        cotizacionServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                logger.error(err);
                res.send(err)
            })
    })
    .post(verificarIp, async (req: Request, res: Response) => {

        let respuesta;
        try {
            respuesta = await cotizacionServicio.guardar(req.body);
            res.status(200).send(respuesta);
        } catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Error al intentar guardar el cotizacion'};
            res.status(400).send(respuesta);
        }
    })
    .put(verificarToken, (req: Request, res: Response) => {
    cotizacionServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            logger.error(err);
            res.send(err)
        })
    });

cotizacionrouter.get('/:id', verificarToken, async (req: Request, res: Response) => {
    let respuesta;

    try{
        respuesta = await cotizacionServicio.obtener(req.params.id);
        res.status(200).send(respuesta);
    }catch (e) {
        logger.error(e);
        respuesta = {ok: false, message: 'Hubo un error al obtener la cotizacion'};
        res.status(400).send(respuesta);
    }
});
cotizacionrouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, async (req: any, res: Response) => {
        let respuesta;
        let filtros = req.body;
        try{
            respuesta = await cotizacionServicio.busquedaPaginadaPorProveedor(req.usuario, req.params.cantidad, req.params.pagina,filtros);
            res.status(200).send(respuesta);
        }catch (e) {
            logger.error(e);
            respuesta = {ok: false, message: 'Hubo un error al listar las cotizaciones'};
            res.status(400).send(respuesta);
        }
    });

export default cotizacionrouter;
