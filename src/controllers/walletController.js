const Modulo_BD = require("../models/modulos_");
var request = require("request");


exports.walletDashboard = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  const tipo_user = user.tipo

  if (tipo_user == "Administrador") {
   
    Modulo_BD.Wallet().then((resultado) => {
          
      let parsed_wallet = JSON.parse(resultado);
      //console.log(parsed_wallet);
      var saldo_actual = 0;
      var para_retiro = 0;
      for (let i = 0; i < parsed_wallet.length; i++) {
        saldo_actual = parseFloat(parsed_wallet[i].saldo) + parseFloat(saldo_actual)
        para_retiro = parseFloat(parsed_wallet[i].disponible) + parseFloat(para_retiro)
        
      }
      Modulo_BD.VentasAll().then((resultado_ventas) => { 
        let parsed_ventas = JSON.parse(resultado_ventas);
        //console.log(parsed_ventas);
        res.render("pagos_admin", {
          pageName: "Pagos",
          movimientos: true,
          dashboardPage: true,            
          msg,
          saldo_actual,
          para_retiro,
          parsed_wallet,
          parsed_ventas,
          user,admin:true
      })
    });
  })
  }else{
        Modulo_BD.WalletbyIduser(user.id).then((resultado) => {
          
          let parsed_wallet = JSON.parse(resultado)[0];
          console.log(parsed_wallet);
          let cont = parsed_wallet.length;
          Modulo_BD.VentasbyIduser(user.id).then((resultado_ventas) => { 
          let parsed_ventas = JSON.parse(resultado_ventas);
         // console.log(parsed_ventas);
          res.render("wallet", {
            pageName: "Billetera",
            movimientos: true,
            dashboardPage: true,            
            msg,            
            parsed_wallet,
            parsed_ventas,
            user,
          });
        })
        
      
  });
}
};

exports.confirmar_venta = (req, res) => {
  const user = res.locals.user;
  var venta_id = req.params.id;
  var billetera = req.params.billetera;
  console.log(venta_id)
 
  Modulo_BD.VentabyId_confirmar(venta_id).then((data) => {
    
    let msg = "Se confirmó la venta con éxito"
    res.redirect('/wallet/'+msg)
  });
};

exports.pagar_admin = async(req, res) => {
  let conf = JSON.parse(await Modulo_BD.configuracionDev())
  let devolucion = conf.valor

  const user = res.locals.user;
  // console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  const {
    select_venta
  } = req.body;
  
  Modulo_BD.VentasAll().then(async (resultado_ventas) => { 
    let parsed_ventas = JSON.parse(resultado_ventas);
  console.log(parsed_ventas)
  let ventas =[]
  let tipo ="", C_por= ""
  for (let i = 0; i < parsed_ventas.length; i++) {
    for (let j = 0; j < select_venta.length; j++) {  
      let vent = select_venta[j].split(',')  
      console.log(vent)    
      if (vent[1] == "Cancelada") {
        tipo ="Cancelada"
        C_por= vent[2]
      }
     if (parsed_ventas[i].id == vent[0]) {
       ventas.push(parsed_ventas[i])
     }      
    }    
  }
  let monto_total = 0
  let publicacion_id =[]
  let userId ="";
  let usuario_ = []
  let cliente = ""
   for (let i = 0; i < ventas.length; i++) {
      if (tipo == 'Cancelada') {
        if (C_por="cliente") {
          monto_total = parseFloat(ventas[i].publicacione.precio)
          publicacion_id.push(ventas[i].publicacioneId)
          userId =ventas[i].id_comprador
         const  nombre_cliente = JSON.parse( await Modulo_BD.UsuariobyId(userId))
         cliente = nombre_cliente
        }else{
          monto_total = ((parseFloat(ventas[i].publicacione.precio) * devolucion)/100)-parseFloat(ventas[i].publicacione.precio)
        publicacion_id.push(ventas[i].publicacioneId)
        userId =ventas[i].usuarioId
        usuario_.push(ventas[i].id_comprador)
        }
        

      }else{
        monto_total = parseFloat(monto_total) + parseFloat(ventas[i].publicacione.billetera)
    publicacion_id.push(ventas[i].publicacioneId)
    userId =ventas[i].usuarioId
    usuario_.push(ventas[i].usuario)
      }
    

  }
  console.log(cliente)
  res.render("pagos_admin", {
    pageName: "Pagos",
    pagar_admin: true,
    dashboardPage: true,  
    select_venta,
    monto_total,  
    publicacion_id,        
    msg,
    userId,usuario_,
    user,admin:true, cliente
})
  })
};

exports.guardar_pago_admin = (req, res) => {
  const {userid, id_ventas, id_publicaciones,  monto, estado, observaciones,  fecha_pago,  photo } = req.body;

   Modulo_BD.guardar_pago_a(userid, id_ventas, id_publicaciones,  monto, estado, observaciones,  fecha_pago,  photo).then((respuesta) =>{
      let msg="Se guardo el pago correspondiente";
      res.redirect('/wallet/'+msg)

   })   
 };

 exports.pagos_admin = (req, res) => {
  const user = res.locals.user;
  // console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  
  Modulo_BD.PagosAll().then((resultado_) => { 
    let parsed_ = JSON.parse(resultado_);
  console.log(parsed_)
  
  res.render("pagos_admin", {
    pageName: "Pagos",
    movimientos_pagos: true,
    dashboardPage: true,  
    parsed_,msg,
    user,admin:true
})
  })
};
exports.editar_pago = (req, res) => {
  const user = res.locals.user;
  // console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let id_pago = req.params.id;
  Modulo_BD.PagosbyId(id_pago).then((resultado_) => { 
    let parsed_ = JSON.parse(resultado_)[0];
  console.log(parsed_)
  
  res.render("pagos_admin", {
    pageName: "Pagos",
    editar_pago: true,
    dashboardPage: true,  
    parsed_,msg,
    user,admin:true
})
  })
};
exports.editar_pago_save = (req, res) => {
  const {id_pago, id_ventas,userid, monto, estado, observaciones,  fecha_pago,  photo } = req.body;

   Modulo_BD.guardar_pago_e(id_pago, id_ventas,userid, monto, estado, observaciones,  fecha_pago,  photo).then((respuesta) =>{
      let msg="Se edito el pago correspondiente";
      res.redirect('/wallet/'+msg)

   })   
 };

 exports.pagos_negocio = (req, res) => {
  const user = res.locals.user;
  // console.log(req.body);
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  
  Modulo_BD.PagosbyIdUser(user.id).then((resultado_) => { 
    let parsed_ = JSON.parse(resultado_);
  console.log(parsed_)
  Modulo_BD.WalletbyIduser(user.id).then((resultado) => {
          
    let parsed_wallet = JSON.parse(resultado)[0];
    console.log(parsed_wallet);
  res.render("wallet", {
    pageName: "Pagos",
    movimientos_pagos: true,
    dashboardPage: true,  
    parsed_,msg,
    user,parsed_wallet
})
  })
  })
};







exports.datos_pagos = (req, res) => {
  const user = res.locals.user;
  var photo = user.photo;
  let notPhoto = true;
  console.log(photo)
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  
  Modulo_BD.obtenerBackcoinDataPay(user.id).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];
    //console.log(parsed);

    if (typeof parsed === "undefined") {
      Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //console.log(plan_basico_Mensual)
          //const element = array[index];
        }
        
        Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            total_gates,
            total_descargas,
            user,notPhoto,
            total_sus,
          });
        });
      });
    } else {
      if (parsed.pais === "Perú") {
        var pais_o = false;
      } else {
        pais_o = true;
      }
      Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //console.log(plan_basico_Mensual)
          //const element = array[index];
        }

        Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            parsed,notPhoto,
            pais_o,
            user,
            total_gates,
            total_descargas,
            total_sus,
          });
        });
      });
    }
  });
};

exports.saveDatos = (req, res) => {
  var id_user = req.user.id;
  const user = res.locals.user;
  // console.log(req.body);
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  const {
    nombre_apellido,
    tipo_documento,
    n_documento,
    correo,
    pais,
    otro_pais,
    banco_peru,
    otro_pais_banco,
    cuenta,
  } = req.body;

  if (typeof otro_pais === "undefined") {
    var save_pais = pais;
  } else {
    save_pais = otro_pais;
  }

  if (typeof otro_pais_banco === "undefined") {
    var save_banco = banco_peru;
  } else {
    save_banco = otro_pais_banco;
  }

  if (typeof cuenta === "undefined") {
    var cuenta_banco = "";
    console.log(save_pais);
  } else {
    cuenta_banco = cuenta;
  }

  Modulo_BD.saveDatosBackcoin(
    id_user,
    nombre_apellido,
    tipo_documento,
    n_documento,
    correo,
    save_pais,
    save_banco,
    cuenta_banco
  ).then((respuesta) => {
    console.log(respuesta);
    let msg = "Se ha actualizado correctamente tu información de pago";
    res.redirect("/wallet/" + msg);
  });
};

exports.recargar_backcoin = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }

  Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
    let parsed_g = JSON.parse(respuesta);
    total_gates = parsed_g.length;
    let total_descargas = 0;
    for (let i = 0; i < total_gates; i++) {
      total_descargas += parseInt(parsed_g[i].descargas);
      //console.log(plan_basico_Mensual)
      //const element = array[index];
    }

    Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
      let parsed_s = JSON.parse(data);
      total_sus = parsed_s.length;
      res.render("wallet", {
        pageName: "Billetera",
        dashboardPage: true,
        recargar_backcoin: true,
        total_gates,
        total_descargas,
        user,notPhoto,
        total_sus,
      });
    });
  });
};



exports.retirar_fondos_form = (req, res) => {
  const user = res.locals.user;
  var photo = user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  Modulo_BD.obtenerBackcoinDataPay(user.id).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];

    if (typeof parsed === "undefined") {
      Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
        }
        Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            datos_pagos: true,
            total_gates,
            total_descargas,
            user,notPhoto,
            total_sus,
          });
        });
      });
    } else {
      if (parsed.pais === "Perú") {
        var pais_o = false;
      } else {
        pais_o = true;
      }
      Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
        }

        Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            retirar_fondos: true,
            parsed,notPhoto,
            pais_o,
            user,
            total_gates,
            total_descargas,
            total_sus,
          });
        });
      });
    }
  });
};

exports.retirar_fondos_save = (req, res) => {
  const { id, monto_retiro } = req.body;
  const user = res.locals.user;
  
  if (user.basic) {
    return res.redirect("/dashboard");
  }
  let status = "En espera";
  let Hoy = new Date(); //Fecha actual del sistema
  let fecha_ = Hoy.toISOString();
  Modulo_BD.saveRetiro(id, user.id, status, monto_retiro, fecha_).then(
    (respuesta) => {
      let parsed_s = JSON.parse(respuesta);
      var numero_referencia = parsed_s.id;
      console.log(numero_referencia);

      Modulo_BD.descontarBackcoin(user.id, monto_retiro).then((resp) => {
        //console.log(resp);
        req.user.backcoins = resp;
        const generateRandomString = (num) => {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var result1 = Math.random().toString(36).substring(0, num);

          return result1;
        };
        Modulo_BD.guardarPago(
          user.id,
          status,
          numero_referencia,
          monto_retiro,
          "Retiro Backcoins",
          "Depósito / Transferencia"
        ).then(() => {
          let msg = "Se cre fino";
          res.redirect(
            "/send_retirar_fondos/" +
              numero_referencia +
              "/" +
              monto_retiro +
              "/" +
              status
          );
        });
      });
    }
  );
};

exports.retiros = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  if (user.basic) {
    return res.redirect("/dashboard");
  }

  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  Modulo_BD.obtenernotificacionesbyLimit3().then((resultado2) => {
    let parsed_lmit = JSON.parse(resultado2);
    let cont = parsed_lmit.length;

    Hoy = new Date(); //Fecha actual del sistema
    var AnyoHoy = Hoy.getFullYear();
    var MesHoy = Hoy.getMonth();
    var DiaHoy = Hoy.getDate();
    var hay_not = false;
    for (let i = 0; i < cont; i++) {
      var Fecha_aux = parsed_lmit[i].fecha_publicacion.split("-");
      var Fecha1 = new Date(
        parseInt(Fecha_aux[0]),
        parseInt(Fecha_aux[1] - 1),
        parseInt(Fecha_aux[2])
      );
      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          console.log("hay fecha");
          hay_not = true;
        }
      } else {
        console.log("hay activo");
        hay_not = true;
        break;
      }
    }
    Modulo_BD.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
       
      }
      Modulo_BD.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;

        Modulo_BD.obtenerRetirosbyUser(user.id).then((resultado) => {
          let parsed_retiros = JSON.parse(resultado);
          res.render("wallet", {
            pageName: "Billetera",
            dashboardPage: true,
            movimientos_retiros: true,
            msg,
            total_gates,
            total_descargas,
            total_sus,
            notPhoto,
            parsed_retiros,
            parsed_lmit,
            hay_not,
            user,
          });
        });
      });
    });
  });
};
