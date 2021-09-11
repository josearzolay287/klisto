const Modulo_BD = require("../models/modulos_");
const nodemailer = require("nodemailer");

// email sender function
exports.sendEmail = function (req, res) {
  //const { email } = req.body;
  var email ="josearzolay287@gmail.com"
 
        // Definimos el transporter
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "josearzolay287@gmail.com",
            pass: "geekjjaa2012",
          },
        });
        // Definimos el email
        var mailOptions = {
          from: "Remitente",
          to: email,
          subject: "Suscribcion",
          text: "Correo de bienvenida de prueba",
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            let msg = "Error al enviar Mensaje";
            res.redirect("/?msg=" + msg);
            // res.send(500, err.message);
          } else {
            console.log("Email sent fine");
            let msg =
              "Gracias por suscribirte, pronto recibiras noticias nuestras en tu correo.";
            res.redirect("/?msg=" + msg);

            //  res.status(200).jsonp(req.body);
          }
        });
};

exports.sendEmailResetPass = function (req, res) {
  //const {email} = req.body;
  var token = req.params.mail;
  var mail = req.params.token;
  const resetUrl = `http://${req.headers.host}/search-account/${token}`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.miganancia.net",
    port: 465,
    secure: true,
    auth: {
      user: "test@backartist.com",
      pass: "0Jut6T1WwWnGAC7t8k",
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "test@backartist.com",
    to: mail,
    subject: "Reset Password",
    text: "Click al siguiente enlace para resetear tu contraseña " + resetUrl,
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      res.redirect("/?msg=" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "A su correo se ha enviado el link para resetear su contraseña. Recuerde revisar su correo no deseado";
      res.redirect("/?msg=" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmailFansPromotion = function (req, res) {
  const promocionar_musica = req.params.gate_link;
  const id_user = req.params.id_user;

  console.log(promocionar_musica);
  const tUrl = `http://${req.headers.host}/track/${promocionar_musica}`;

  Modulo_BD.obtenerSuscripbyUserG(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta);
    let array = [];
    for (let i = 0; i < parsed.length; i++) {
      const correo = parsed[i].correo;
      array.push(correo);
      //console.log(parsed)
    }
    console.log(array);
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.miganancia.net",
      port: 465,
      secure: true,
      auth: {
        user: "test@backartist.com",
        pass: "0Jut6T1WwWnGAC7t8k",
      },
    });
    // Definimos el email
    var mailOptions = {
      from: "Remitente",
      to: array,
      subject: "Música nueva en Backartis",
      text:
        "Tenemos una nueva musica para ti, encuentrala en el siguiente enlace " +
        tUrl,
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        let msg = "Error al enviar Mensaje";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg =
          "Se envio con exito la musica seleccionada a los correos suscritos";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  });
};

exports.sendEmailFans = function (req, res) {
  const { correo, promocionar_musica } = req.body;
  console.log(correo);
  console.log(promocionar_musica);
  const resetUrl = `http://${req.headers.host}/track/${promocionar_musica}`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.miganancia.net",
    port: 465,
    secure: true,
    auth: {
      user: "test@backartist.com",
      pass: "0Jut6T1WwWnGAC7t8k",
    },
  });
  // Definimos el email
  var mailOptions = {
    from: "Remitente",
    to: correo,
    subject: "Música nueva en Backartis",
    text:
      "Tenemos una nueva musica para ti, encuentrala en el siguiente enlace " +
      resetUrl,
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      res.redirect("/fans/" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine");
      let msg =
        "Se envio con exito la musica seleccionada a los correos indicados";
      res.redirect("/fans/" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmail_borra_cuenta = function (req, res) {
  const correo = req.user.email;
  const id_user = req.user.id;
  const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    host: "mail.miganancia.net",
          port: 465,
          secure: true,
          auth: {
            user: "test@backartist.com",
            pass: "0Jut6T1WwWnGAC7t8k",
          },
  });
  console.log(correo)
  // Definimos el email
  var mailOptions = {
    from: "test@backartist.com",
    to: correo,
    subject: "Borrar Cuenta",
    text:
      "Nos informaste que deseas borrar tu cuenta con nosotros, para confirmar haz click al siguiente enlace; recuerda que perderas TODA la informacion " +
      resetUrl,
    html: `<html>
    <head>	
    </head>
    <body style="font-family: 'Poppins', sans-serif;">
      <div style="width: 50%; margin-left: auto; margin-right: auto;">
        <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
          <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />BackArtist
        </div>
        <div style="text-align: center"> 
          <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Hola!!</label><br>
        </div>	
        <div style="text-align: left"> 
          <p style="line-height: 1.5;">Nos informaste que deseas borrar tu cuenta con nosotros, para confirmar haz click en <span>confirmar<span>; recuerda que perderas <strong>TODA</strong> la informacion !!</p>
        </div>	
        <div style="text-align: center"> 
          <a style="color: white;border: none; font-size: 1em; border-radius: 15px; padding: 0.5em 1.5em;text-decoration:none; background-color:#dc3545" href="${resetUrl}">Confirmar</a><br>
        </div>		
      </div>
    </body>
  
  </html>`
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      let msg = "Error al enviar Mensaje";
      res.redirect("/dashb/" + msg);
      // res.send(500, err.message);
    } else {
      console.log("Email sent fine borrar cuenta");
      let msg =
        "Se envio un correo con el enlace para confirmar la eliminacion de tu cuenta";
      res.redirect("/dashb/" + msg);

      //  res.status(200).jsonp(req.body);
    }
  });
};

exports.sendEmail_get_retiro = function (req, res) {
  const user_name = req.user.userName;
  const nombre = req.user.name + " " + req.user.lastName;
  const correo = req.user.email;
  const id_user = req.user.id;
  var ref_num = req.params.ref_num;
  var monto = req.params.monto;
  var status = req.params.status;
  //const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;
  let mails = [correo, "jkey_09@hotmail.com"];
  Modulo_BD.obtenerBackcoinDataPay(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];

    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.miganancia.net",
          port: 465,
          secure: true,
          auth: {
            user: "test@backartist.com",
            pass: "0Jut6T1WwWnGAC7t8k",
          },
    });
    // Definimos el email
    var mailOptions = {
      from: "Remitente",
      to: mails,
      subject: "Solicitud de retiro",
      text:
        nombre +
        " nos informó que desea retirar: $" +
        monto +
        " de su billetera Backcoin, quedando actualmente en estado: " +
        status +
        " y referendcia numero: " +
        ref_num +
        ". \n Dicho monto será acreditado a la cuenta: " +
        parsed.cuenta +
        " del banco: " +
        parsed.banco +
        " a nombre de: " +
        parsed.nombre_apellido +
        " documento de identidad: " +
        parsed.tipo_documento +
        " " +
        parsed.n_documento,
     html: "<p>HTML version of the message</p>"
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        let msg = "Error al enviar Mensaje";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg = "Se envio un correo con los detalles de su retiro";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  });
};

exports.actualizo_membresia = function (req, res) {
  const user_name = req.user.userName;
  const nombre = req.user.name + " " + req.user.lastName;
  const correo = req.user.email;
  const id_user = req.user.id;
  var producto = req.params.producto;
  var monto = req.params.monto;
  var modo = req.params.modo;
console.log(correo)
  //const resetUrl = `http://${req.headers.host}/borrar_user/${id_user}/ext`;
  Modulo_BD.obtenerGatesbyUser(id_user).then((respuesta) => {
    let parsed = JSON.parse(respuesta)[0];
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
      host: "mail.miganancia.net",
          port: 465,
          secure: true,
          auth: {
            user: "test@backartist.com",
            pass: "0Jut6T1WwWnGAC7t8k",
          },
    });
    // Definimos el email
    var mailOptions = {
      from: "test@backartist.com",
      to: correo,
      subject: "Solicitud de retiro",
      text:"Solicitud de retiro",
     html: `<html>
     <head>
     
     </head>
     <body style="font-family: 'Poppins', sans-serif;">
     <div style="width: 50%; margin-left: auto; margin-right: auto;">
       <div  style="font-weight: bold;display: inline-block; padding-top: .3125rem;padding-bottom: .3125rem; margin-right: 1rem;font-size: 1.25rem;   line-height: inherit;white-space: nowrap; "> 
         <img src="https://josea.mosquedacordova.com/assets/img/logo-ba.png" style="vertical-align: middle; border-style: none;" alt="..." width="70px" />BackArtist
       </div>
       <div style="text-align: center"> 
         <label style="font-size: 1.8rem;font-weight: bold;color: darkgoldenrod;"><i class="fas fa-exclamation-circle"></i> Gracias!!</label><br>
         <h1>Su membresia a sido renovada!!</h1>
       </div>			
   <table style="border-collapse: collapse;width: 100%;max-width: 100%;margin-bottom: 1rem; background-color: transparent;">
   <thead >
     <tr>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Producto</th>
       <th scope="col"  style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Cantidad</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom;border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Duracion</th>
       <th scope="col" style="color: #fff; background-color: #212529; border-color: #32383e; vertical-align: bottom; border-bottom: 2px solid #dee2e6;padding: .75rem;
     vertical-align: top; border-top: 1px solid #dee2e6;">Costo</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row" style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;">${producto}</th>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">1</td>
       <td style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">${modo}</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;">$ ${monto}</td>
     </tr>
     <tr class="subtotal">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" colspan="2"  style="text-align: right;">Subtotal:</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6; text-align: center;" class="cell_center">$ ${monto}</td>
     </tr>
     <tr class="total">
       <th  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" scope="row"></th>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;" colspan="2"  style="text-align: right;">Total</td>
       <td  style="padding: .75rem; vertical-align: top; border-top: 1px solid #dee2e6;color: darkgoldenrod; font-weight: bold;font-size: 1.2em;text-align: center;">$ ${monto}</td>
     </tr>
   </tbody>
 </table>
 </div>
   </body>
   
   </html>`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        let msg = "Error al enviar Mensaje";
        res.redirect("/dashb/" + msg);
        // res.send(500, err.message);
      } else {
        console.log("Email sent fine");
        let msg = "Se envio un correo con los detalles de su retiro";
        res.redirect("/dashb/" + msg);

        //  res.status(200).jsonp(req.body);
      }
    });
  });
};