// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const BD_conect = require("../models/modulos_");
var request = require("request");
var CLIENT_ID =
  "AQEp93PNKe5pQUGK4bMiah30CZzi_9YYP5pw1LqnWELnymhFyIvEQgjYT782ChQrqmSy8tUb81WNMcBF";
var SECRET =
  "EB5Wbz_NTICPraelJFn-5rK1T0tbp87DTmF8TvaQRjL3xckJyYIU4aC_Xbj41KqosgbKk5M4YIjuk__W";
var PAYPAL_API = "https://api-m.sandbox.paypal.com";

exports.pasarela = async (req, res, next) => {
 let id_publicacion = req.body.id_publicacion;

  BD_conect.publicacionesbyId(id_publicacion).then((resultado) => {
    let publicacion = JSON.parse(resultado)[0];
    console.log(publicacion)

    let monto_soles = parseFloat(publicacion.precio);
    console.log(monto_soles);
    let product = publicacion.titulo
    // Agrega credenciales
    mercadopago.configure({
      access_token:
        "TEST-7704156678097466-010904-a33b280de26eb4d1e747cf84848e3706-696588363",
    });
    // Crea un objeto de preferencia
    let preference = {
      items: [
        {
          id: '1',
          title: product,
          unit_price: parseFloat(monto_soles),
          quantity: 1,
          //currency_id: 'USD',
        },
      ],
       payment_methods: {
        excluded_payment_methods: [
            {
                id: 'account_money'
            }
        ],
        excluded_payment_types: [
            {
                id: 'ticket'
            }
        ],
        installments: 12
    },
      // ...
      back_urls: {
        success: `${req.headers.host}/visa/respuesta/success`,
        failure: `${req.headers.host}/visa/respuesta/failure`,
        pending: `${req.headers.host}/visa/respuesta/pending`,
        //auto_return: "approved",
      },
      external_reference: id_publicacion + "/" + product + "/" + monto_soles ,
      // ...
    };

    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        //global.id = response.body.id;
        console.log(response.body)
        request.post(
          PAYPAL_API + "/v1/oauth2/token",
          {
            headers: {
              Accept: "application/json",
              "Accept-Language": "en_US",
              "content-type": "application/x-www-form-urlencoded",
            },
            auth: {
              user: CLIENT_ID,
              pass: SECRET,
              // 'sendImmediately': false
            },
            form: {
              grant_type: "client_credentials",
            },
          },
          function (err, response) {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }
            let parsed1 = JSON.parse(response.body);
            //console.log(parsed1.access_token)
            const access_token = parsed1.access_token;
            request.post(
              PAYPAL_API + "/v1/identity/generate-token",
              {
                headers: {
                  Accept: "application/json",
                  "Accept-Language": "en_US",
                  Authorization: "Bearer " + access_token,
                },
              },
              function (err, response2) {
                if (err) {
                  console.error(err);
                  return res.sendStatus(500);
                }
                let parsed2 = JSON.parse(response2.body);
                console.log(id_publicacion);
                const clien_token = parsed2.client_token;
             
                      res.render("pasarela_de_pago", {
                        pageName: "Pasarela",
                        dashboardPage: true,
                        dash_cliente: true,
                        
                        clien_token,
                        access_token,
                        CLIENT_ID,
                        global,
                        monto_soles,
                        product,
                        //user
                      });
              }
            );
          }
        );
        var global = response.body.id;
        //console.log(response)
        /*res.render('pasarela_de_pago', {
  pageName: "Pasarela",
  global,
  amount,
  product,
  dashboardPage: true,
});*/
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

exports.pagar = async (req, res, next) => {
  var aux = req.query.external_reference.split("/");
  let userid = aux[0];
  let producto = aux[1];
  let monto = aux[2];
  let modo = aux[3];
  let status = req.query.status;
  console.log(req.query);
  console.log('Aqui');
  let product = false;
  let errores = false;
  if (status === "approved") {
    product = true;
    var numero_referencia = req.query.payment_id;

    if (producto == "Backcoin" || product == "backstore") {
      BD_conect.recargaBackcoin(userid, monto).then((res) => {
        console.log(res);
        //req.user.backcoins=res;
        if (product == "backstore") {
        } else {
          req.user.backcoins = res;
          console.log(req.user.backcoins);
        }
      });
      BD_conect.guardarPago(
        userid,
        status,
        numero_referencia,
        monto,
        producto,
        "MercadoPago"
      ).then(() => {
        res.render("complete_pay", { errores, product, dashboardPage: true });
      });
    } else {
      BD_conect.actualizarUserMembership(userid, producto).then(() => {
        req.user.membership = producto;
        BD_conect.guardarPago(
          userid,
          status,
          numero_referencia,
          monto,
          producto,
          "MercadoPago"
        ).then(() => {
          BD_conect.guardarPlan_user(
            userid,
            producto,
            modo,
            "MercadoPago"
          ).then((respg) => {
            console.log(respg);
            res.render("complete_pay", {
              errores,
              product,
              dashboardPage: true,
            });
          });
        });
        //      res.render('complete_pay', {errores,product,dashboardPage:true});
      });
    }
  } else {
    errores = true;
    res.render("complete_pay", { errores, product, dashboardPage: true });
  }
};


exports.pasarela2 = async (req, res, next) => {
  //let id_publicacion = req.body.id_publicacion;
  let id_publicacion = req.params.id;
  let id_agenda = req.params.id_agenda;
  let costo_domicilio = req.params.costo_domicilio;
   BD_conect.publicacionesbyId(id_publicacion).then((resultado) => {
     let publicacion = JSON.parse(resultado)[0];
     console.log(publicacion)
 
     let monto_soles = parseFloat(publicacion.precio);
     console.log(monto_soles);
     let product = publicacion.titulo
res.render("pasarela_de_pago", {
                         pageName: "Pasarela",
                         dashboardPage: true,
                         dash_cliente: true,
                         monto_soles,
                         product,
                         publicacion,
                         id_agenda,
                         costo_domicilio
                         //user
                       });
   });
 };
 exports.procesar = async (req, res, next) => {
   const user = res.locals.user
     mercadopago.configurations.setAccessToken("TEST-7704156678097466-010904-a33b280de26eb4d1e747cf84848e3706-696588363");
     console.log(user)
     var payment_data = {
      transaction_amount: Number(req.body.MPHiddenInputAmount),
      token: req.body.MPHiddenInputToken,
      description: req.body.descripcion,
      installments: Number(req.body.installments),
      payment_method_id: req.body.MPHiddenInputPaymentMethod,
      //issuer_id: req.body.issuer,
      additional_info: {
      items: [
        {
          id: req.body.id_publicacion,
          title: req.body.id_usuario,
          quantity: Number(req.body.id_agenda),
          unit_price: Number(req.body.monto_billetera),
          description: req.body.costo_domicilio,
        }
      ]
    },
      payer: {
        email: req.body.cardholderEmail,
        identification: {
          type: req.body.identificationType,
          number: req.body.identificationNumber
        }
      }, 
      
    };
//console.log(payment_data)
mercadopago.payment.save(payment_data)
  .then(function(response) {
    let aprobado ={
      status: response.body.status,
      status_detail: response.body.status_detail,
      id: response.body.id
    }
    let monto = payment_data.transaction_amount;
    let monto_billetera = payment_data.additional_info.items[0].unit_price;
    let comprobante = aprobado.id;
    let estado = aprobado.status;
    let publicacionId = payment_data.additional_info.items[0].id;
    let usuarioId = payment_data.additional_info.items[0].title;
    let id_agenda = payment_data.additional_info.items[0].quantity;
    let msg =""
    let costo_domicilio = payment_data.additional_info.items[0].description;

    if (aprobado.status == "rejected") {
      msg = "Su tarjeta fue rechazada"
      res.redirect('/dash_cliente/'+msg)

    }else{
      console.log(monto+'/'+estado+'/'+comprobante+'/'+publicacionId+'/'+usuarioId+'/'+monto_billetera+'/'+user.id)
    BD_conect.guardar_wallet_ventas(monto,estado,comprobante,publicacionId,usuarioId,monto_billetera,user.id, id_agenda, costo_domicilio).then((resultado) => {
       console.log(resultado)
      msg = "Su pago se aprobó con éxito"
      res.redirect('/dash_cliente/'+msg)
     });
      
    }
  })
  .catch(function(error) {
    console.log(error)
    res.status(error.status).send(error);
    
  });
 };