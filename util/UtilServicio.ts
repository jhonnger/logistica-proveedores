
export class UtilServicio {

    public static esNullUndefinedOVacio(cadena: any): boolean{
        return cadena=== undefined || cadena == null || (typeof cadena == 'string' && cadena.trim() == '')
    }

    public static obtenerFiltroComoString(filtros: any,key: string): any{
        let resp = null;
        if(!this.esNullUndefinedOVacio(filtros)){
           resp = filtros[key];
        }
        return resp;
    }
    public static obtenerFiltroComoArray(filtros: any,key: string){
        let resp: any = null;
        if(!this.esNullUndefinedOVacio(filtros)){
           resp = filtros[key];
        }
        if(resp!= null){
            resp = resp.filter(value => {
                return !this.esNullUndefinedOVacio(value);
            });
        }
        return resp;
    }
    public static esArrayNoVacio(value): boolean{
        return Array.isArray(value) && value.length > 0;
    }
}
