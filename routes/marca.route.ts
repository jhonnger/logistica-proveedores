import {Request, Response, Router} from "express";
import {MarcaServicio} from "../servicio/marca.servicio";
import {verificarToken} from "../middlewares/auth";
import {verificarIp} from '../middlewares/ippermitida';

const marcarouter = Router();

const marcaServicio: MarcaServicio = new MarcaServicio();
marcarouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        marcaServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarIp, (req: Request, res: Response) => {
    marcaServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarIp, (req: Request, res: Response) => {
    marcaServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    });

marcarouter.get('/:id', verificarToken, (req: Request, res: Response) => {
    marcaServicio.obtener(req.params.id)
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: '',
                marca: data
            })
        })
        .catch( ( err  )=> {
            res.status(400).send({
                ok: false,
                message: 'Error al obtener proveedores',
                err
            })
        })
});
marcarouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        marcaServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default marcarouter;
