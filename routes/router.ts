import { Router } from 'express';
import loginrouter  from './login.router';
import usuariorouter from './usuario.route';
import productorouter from './producto.route';
import unidadMedida from './unidadmedida.route';
import proveedor from './proveedor.route';
import tipoproducto from './tipoproducto.route';
import marca from './marca.route';
import presentacion from './presentacion.route';

import cotizacionrouter from "./cotizacion.route";
import cotizacionproveedorrouter from './cotizacionproveedor.route';

const rutasIndex = Router();
 
rutasIndex.use( '/login', loginrouter );
rutasIndex.use( '/usuario', usuariorouter );
 
rutasIndex.use( '/producto', productorouter );
rutasIndex.use( '/unidadMedida', unidadMedida );
rutasIndex.use( '/proveedor', proveedor );
rutasIndex.use( '/tipoproducto', tipoproducto);
rutasIndex.use( '/marca', marca );
rutasIndex.use( '/presentacion', presentacion );
rutasIndex.use( '/cotizacion', cotizacionrouter );
rutasIndex.use( '/cotizacionproveedor', cotizacionproveedorrouter );

export default rutasIndex;
