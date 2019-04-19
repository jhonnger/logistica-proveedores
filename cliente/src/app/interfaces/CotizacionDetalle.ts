import {Especificacion} from './Especificacion';
import {Producto} from './Producto.interface';
import {UnidadMedida} from './UnidadMedida.interface';

export interface CotizacionDetalle {
  id?: number;
  idproducto?: number;
  producto?: Producto;
  cantidad?: number;
  idunidad?: number;
  precio?: number;
  observacion?: string;
  unidad?: UnidadMedida;
  estado?: boolean;
  especificaciones?: Especificacion[];
}
