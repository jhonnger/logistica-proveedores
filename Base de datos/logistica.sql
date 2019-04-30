DROP TABLE IF EXISTS tipodocumento CASCADE;
create table tipodocumento(
	id serial ,
	nombre character varying(100) not null,
	abreviatura character varying(10) not null,
	longitudmaxima integer not null,
	longitudminima integer not null,
    eslongitudfija boolean, --
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
	pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
    CONSTRAINT tipodocumento_pkey PRIMARY KEY (id)
);



create table unidad(
	id serial ,
	nombre character varying(50) not null,
	codigosunat character(10),
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
	pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT unidad_pkey PRIMARY KEY (id)
);
create table presentacion(
	id serial ,
	nombre character varying(100) not null,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
	pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT presentacion_pkey PRIMARY KEY (id)
);

create table marca(
	id serial ,
	nombre character varying(200) not null,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT marca_pkey PRIMARY KEY (id)
);

create table tipoproducto(
	id serial ,
	nombre character varying(100) not null,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
	pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT tipoproducto_pkey PRIMARY KEY (id)
);
create table producto(
	id integer ,
	nombre character varying(100) not null,
    codbarras character varying(16), -- Codigo de barras
    codfabricante character varying(16), -- Codigo de barras
    inventariable boolean NOT NULL,
    stockminimo integer,
    idtipoproducto integer,
    afectoigv boolean DEFAULT true,
    idunidad integer, -- Identificador de unidad
    idmarca integer, -- Identificador de unidad
    idpresentacion integer, -- Identificador de presentacion
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT producto_pkey PRIMARY KEY (id),
	CONSTRAINT producto_idunidad_fkey FOREIGN KEY (idunidad)
      REFERENCES public.unidad(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT producto_idpresentacion_fkey FOREIGN KEY (idpresentacion)
      REFERENCES public.presentacion(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT producto_idmarca_fkey FOREIGN KEY (idmarca)
      REFERENCES public.marca(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT producto_idtipoproducto_fkey FOREIGN KEY (idtipoproducto)
      REFERENCES public.tipoproducto(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
create table proveedor(
	id integer ,
	nombre character varying(200) not null,
	idtipodocum integer NOT NULL,
	numdocumento character varying(20) NOT NULL, -- num documento
    telefono character varying(13), --
    representante character varying(255), --
    email character varying(50), --
    clave character varying(255), --
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT proveedores_pkey PRIMARY KEY (id),
	CONSTRAINT tipodocum_fkey FOREIGN KEY (idtipodocum)
      REFERENCES public.tipodocumento (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

DROP TABLE IF EXISTS cotizacion CASCADE;
create table cotizacion(
	id integer ,
	fechacotizacion timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
	idrequerimiento integer,
	diascredito integer ,
	fechaentrega timestamp without time zone NOT NULL DEFAULT now(),
	horaentrega time without time zone,
	lugarentrega character varying(255),
	fechavencimiento timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
	observacion text,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT cotizacion_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS cotizaciondetalle CASCADE;
create table cotizaciondetalle(
	id integer ,
	idcotizacion integer not null,
	idproducto integer not null,
    idunidad integer not null,
    cantidad numeric(9,2) not null,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT cotizaciondetalle_pkey PRIMARY KEY (id),
	CONSTRAINT cotizaciondetalle_cotizacion_fkey FOREIGN KEY (idcotizacion)
      REFERENCES public.cotizacion (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  cotizaciondetalle_producto_fkey FOREIGN KEY (idproducto)
      REFERENCES public.producto (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  cotizaciondetalle_unidad_fkey FOREIGN KEY (idunidad)
      REFERENCES public.unidad (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
DROP TABLE IF EXISTS cotizaciondetespecif CASCADE;
CREATE TABLE public.cotizaciondetespecif
(
  id integer,
  idcotizaciondetalle integer NOT NULL,
  detalle character varying (200) NOT NULL,
  estado boolean,
  usuario character varying(50),
  pc character varying(50),
  ip character varying(50),
  fecha timestamp without time zone NOT NULL DEFAULT now(),
  usuariomod character varying(50),
  pcmod character varying(50),
  ipmod character varying(50),
  observacionmod character varying(100),
  fechamod timestamp without time zone NOT NULL,
  CONSTRAINT cotizaciondetespecif_pkey PRIMARY KEY (id),
  CONSTRAINT cotizaciondetespecif_cotizaciondetalle_fkey FOREIGN KEY (idcotizaciondetalle)
      REFERENCES public.cotizaciondetalle (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
DROP TABLE IF EXISTS cotizacionproveedorcab CASCADE;
create table cotizacionproveedorcab(
	id integer ,
	idcotizacion integer not null,
	idproveedor integer not null ,
    formapago character varying(100), -- Nombre de la PC donde se hizo el registro
    tiempoentrega character varying(100), -- Nombre de la PC donde se hizo el registro
	observacion text,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT cotizacionproveedorcab_pkey PRIMARY KEY (id),
	CONSTRAINT cotizacion_cotizacionproveedorcab_fkey FOREIGN KEY (idcotizacion)
      REFERENCES public.cotizacion (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT proveedor_cotizacionproveedorcab_fkey FOREIGN KEY (idproveedor)
      REFERENCES public.proveedor (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
DROP TABLE IF EXISTS cotizacionproveedordet CASCADE;
create table cotizacionproveedordet(
	id serial ,
	idcotizacionproveedorcab integer not null,
	idproducto integer not null,
    idunidad integer not null,
    aniofab integer,
    idmarca integer,
    cantidad numeric(9,2) not null,
    preciounitario numeric(9,2) not null,
    observacion text,
    estado boolean, -- Estado del registro
    usuario character varying(50), -- Usuario que hizo el registo
    pc character varying(50), -- Nombre de la PC donde se hizo el registro
    ip character varying(50), -- IP desde donde se hizo el registro
    fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
    usuariomod character varying(50), -- Usuario que modifica el registro
    pcmod character varying(50), -- PC desde donde se hace la modificación
    ipmod character varying(50), -- IP desde donde se hace la modificacion
    observacionmod character varying(100), -- Observacion de la modificacion
    fechamod timestamp without time zone NOT NULL,
	CONSTRAINT cotizacionproveedordet_pkey PRIMARY KEY (id),
	CONSTRAINT cotizacionproveedordet_cotizacionproveedor_fkey FOREIGN KEY (idcotizacionproveedorcab)
      REFERENCES public.cotizacionproveedorcab (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  cotizacionproveedorcab_producto_fkey FOREIGN KEY (idproducto)
      REFERENCES public.producto (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  cotizacionproveedorcab_unidad_fkey FOREIGN KEY (idunidad)
      REFERENCES public.unidad (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  cotizacionproveedorcab_marca_fkey FOREIGN KEY (idmarca)
      REFERENCES public.marca (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
DROP TABLE IF EXISTS cotizacionproveedordetesp CASCADE;
CREATE TABLE public.cotizacionproveedordetesp
(
  id serial,
  idcotizacionproveedordet integer NOT NULL,
  detalle character varying (200) NOT NULL,
  estado boolean,
  usuario character varying(50),
  pc character varying(50),
  ip character varying(50),
  fecha timestamp without time zone NOT NULL DEFAULT now(),
  usuariomod character varying(50),
  pcmod character varying(50),
  ipmod character varying(50),
  observacionmod character varying(100),
  fechamod timestamp without time zone NOT NULL,
  CONSTRAINT cotizacionproveedordetesp_pkey PRIMARY KEY (id),
  CONSTRAINT cotizacionproveedordetesp_cotizacionproveedordet_fkey FOREIGN KEY (idcotizacionproveedordet)
      REFERENCES public.cotizacionproveedordet (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE public.parametro
(
  id serial, -- Identificador
  nombre character varying(30), -- Nombre (Ejm: Monto de cortesia)
  descripcion character varying(100), -- Descripcion detallada del parametro
  valor character(100), -- Valor
  estado boolean, -- Estado del registro
  usuario character varying(50), -- Usuario que hizo el registo
  pc character varying(50), -- Nombre de la PC donde se hizo el registro
  ip character varying(50), -- IP desde donde se hizo el registro
  fecha timestamp without time zone NOT NULL DEFAULT now(), -- Fecha del registro
  usuariomod character varying(50), -- Usuario que modifica el registro
  pcmod character varying(50), -- PC desde donde se hace la modificación
  ipmod character varying(50), -- IP desde donde se hace la modificacion
  observacionmod character varying(100), -- Observacion de la modificacion
  fechamod timestamp without time zone NOT NULL,
  CONSTRAINT parametro_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE public.parametro
  IS 'Tabla de parametros';
COMMENT ON COLUMN public.parametro.id IS 'Identificador';
COMMENT ON COLUMN public.parametro.nombre IS 'Nombre (Ejm: Monto de cortesia)';
COMMENT ON COLUMN public.parametro.descripcion IS 'Descripcion detallada del parametro';
COMMENT ON COLUMN public.parametro.valor IS 'Valor';
COMMENT ON COLUMN public.parametro.estado IS 'Estado del registro';
COMMENT ON COLUMN public.parametro.usuario IS 'Usuario que hizo el registo';
COMMENT ON COLUMN public.parametro.pc IS 'Nombre de la PC donde se hizo el registro';
COMMENT ON COLUMN public.parametro.ip IS 'IP desde donde se hizo el registro';
COMMENT ON COLUMN public.parametro.fecha IS 'Fecha del registro';
COMMENT ON COLUMN public.parametro.usuariomod IS 'Usuario que modifica el registro';
COMMENT ON COLUMN public.parametro.pcmod IS 'PC desde donde se hace la modificación';
COMMENT ON COLUMN public.parametro.ipmod IS 'IP desde donde se hace la modificacion';
COMMENT ON COLUMN public.parametro.observacionmod IS 'Observacion de la modificacion';
