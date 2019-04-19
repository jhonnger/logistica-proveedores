import {TipoDocumento} from './TipoDocumento.interface';

export interface Proveedor {
  id?: number;
  nombre?: string;
  tipodocumento?: TipoDocumento;
  idtipodocum?: number;
  numdocumento?: string;
  telefono?: string;
  representante?: string;
  email?: string;
  clave?: string;
}
