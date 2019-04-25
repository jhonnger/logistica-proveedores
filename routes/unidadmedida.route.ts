import {Request, Response, Router} from "express";
import {UnidadMedidaServicio} from "../servicio/unidadmedida.servicio";
import {verificarToken} from "../middlewares/auth";
import {verificarIp} from '../middlewares/ippermitida';

const unidadMedidarouter = Router();

const unidadMedidaServicio: UnidadMedidaServicio = new UnidadMedidaServicio();
unidadMedidarouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        unidadMedidaServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarIp, (req: Request, res: Response) => {
    unidadMedidaServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarIp, (req: Request, res: Response) => {
    unidadMedidaServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    });

unidadMedidarouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        unidadMedidaServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })

unidadMedidarouter.get('/:id', verificarToken, (req: Request, res: Response) => {
    unidadMedidaServicio.obtener(req.params.id)
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: '',
                unidadMedida: data
            })
        })
        .catch( ( err  )=> {
            res.status(400).send({
                ok: false,
                message: 'Error al obtener unidades',
                err
            })
        })
});
export default unidadMedidarouter;
