import {Router, Request, Response} from 'express';
import bcryptjs  from 'bcryptjs';
import jwt  from 'jsonwebtoken';
// Constantes
import {logger, SEED} from '../global/environment';
import {ProveedorServicio} from '../servicio/proveedor.servicio';


const loginrouter = Router();
const usuarioServicio: ProveedorServicio = new ProveedorServicio();
//
loginrouter.get('/', (req: Request, res: Response) => {
});

loginrouter
.post( '/', (req: Request, res: Response) => {

    const body =  req.body;
    usuarioServicio.login( body )
        .then( ( data: any ) => {

            let usuario: any;

            if ( data.length === 0) {
               return res.status(200).json({
                    ok: false,
                    message: 'Credenciales Incorrectas'
                })
            }
            usuario = data[0];

           // const flag = bcryptjs.compareSync( body.password, usuario.clave) ;
            const flag =  body.password == usuario.clave ;
            if ( !flag ) {
               return res.status(200).json({
                    ok: false,
                    message: 'Credenciales Incorrectas'
                })
            }
            //Si se llega hasta acá es porque está todo ok



            const token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 10000 }); // 2,7 horas de token

            usuario.id = undefined;
            usuario.clave = 'Siempre que ves una persona exitosa percibes sus glorias, y nunca los sacrificios que la llevaron hasta allí';

            return res.status(200).json({
                ok: true,
                message: 'Login exitoso',
                data: usuario,
                token
            })
        })

        .catch( ( error )=>{
            logger.error(error);
            res.status(200).send({
                ok: false,
                error
            })
        });
         
});
// =========================
// Renovar Token
// =========================
loginrouter.get('/renovarToken', (req: Request, res: Response) => {

    let request: any;
    request = req;
    const token = jwt.sign({ data: request.usuario }, SEED, { expiresIn: 10000 }); // 2,7 horas de token

    return res.status(200).json({
        ok: true,
        token
    });


});


loginrouter.get('/validtoken', (req: Request, res: Response) => {
    var token = req.query.token;

    jwt.verify(token, SEED, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Sesion terminada',
                errors: err
            });
        }

        res.status(202).json({
            ok: true,
            mensaje: 'Session Start',
            decoded,
            exp: decoded.exp
        });

    });
});
export default loginrouter;


