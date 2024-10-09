export class EnviosModel{
 
    id_envio?: number;
	id_empresa?: number;
	id_pais?: number;
	id_region?: number;
	id_provincia?: number;
	id_comuna?: number;
	direccion?: string;
	nombre?: string;
	email?: string;
	telefono?: string;
	rut?: number;
	dv?: string;
	frecuente?: number;
	fecha_creacion?: string;
	fecha_actualizacion?: string;
	fecha_entrega?: string;
	valor_envio?: number;
	id_usuario?: number;
	n_orden?: string;
	fecha_pago?: string;
	status_transbank?: string;
	pago_transbank?: number;
	nombre_empresa?: string;

	tbk_accounting_date?: string;
	tbk_authorization_code?: string;
	tbk_balance?: string;
	tbk_installments_amount?: string;
	tbk_installments_number?: string;
	tbk_payment_type_code?: string;
	tbk_response_code?: string;
	tbk_session_id?: string;
	tbk_transaction_date?: string;
	tbk_vci?: string;
	tbk_token_ws?: string;
	tbk_card_number?: string;
	estado_pagado?: number;

	estado_pago?: string;
	comuna_s?: string;

	// DATOS ORIGEN
	id_comuna_origen?: number;
	telefono_origen?: string;
	email_origen?: string;
	direccion_origen?: string;
	nombre_origen?: string;

    constructor(){
      
    }
   
}