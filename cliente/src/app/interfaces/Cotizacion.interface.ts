import {CotizacionDetalle} from "./CotizacionDetalle";
import {Proveedor} from "./Proveedor.interface";

export interface Cotizacion {
  id?: number;
  fechacotizacion?: Date;
  fechaentrega?: Date;
  horaentrega?: Date;
  fechavencimiento?: Date;
  idrequerimiento?: number;
  diascredito?: number;
  observacion?: string;
  cotizaciondetalle?: CotizacionDetalle[];
  cotizacionproveedores?: any[];
  proveedores?: Proveedor[];
  enviarEmail?: boolean;
  subject?: string;
  message?: string;
  lugarentrega?:string;
}
