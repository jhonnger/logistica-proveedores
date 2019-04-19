import {Router, Request, Response} from 'express';
import { UsuarioServicio } from '../servicio/usuario.servicio';
import {verificarToken} from "../middlewares/auth";

const usuariorouter = Router();
const usuarioServicio: UsuarioServicio = new UsuarioServicio();

// ======================================================
// *************** listar usuario ***************
usuariorouter.route('/')
    .get(verificarToken, (req: Request, res: Response) => {
        usuarioServicio.listarTodos()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    })
    .post(verificarToken, (req: Request, res: Response) => {
        usuarioServicio.crearUsuario(req.body)
            .then((data: any) =>{
                res.json(data)
            })
            .catch((err: any) => {
                res.json(err)
            })
        })
    .put(verificarToken, (req: Request, res: Response) => {
        usuarioServicio.actualizar(req.body)
            .then(data =>{
                res.json(data)
            })
        });
// *************** creear usuario END ***************
// ======================================================

usuariorouter.get('/:id', verificarToken, (req: Request, res: Response) => {
    usuarioServicio.obtenerUsuario(req.params.id)
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: '',
                usuario: data
            })
        })
        .catch(  (err: any )=> {
            res.status(400).send({
                ok: false,
                message: 'Error al listar usuarios',
                err
            })
        })
});



usuariorouter.put('/', verificarToken, (req: Request, res: Response) => {

    usuarioServicio.actualizar( req.body )
        .then( ( data: any ) =>{
            res.status(200).send({
                ok: true,
                message: ''
            })
        })
        .catch( ( err ) => {
            res.status(400).send({
                ok: false,
                message: 'Error al actualizar usuario',
                err
            })
        });
});
usuariorouter.route('/cantidad/:cantidad/pagina/:pagina')
    .post(verificarToken, (req: Request, res: Response) => {
        let filtros = req.body;
        usuarioServicio.busquedaPaginada(req.body, req.params.cantidad, req.params.pagina,filtros)
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
export default usuariorouter;


