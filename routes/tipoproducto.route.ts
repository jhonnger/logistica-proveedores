import {Request, Response, Router} from "express";
import {TipoProductoServicio} from "../servicio/tipoproducto.servicio";
import {verificarToken} from "../middlewares/auth";

const tipoproductorouter = Router();

const tipoproductoServicio: TipoProductoServicio = new TipoProductoServicio();
tipoproductorouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        tipoproductoServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarToken, (req: Request, res: Response) => {
    tipoproductoServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarToken, (req: Request, res: Response) => {
    tipoproductoServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    });
tipoproductorouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        tipoproductoServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default tipoproductorouter;