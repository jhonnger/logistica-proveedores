import {RespuestaControladorInterface} from "../entidad/RespuestaControlador.interface";

export class RespuestaControlador implements RespuestaControladorInterface{
    data: object | null;
    message: string;
    ok: boolean;

    constructor(ok: boolean, data: object | null, message: string) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }

    static obtenerRespuestaExito(data: object, message: string){
        return new RespuestaControlador(true, data,'');
    }
    static obtenerRespuestaError( message: string){
        return new RespuestaControlador(false, null,message);
    }
}