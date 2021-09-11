$(function() {
if ( $("#msgs").length ) {
    let mensaje = $('#msgs').text();
  Swal.fire(mensaje)
 }

  // form registro empresa
  const formRegistrarEmpresa= document.getElementById("registrar_empresa")
  
  if (formRegistrarEmpresa) {
   $('#logo_next').on('click', () =>{
     $('#logo-tab').click()
   })
   $('#basic_next').on('click', () =>{
     $('#basic-tab').click()
   })
   $('#banks_next').on('click', () =>{
     $('#banks-tab').click()
   })
   $('#empleados_next').on('click', () =>{
     $('#employed-tab').click()
   })
    
  $('#login_prev').on('click', () =>{
     $('#login-tab').click()
   })
 
   $('#logo_prev').on('click', () =>{
     $('#logo-tab').click()
   })
   $('#basic_prev').on('click', () =>{
     $('#basic-tab').click()
   })
   $('#banks_prev').on('click', () =>{
     $('#banks-tab').click()
   })
   $('#empleados_prev').on('click', () =>{
     $('#employed-tab').click()
   })
  }  

  ///----tabla empleados
  const tabla_empleados = document.getElementById('tabla_empleados')
  const add_empleados = document.getElementById('add_empleados')

  if(tabla_empleados){
    $('#agregar_empleados').on('click', () =>{
      tabla_empleados.setAttribute('hidden', true)
      add_empleados.removeAttribute('hidden')
    })
    $('#volver_empleados').on('click', () =>{
      add_empleados.setAttribute('hidden', true)
      tabla_empleados.removeAttribute('hidden')
    })
  }

  ///----mi negocio
  const tabla_sucursales_minegocio = document.getElementById('tabla_sucursales_minegocio')

  if(tabla_sucursales_minegocio){
    $('.delete').on('click', (e)=>{
      let id = e.target.classList.item(2)
      let tipo = e.target.classList.item(3)
      Swal.fire({
    title: 'Eliminar',
    text: "Seguro desea eliminar el negocio indicado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/delete_sucursal/${id}/${tipo}`;
    }
  })
    })
  }


  //PUBLICACIONES
  $('.btn_submit').on('click', () => {
    if ($('#imagen1').val() == "") {
      Swal.fire('Debe colocar al menos una imagen')
    }

  })
  $('#precio').on('keyup', () => {
    let comision = (parseFloat($('#precio').val()) * parseFloat($('#comision').val())) / 100
    let billetera = parseFloat($('#precio').val()) - parseFloat(comision)
    $('#billetera').val(billetera)
  })
  const tabla_mispublicaciones = document.getElementById('tabla_mis_publicaciones')

  if (tabla_mispublicaciones) {
    $('.delete').on('click', (e) => {
      let id = e.target.classList.item(2)
      let tipo = e.target.classList.item(3)
      Swal.fire({
        title: 'Eliminar',
        text: "Seguro desea eliminar la publicacion indicada!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/delete_publicacion/${id}/${tipo}`;
        }
      })
    })
  }





  const subirImagen = (event) => {
    const archivos = event.target.files;
    const data = new FormData();
    let imagenX = event.target.id;
    data.append("archivo", archivos[0]);

    fetch("/update-profile/archivo", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("El archivo " + archivos[0].name + " se ha subido correctamente.")


        switch (imagenX) {
          case 'profile-img1':
            document.getElementById("imagen1").value = archivos[0].name;
            const outputImg1 = document.getElementById("imageSelected1");
            outputImg1.setAttribute("src", "assets/img_up/" + archivos[0].name);
            break;
          case 'profile-img2':
            document.getElementById("imagen2").value = archivos[0].name;
            const outputImg2 = document.getElementById("imageSelected2");
            outputImg2.setAttribute("src", "assets/img_up/" + archivos[0].name);
            break;
          case 'profile-img3':
            document.getElementById("imagen3").value = archivos[0].name;
            const outputImg3 = document.getElementById("imageSelected3");
            outputImg3.setAttribute("src", "assets/img_up/" + archivos[0].name);
            break;
          case 'profile-img4':
            document.getElementById("imagen4").value = archivos[0].name;
            const outputImg4 = document.getElementById("imageSelected4");
            outputImg4.setAttribute("src", "assets/img_up/" + archivos[0].name);
            break;
          case 'profile-img5':
            document.getElementById("imagen5").value = archivos[0].name;
            const outputImg5 = document.getElementById("imageSelected5");
            outputImg5.setAttribute("src", "assets/img_up/" + archivos[0].name);
            break;
          default:
            console.log('Lo lamentamos, por el momento no disponemos de ' + expr + '.');
        }


      })
      .catch((error) => {
        console.error(error);
      });
  };
  const formUpdateProfile = document.getElementById('form_mis_publicaciones')
  const profileImg1 = $('.img_publicacion')//document.getElementById("profile-img1");
  const dropUploadProfileImg = document.getElementById("upload-user-img");

  if (profileImg1) {
    profileImg1.on("change", (event) => {
      console.log(event.target.files[0]);
      let imagenX = event.target.id;
      const file = event.target.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Elige un archivo válido (.png, .jpg, .jpeg)");
        return;
      }


      // reader.addEventListener("load", displayFileInfo);
      //reader.readAsDataURL(file);
      console.log(event.target.id);
      subirImagen(event);
    });

  }


//BUSCADOR

jQuery("#buscador").keyup(function(){
	
  var nombres = $('.nombres');
   var buscando =  ($(this).val()).toLowerCase();
   var item='';
   for( var i = 0; i < nombres.length; i++ ){
       item = $(nombres[i]).html().toLowerCase();
        for(var x = 0; x < item.length; x++ ){
            if( buscando.length == 0 || item.indexOf( buscando ) > -1 ){
                $(nombres[i]).parents('.item').show(); 
            }else{
                 $(nombres[i]).parents('.item').hide();
            }
        }
   }
});

//CATEGORIAS SEARCH
jQuery("#categorias").change(function(){
	
  var categoria = $('.categoria');
   var buscando =  ($(this).val()).toLowerCase();
   var item='';
   for( var i = 0; i < categoria.length; i++ ){
       item = $(categoria[i]).html().toLowerCase();
        for(var x = 0; x < item.length; x++ ){
            if(buscando == 'todas'){
                $(categoria[i]).parents('.item').show(); 
            }else if( buscando.length == 0 || item.indexOf( buscando ) > -1 ){
                $(categoria[i]).parents('.item').show(); 
            }else{
                 $(categoria[i]).parents('.item').hide();
            }
        }
   }
});

///----USUARIOS ADMIN
const tabla_usuarios_admin = document.getElementById('tabla_usuarios_admin')

if(tabla_usuarios_admin){
  $('.delete').on('click', (e)=>{
    let id = e.target.classList.item(2)
    let tipo = e.target.classList.item(3)
    Swal.fire({
  title: 'Eliminar',
  text: "Seguro desea eliminar el negocio indicado!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Eliminar'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.href = `/delete_usuarios_a/${id}/${tipo}`;
  }
})
  })
}


///----FILTROS DE TABLAS
    //POR STATUS
jQuery("#status_filter").change(function(){
  if( jQuery(this).val() != ""){
      jQuery("#tabla_ tbody>tr").hide();
      jQuery("#tabla_ td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'todas'){
jQuery("#tabla_ tbody>tr").show();
}  else{
      jQuery("#tabla_ tbody>tr").show();
  }
});
//POR FECHA NEGOCIO
jQuery("#meeting-time").change(function(){
  console.log(jQuery(this).val())
  if( jQuery(this).val() != ""){
      jQuery("#tabla_ tbody>tr").hide();
      jQuery("#tabla_ td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'yyyy-MM-dd'){
jQuery("#tabla_ tbody>tr").show();
}  else{
      jQuery("#tabla_ tbody>tr").show();
  }
});
jQuery("#reset_fecha").click(function(){
  console.log(jQuery(this).val())
  
      jQuery("#tabla_ tbody>tr").show();
});

//POR STATUS PAGO_ADMIN
jQuery("#status_filter_pago").change(function(){
  if( jQuery(this).val() != ""){
      jQuery("#tabla_pagos_admin tbody>tr").hide();
      jQuery("#tabla_pagos_admin td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'todas'){
jQuery("#tabla_pagos_admin tbody>tr").show();
}  else{
      jQuery("#tabla_pagos_admin tbody>tr").show();
  }
});

//POR STATUS PAGO_ADMIN2
jQuery("#status_filter_pago2").change(function(){
  if( jQuery(this).val() != ""){
      jQuery("#tabla_pagos_admin tbody>tr").hide();
      jQuery("#tabla_pagos_admin td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'todas'){
jQuery("#tabla_pagos_admin tbody>tr").show();
}  else{
      jQuery("#tabla_pagos_admin tbody>tr").show();
  }
});

//POR FECHA PAGO_ADMIN
jQuery("#meeting-time").change(function(){
  console.log(jQuery(this).val())
  if( jQuery(this).val() != ""){
      jQuery("#tabla_pagos_admin tbody>tr").hide();
      jQuery("#tabla_pagos_admin td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'yyyy-MM-dd'){
jQuery("#tabla_pagos_admin tbody>tr").show();
}  else{
      jQuery("#tabla_pagos_admin tbody>tr").show();
  }
});
jQuery("#reset_fecha").click(function(){
  console.log(jQuery(this).val())
  
      jQuery("#tabla_pagos_admin tbody>tr").show();
});

//BUSCADOR TABLA_INT
jQuery("#buscador_admin").keyup(function(){
  if( jQuery(this).val() != ""){
      jQuery("#tabla_ tbody>tr").hide();
      jQuery("#tabla_ td:contiene-palabra('" + jQuery(this).val() + "')").parent("tr").show();
  }else if(jQuery(this).val() == 'todas'){
jQuery("#tabla_ tbody>tr").show();
}  else{
      jQuery("#tabla_ tbody>tr").show();
  }
});


jQuery.extend(jQuery.expr[":"], 
{
  "contiene-palabra": function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || jQuery(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});



//PAGOS_ADMIN
    //SORT TABLA
$("#tabla_pagos_admin").tablesorter();
$("#tabla_").tablesorter();
if($('.Pagado')){
    $('.Pagado').attr('disabled', true)
}
    //RESET FECHA
$('#reset_fecha').on('click', ()=>{
$("#meeting-time").val("yyyy-MM-dd");

})


    //CHECKBOXES
    let checkboxes = Array.from(
      document.getElementsByClassName("form-check-input")
    );
    const selected = "";
  
      $('.btn_pay').on("click", () => {
        let suma = 0;
      let enviar = true;
      let duplicados = [];
     let numeros  = [];
        for (var i = 0; i < checkboxes.length; i++) {
         
    if (checkboxes[i].checked == true) {
        numeros.push(checkboxes[i].classList.item(3)) 
          }
  
    
          if (checkboxes[i].checked != true) {
            suma = suma + 1;
          }
        }
      const tempArray = [...numeros].sort();
   
  for (let i = 0; i < tempArray.length; i++) {
    if (tempArray[i + 1] === tempArray[i]) {
      duplicados.push(tempArray[i]);
    }
  }
  
        if (suma !== checkboxes.length) {		  
        console.log("enviar formulario"+enviar)
        $('#form_pay').submit();
  
          return;
        }
    Swal.fire({
    title: "Error",
    text: "Debe seleccionar al menos una venta para proceder a pagar",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: "Aceptar"
  })
      });

///----TABLA WALLET
const tabla_pagos_admin = document.getElementById('tabla_pagos_admin')

if(tabla_pagos_admin){
var estado = document.getElementById('estado').innerHTML
console.log(estado)
/*if (estado == "Realizada"){
	$('.Realizada').attr('style','pointer-events: none;')
	$('.fa-check-circle>Realizada').removeAttr('style')
	$('.fa-ban>Realizada').removeAttr('style')
}*/
  $('.select_venta').on('click', (e)=>{
    let estado2 = e.target.classList.item(2)
	//let estado = e.target.classList.item(3)
    //let billetera = e.target.classList.item(4)
	console.log(estado2)
	if (estado2 == "Realizada"){
		let valor = e.target.value
		var texto="Bien";
		console.log(valor)

	}else{

		var titulo="Error";
		var texto="No puede pagar una venta que no tenga estado Realizada";
	if($('input[type=checkbox]').is(':checked')) {
    $('.'+estado2).prop('checked',false).removeAttr('checked');
} 
	Swal.fire({
  title: titulo,
  text: texto,
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: "Aceptar"
})
	}
  
  })

  $('.cancelar').on('click', (e)=>{
    let id = e.target.classList.item(2)
    let tipo = e.target.classList.item(3)
    Swal.fire({
  title: 'Cancelar',
  text: "Seguro desea cancelar la venta indicada!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Eliminar'
}).then((result) => {
  if (result.isConfirmed) {
    window.location.href = `/cancelar_venta/${id}/${tipo}`;
  }
})
  })
}






});


