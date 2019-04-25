import {Request, Response, Router} from "express";
import {ProveedorServicio} from "../servicio/proveedor.servicio";
import {verificarToken} from "../middlewares/auth";
import {verificarIp} from '../middlewares/ippermitida';

const proveedorrouter = Router();

const proveedorServicio: ProveedorServicio = new ProveedorServicio();
proveedorrouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        proveedorServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarIp, (req: Request, res: Response) => {
    proveedorServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarIp, (req: Request, res: Response) => {
    proveedorServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    });

proveedorrouter.get('/:id', verificarToken, (req: Request, res: Response) => {
    proveedorServicio.obtener(req.params.id)
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: '',
                proveedor: data
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
proveedorrouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarIp, (req: Request, res: Response) => {
        let filtros = req.body;
        proveedorServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default proveedorrouter;
