import {Request, Response, Router} from "express";
import {ProductoServicio} from "../servicio/producto.servicio";
import {verificarToken} from "../middlewares/auth";

const productorouter = Router();

const productoServicio: ProductoServicio = new ProductoServicio();
productorouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        productoServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarToken, (req: Request, res: Response) => {
    productoServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarToken, (req: Request, res: Response) => {
    productoServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    });
productorouter.get('/:id', verificarToken, (req: Request, res: Response) => {
    productoServicio.obtener(req.params.id)
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: '',
                producto: data
            })
        })
        .catch( ( err: any  )=> {
            res.status(400).send({
                ok: false,
                message: 'Error al obtener producto',
                err
            })
        })
});
productorouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        productoServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default productorouter;
