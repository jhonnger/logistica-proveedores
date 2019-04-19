import {Request, Response, Router} from "express";
import {PresentacionServicio} from "../servicio/presentacion.servicio";
import {verificarToken} from "../middlewares/auth";

const presentacionrouter = Router();

const presentacionServicio: PresentacionServicio = new PresentacionServicio();
presentacionrouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        presentacionServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
    .post(verificarToken, (req: Request, res: Response) => {
        presentacionServicio.guardar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .put(verificarToken, (req: Request, res: Response) => {
        presentacionServicio.actualizar(req.body)
        .then(data =>{
            res.json(data)
        })
        .catch(err => {
            res.send(err)
        })
    })
    ;
presentacionrouter.delete('/:id', verificarToken, (req: Request, res: Response) => {

        presentacionServicio.eliminar(req.params.id)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    });
    presentacionrouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        presentacionServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default presentacionrouter;