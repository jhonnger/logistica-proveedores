import {Especificacion} from './Especificacion';
import {Producto} from './Producto.interface';
import {UnidadMedida} from './UnidadMedida.interface';

export interface PedidoDetalle {
  id?: number;
  idproducto?: number;
  producto?: Producto;
  cantidad?: number;
  idunidad?: number;
  unidad?: UnidadMedida;
  estado?: boolean;
  especificaciones?: Especificacion[];
}
