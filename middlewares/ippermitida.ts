import jwt from 'jsonwebtoken';
import {SEED} from '../global/environment';
import {  Response, NextFunction } from 'express';
import {UtilServicio} from "../util/UtilServicio";


// ======================================
// Inicio verificar token  manera simple
// ======================================
export const verificarIp = function(req: any, res: Response, next: NextFunction) {

    var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    console.log(ip)
    if (ip.indexOf('127.0.0.1') == -1 && ip !='::1') // exit if it's a particular ip
        return res.status(401).json({
            ok: false,
            mensaje: 'No autorizado'
        });

    next();
};
// ======================================
// Fin verificar token manera simple
// ======================================

