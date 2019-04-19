import {PedidoDetalle} from './PedidoDetalle';
import {Area} from './Area.interface';

export interface Pedido {
  id?: number;
  fechapedido?: Date;
  tiporequerimiento?: string;
  areasolicitante?: Area;
  idareasolicitante?: string;
  idareausuaria?: number;
  areausuaria?: Area;
  idusuariofinal?: number;
  observacion?: string;
  esurgente?: string;
  idpersonalsolicitante?: number;
  pedidodetalles?: PedidoDetalle[];
  requerimientodetalle?: PedidoDetalle[];
  esAprobacion?: boolean;
}
