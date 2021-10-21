
var moment = require('moment-timezone');
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
		var aux = sucursales.split(",");
		let cont =	aux.length;
		var out = "";
			 for (let i = 0; i < id_suc.length; i++) {
				 
				 if (id_suc[i].id ==  aux[i]) {
					out	+=`<option value="${id_suc[i].id}" class="sucursal_check${id_suc[i].id}" > ${id_suc[i].nombre}</option>` 
				 }
			
			}
			out +=`</select>`
			for (let i = 0; i < id_suc.length; i++) {
				 
				if (id_suc[i].id ==  aux[i]) {
						out +=`<span style="display:none" ><span id="horaD${id_suc[i].id}">${id_suc[i].desde}</span> <span id="horaH${id_suc[i].id}">${id_suc[i].hasta}</span></span>`
						out +=`<span style="display:none" ><span id="horabreakD${id_suc[i].id}">${id_suc[i].hora_break_desde}</span> <span id="horabreakH${id_suc[i].id}">${id_suc[i].hora_break_hasta}</span></span>`
				}
		   }
		 return out;
	},
	distritos_habilitados: (sucursales, id_suc) => {

		var aux = id_suc.split(",");
		let cont =	aux.length;
		var out = "";
		if (aux.length == 1) {
			let array2 = sucursales
			let filtrar_id = array2.filter(id => id.id == aux)
			out	+=`<optgroup label="${filtrar_id[0].nombre}"></optgroup>` 
			let distritos = sucursales[0].distritos
			
			var aux2 = "-"
			if (distritos != null) {
				aux2 = distritos.split(",");
			}
			for (let j = 0; j < aux2.length; j++) {
				
				out	+=`<option value="${aux2[j]}" data-id="${sucursales[i].id}" class="distrito${sucursales.id}" >${aux2[j]}</option>`
			}
			out	+=`</optgroup>`
			out +=`</select>`
		
		 }else{
			 for (let i = 0; i < sucursales.length; i++) {
				 			 
 				if (sucursales[i].id == aux[i]) {				

					out	+=`<optgroup label="${sucursales[i].nombre}"></optgroup>` 
					let distritos = sucursales[i].distritos
					
					var aux2 = distritos.split(",");
					for (let j = 0; j < aux2.length; j++) {
						
						out	+=`<option value="${aux2[j]}" data-id="${sucursales[i].id}" class="distrito${sucursales[i].id}" >${aux2[j]}</option>`
					}
					out	+=`</optgroup>` 
				 }

				 }
				 out +=`</select>`
				
			
			}
		 return out;
	},
	empleados_disponibles: (sucursales, id_empleado) => {
	
		var aux = sucursales.split(",");
		let cont =	aux.length;
		var out = "";
			 for (let i = 0; i < id_empleado.length; i++) {
				 
				 if (id_empleado[i].id ==  aux[i]) {
					out	+=`<option value="${id_empleado[i].id}" class="empleado_check${id_empleado[i].id}" > ${id_empleado[i].nombre}</option>` 
				 }
			
			}
		 return out;
	},
	empleados_agenda: (sucursales, id_empleado) => {
	
		var out = "";
			 for (let i = 0; i < sucursales.length; i++) {				 
				 for (let j = 0; j < sucursales[i].encargados.length; j++) {					 
					if (sucursales[i].encargados[j].id ==  id_empleado) {
						
						out	+=`${sucursales[i].encargados[j].nombre} ${sucursales[i].encargados[j].apellido}` 
					 }					 
				 }			
			
			}
		 return out;
	},
	direccion_agenda: (sucursales, id_sucursal) => {
			var out = "";
			if (isNaN(id_sucursal)) {
				return out = id_sucursal
			}
			 for (let i = 0; i < sucursales.length; i++) {				 					 
					if (sucursales[i].id ==  id_sucursal) {
						
						out	+=`Sucursal: ${sucursales[i].nombre}` 					 
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
	fotoPublicacion1Pri: (fotos,posit) => {
		var aux = fotos.split(",");
		 var out = "";
			 if (aux[posit]=="") {
				out+=	 `foto_camara.png`
			 }else{
				out+=	`${aux[posit]}`
			 }
		// console.log(aux[0])
		 return out;
		},
	fotoPublicacion1: (fotos, posit) => {
		var aux = fotos.split(",");
		 var out = "";
			 if (aux[posit]=="") {
				out+=	 `foto_camara.png`
			 }else{
				formato= (aux[posit]).split('.')
				console.log(formato)
				if (formato[1] == "mp4" || formato[1] == "ogg" || formato[1] == "webm") {
					out+=	`<video class="thumbnail" src="../assets/uploads/${aux[posit]}" controls width="320" height="240">
					Tu navegador no admite el elemento <code>video</code>.
				  </video> `
				}else{
				   out+=	`<img class="thumbnail"
			   src="../assets/img_up/${aux[posit]}">` 
				}
			 }
		// console.log(aux[0])
		 return out;
		},
		fotoVPublicacionCreat: (fotos, posit,img) => {
			var aux = fotos.split(",");
			 var out = "";
				 if (aux[posit]=="") {
					out+=	 `<img id="imageSelected1" class="img-fluid"
					src="../assets/img_up/foto_camara.png"
					onclick="document.getElementById('profile-img${img}').click();" width="50px" title="Imagen"/>`
				 }else{
					formato= (aux[posit]).split('.')
					console.log(formato)
					if (formato[1] == "mp4" || formato[1] == "ogg" || formato[1] == "webm") {
						out+=	`<video title="Video" class="img-fluid" src="../assets/uploads/${aux[posit]}" width="50" onclick="document.getElementById('profile-img${img}').click();">
					  </video> `
					}else{
					   out+=	`<img id="imageSelected1" class="img-fluid"
					   src="../assets/img_up/${aux[posit]}"
					   onclick="document.getElementById('profile-img${img}').click();" width="50px" title="Imagen"/>` 
					}
				 }
			// console.log(aux[0])
			 return out;
			},

		empleados_publicacion: (sucursal, id_suc) => {
			let cont =	sucursal.length;
			var out = "";
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
					 for (let i = 0; i < cont; i++) {
						 if (id_empleado ==  aux[i]) {
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
						var f = new Date(fecha);
							var fecha_ = moment.tz(fecha, 'America/Lima').format('YYYY/MM/DD')
							
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
			Titulo:(titulo) => {
				const desc = titulo.length;
				const MaxDesc = 17;
				var out = "";
				if (desc > MaxDesc) {
					out += `${titulo.substring(0,17)}...`
				}else{
					out += `${titulo}`
				}
				return out;
			},

			ColorSucursal: (sucursal) => {
				var color = "";
				
				if (sucursal == "Principal" || sucursal == "Activa") {
					color = "green"
				}if(sucursal == "Inactiva" ){
					color = "orange"
				}
				if(sucursal == "Cancelada" ){
					color = "red"
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