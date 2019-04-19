export interface Producto {
  id?: number;
  nombre?: string;
  codfabricante?: string;
  codbarras?: string;
  afectoigv?: string;
  marca?: object;
  idmarca?: number;
  idfamilia?: number;
  idtipoproducto?: number;
  idunidad?: number;
  inventariable?: boolean;
  stockminimo?: boolean;
}
