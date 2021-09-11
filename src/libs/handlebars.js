module.exports = {
	showAlerts: (message = {}, alerts) => {
		const categoria = Object.keys(message);

		let html = '';

		if(categoria.length) {
			html += '<div class="form-message-container">';
			message[categoria].forEach(error => {
				html += `<p class="form-message form-message-${categoria}">${error}</p>`;
			});
			html += '</div>';
		}

		return alerts.fn().html = html;
	},
	showCurrentMembership: (str1, str2) => {
		if(str1 === str2) {
			return '(actual)';
		}
	},
	showBtnMembership: (str1, str2, btnClass, url, monto, modo) => {
		if(str1 !== str2) {
			return `
			<form action="${url}" method="post">
			<input type="hidden"   name="amount" value="${monto}" id="monto_plan">
			<input type="hidden"   name="modo" value="${modo}" id="modo_plan">
			<input type="hidden"   name="product" value="${str2}" id="tipo_plan">
			<input type="submit"   class="btn btn-block btn-${btnClass}" value="Obtener Plan">
			</form>
			`;
		}
	},
	sucursalesdisponibles: (sucursales, id_suc) => {
		//console.log(sucursales)
		//console.log(id_suc)
		var aux = sucursales.split(",");
		let cont =	aux.length;
		var out = "";
			 for (let i = 0; i < id_suc.length; i++) {
				 
				 console.log(aux[i])
				 if (id_suc[i].id ==  aux[i]) {
					out	+=`<label><input type="radio" id="sucursal${id_suc[i].id}" value="${id_suc[i].id}" name="sucursal[]" class="sucursal_check${id_suc[i].id}" > ${id_suc[i].distrito}</label><br>` 
				 }
			
			}
		 return out;
	},
	empleados_disponibles: (sucursales, id_empleado) => {
		//console.log(sucursales)
		//console.log(id_suc)
		var aux = sucursales.split(",");
		let cont =	aux.length;
		var out = "";
		console.log(id_empleado)
			 for (let i = 0; i < id_empleado.length; i++) {
				 
				 console.log(id_empleado[i].sucursaleId)
				 if (id_empleado[i].id ==  aux[i]) {
					out	+=`<label><input type="radio" id="empleado${id_empleado[i].id}" value="${id_empleado[i].id}" name="empleado" class="empleado_check${id_empleado[i].id}" > ${id_empleado[i].nombre}</label><br>` 
				 }
			
			}
		 return out;
	},
	getMembershipDesc: (membership) => {
		switch(membership.toLowerCase()) {
			case 'gold':
				return '¡Eres todo un maestro!';
				break;
			case 'vip':
				return '¡Eres todo un experto!';
				break;
			default:
				return '¡Conviértete en experto!';
				break;
		}
	},
	acceptFiles(membership, accept) {
		if(accept) {
			return membership.toLowerCase() !== 'basic' ? 'audio/*, .zip' : '.zip';
		}
		return membership.toLowerCase() !== 'basic' ? '.mp3, .wav, .aiff, .zip' : '.zip';
	},
	fotoPrincipalPublicacion: (fotos) => {
	var aux = fotos.split(",");
	 let cont =	aux.length;
	 var out = aux[0];
	// console.log(aux[0])
	 return out;
	},
	fotoPublicacion1: (fotos) => {
		var aux = fotos.split(",");
		 var out = "";
			 if (aux[0]=="") {
				out+=	 `foto_camara.png`
			 }else{
				out+=	`${aux[0]}`
			 }
		// console.log(aux[0])
		 return out;
		},
		fotoPublicacion2: (fotos) => {
			var aux = fotos.split(",");
			 var out = "";
				 if (aux[1]=="") {
					out+=	 `foto_camara.png`
				 }else{
					out+=	`${aux[1]}`
				 }
			// console.log(aux[0])
			 return out;
			},
			fotoPublicacion3: (fotos) => {
				var aux = fotos.split(",");
				 var out = "";
					 if (aux[2]=="") {
						out+=	 `foto_camara.png`
					 }else{
						out+=	`${aux[2]}`
					 }
				// console.log(aux[0])
				 return out;
				},
				fotoPublicacion4: (fotos) => {
					var aux = fotos.split(",");
					 var out = "";
						 if (aux[3]=="") {
							out+=	 `foto_camara.png`
						 }else{
							out+=	`${aux[3]}`
						 }
					// console.log(aux[0])
					 return out;
					},
					fotoPublicacion5: (fotos) => {
						var aux = fotos.split(",");
						 var out = "";
							 if (aux[4]=="") {
								out+=	 `foto_camara.png`
							 }else{
								out+=	`${aux[4]}`
							 }
						// console.log(aux[0])
						 return out;
						},

		empleados_publicacion: (sucursal, id_suc) => {
			let cont =	sucursal.length;
			var out = "";
			console.log(cont)
			out	+=`<div class="sucur${id_suc}" style="display:none;"> `
				 for (let i = 0; i < cont; i++) {
				out	+=`	 
				<label><input type="checkbox" id="empleado${sucursal[i].id}" value="${sucursal[i].id}" name="empleados[]" class="empleados_check${sucursal[i].sucursaleId}" > ${sucursal[i].nombre}</label><br>
				`
				}
				out	+=`</div>`
			 return out;
			},
			chek_suc: (id_suc, sucursales) => {
			var aux = sucursales.split(",");
			let cont =	aux.length;
			var out = "";
			console.log(cont)
				 for (let i = 0; i < cont; i++) {
					 if (id_suc ==  aux[i]) {
						out	+=`checked` 
					 }
				
				}
			 return out;
			},
			empleados_publicacionchek: (id_empleado, empleados) => {
				var aux = empleados.split(",");
				let cont =	aux.length;
				var out = "";
				console.log(aux)
					 for (let i = 0; i < cont; i++) {
						 if (id_empleado ==  aux[i]) {
							console.log('cont'+ aux[i])
							out	+=`checked` 
						 }
					
					}
				 return out;
				},
			formatoFecha2: (fecha, user) => {
					const f = new Date(fecha);
					f.toLocaleString()
					 
					var Anyo = f.getFullYear();
					var Mes = f.getMonth();
					var Dia = f.getDate();
						var fecha_ = f.toLocaleString()

						//console.log(fecha_)
					 return fecha_;
					},
					formatoFecha: (fecha, user) => {
						const f = new Date(fecha);
						f.toLocaleString()
						 
						var Anyo = f.getFullYear();
						var Mes = ('0' + (f.getMonth()+1)).slice(-2)
						var Dia = f.getDate();
							var fecha_ = Anyo+ '-'+Mes+ '-'+Dia
							
							//console.log(fecha_)
						 return fecha_;
						},
			estadoCupon: (fecha, cantidad) => {
					const f = new Date(fecha);
						Hoy = new Date();

					var estado = "";
					if (Hoy > f) {
						estado = "Caducado"
					}else if (cantidad == 0){
						estado = "Agotado"
					}else{
						estado = "Activo"
					}
						

					 return estado;
			},

			ColorSucursal: (sucursal) => {
				var color = "";
				
				if (sucursal == "Principal" || sucursal == "Activa") {
					color = "green"
				}if(sucursal == "Inactiva" ){
					color = "orange"
				}
				else{
					color = "#06cc60"
				}
				return color;
		},
		mathposition: (posicion) => {
			
			return posicion+1;
	},	
	breaklines: (text) => {
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return text;
},
	
}