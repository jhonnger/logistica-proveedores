import jwt from 'jsonwebtoken';
import {SEED} from '../global/environment';
import {  Response, NextFunction } from 'express';
import {UtilServicio} from "../util/UtilServicio";


// ======================================
// Inicio verificar token  manera simple
// ======================================
export const verificarToken = function(req: any, res: Response, next: NextFunction) {
    var token = req.get('token');

    jwt.verify(token, SEED , (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        if(!UtilServicio.esNullUndefinedOVacio(req.usuario) && !UtilServicio.esNullUndefinedOVacio(req.body)){

            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            //**********************************
            //*        Auditoria               *
            //**********************************
            if(!UtilServicio.esNullUndefinedOVacio(req.body.id)){ //Si es una creacion
                req.body.usuario = req.usuario.login;
                req.body.ip = ip;
            }
            req.body.usuariomod = req.usuario.login;
            req.body.ipmod = ip;


        }

        next();

    });
};
// ======================================
// Fin verificar token manera simple
// ======================================

