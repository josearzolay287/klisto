const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const Encargados = require("../models/Encargados");
const Sucursales = require("../models/Sucursales");
const UpdUser = require("../models/modulos_");
const router = require("express").Router();
const dashboardController = require("../controllers/dashboardController");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const Op = Sequelize.Op;
const crypto = require("crypto");

// Formulario de inicio de sesión
exports.formLogin = (req, res) => {
  const { error } = res.locals.messages;
  res.render("login", {
    pageName: "Login",
    layout: "page-form",
    error,
    reg_: true
  });
};

exports.formLoginBack = (req, res) => {
  const { error } = res.locals.messages;
  var product = req.params.product;
  var monto = req.params.monto;
  var modo = req.params.modo;
  console.log(modo);

  res.render("login_back", {
    pageName: "Login",
    layout: "page-form",
    modo,
    monto,
    product,
    error,
  });
};

// Iniciar sesión
exports.loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

exports.logintemp = (req, res) => {
  console.log(req.user.tipo);
  let tipo = req.user.tipo  
  if (tipo == 'Empresa') {
    res.redirect('/dashboard')
  }
  if (tipo == 'Cliente') {
    res.redirect('/dash_cliente')
  }
  if (tipo == 'Administrador') {
    res.redirect('/dashboard')
  }
       
};

exports.forgot_password = (req, res) => {
  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
  });
};

// Formulario de registro
exports.formCreateUser = (req, res) => {
  res.render("register", {
    pageName: "Registrate",
    layout: "page-form",
  });
};
exports.formCreateUser_client = (req, res) => {
  res.render("reg_cliente", {
    pageName: "Registrate",
    layout: "page-form",    
    reg_: true
  });
};
exports.formCreateUser_empres = (req, res) => {
  res.render("reg_empresa", {
    pageName: "Registrate",
    layout: "page-form",    
    reg_: true
  });
};

// Crear usuario en la base de datos
exports.createUser = async (req, res) => {
  const { name_, email_, password, confirmPassword } = req.body;
  
  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("reg_admin", {
      pageName: "Registrate",
      dashboardPage: true,
      logo:true, 
      crea_usuario:true,
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name: name_, email: email_, password: password, tipo: 'Administrador', pass_admin: '12345admin'
    });

    res.redirect("/usuarios_a");
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("register", {
      dashboardPage: true,
      logo:true, 
      crea_usuario:true,
      messages: req.flash(),
    });
  }
};

exports.createUser_client = async (req, res) => {
  const { name_client,  email_client, password, confirmPassword, } = req.body;

  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("reg_cliente", {
      pageName: "Registro Cliente",
      layout: "page-form",
      reg_:true,
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name: name_client, email: email_client, password: password, tipo: 'Cliente'
    });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("reg_cliente", {
      pageName: "Registrate",
      layout: "page-form",
      messages: req.flash(),
    });
  }
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log('info')
      console.log(err)
      return res.send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log('info2')
      return res.redirect('/dash_cliente');
    });
  })(req, res);
};
exports.createUser_empresa = async (req, res) => {
  const { email,name_empresa,
    password,
    confirmPassword,photo1,direccion,telefono,bank_id,cuenta,nombre_empleado,
    apellido_empleado,  correo_empleado, telefono_empleado, descripcion,departamento, distrito } = req.body;
  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("reg_empresa", {
      pageName: "Registro Empresa",
      layout: "page-form",
      reg_:true,
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name: name_empresa, email: email, password: password, banco: bank_id,cuenta: cuenta, tipo: 'Empresa', photo:photo1, direccion: direccion, descripcion: descripcion, telefono: telefono
    }).then((data) =>{
      let parsed = data.toJSON()
      console.log(parsed.id)
      let id_usuario = parsed.id
       Sucursales.create({
        tipo: 'Principal', direccion: direccion, descripcion: descripcion, telefono: telefono,departamento: departamento,
        distrito: distrito,nombre: name_empresa,usuarioId: id_usuario
      }).then((data_sucursal) =>{
        let parsed_sucursal = data_sucursal.toJSON()
        let sucursalId =parsed_sucursal.id
        Encargados.create({
          nombre: nombre_empleado,apellido: apellido_empleado, correo: correo_empleado,  telefono: telefono_empleado,tipo:'Encargado', sucursaleId: sucursalId
        }).then((data_encargado) =>{
          let parsed2 = data_encargado.toJSON()
          console.log(parsed2)
          
        });
      });
    });
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("reg_empresa", {
      pageName: "Registrate",
      layout: "page-form",
      messages: req.flash(),
    });
  }

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log('info')
      console.log(err)
      return res.send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log('info2')
      return res.redirect('/dashboard');
    });
  })(req, res);
};

// Actualizar usuario en la base de datos
exports.UpdateUser = async (req, res) => {
  let tipo = req.user.tipo;
  console.log(tipo)
  let dash_cliente = false
  if (tipo  == "Cliente") {
    dash_cliente = true
  }
  const {
    photo1,
userid,
name,
email,
new_password,
confirm_password,
  } = req.body;

  if (!new_password && !confirm_password) {
    UpdUser.actualizarUser(userid, name, email, photo1)
      .then(() => {
        //console.log(result);
      })
      .catch((err) => {
        return res.status(500).send("Error actualizando" + err);
      });
    //redirect('/dashboard');
    const usuario = await Usuarios.findOne({ where: { email } });
    // "user" is the user with newly updated info
    //const user = res.locals.user;
    console.log(req.user);
    req.user.name = name;
    req.user.email = email;
    req.user.photo = photo1;
    console.log(req.user.name);
    if (tipo == 'Empresa') {
      res.redirect('/dashboard')
    }
    if (tipo == 'Administrador') {
      res.redirect('/dashboard')
    }
    if (tipo == 'Cliente') {
      res.redirect('/dash_cliente')
    }
  } else {
    if (new_password !== confirm_password) {
      req.flash("error", "Las contraseñas no son iguales");

      return res.render("micuenta", {
        pageName: "Actualizar Perfil",
        dashboardPage: true,
        dash_cliente,
        messages: req.flash(),
      });
    } else {
      var  e_new_password = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
      UpdUser.actualizarpassW(userid, e_new_password)
        .then(() => {})
        .catch((err) => {
          return res.status(500).send("Error actualizando" + err);
        });
      //redirect('/dashboard');
      const usuario = await Usuarios.findOne({ where: { email } });
      if (tipo == 'Empresa') {
        res.redirect('/dashboard')
      }
      if (tipo == 'Cliente') {
        res.redirect('/dash_cliente')
      }
      if (tipo == 'Administrador') {
        let msg = "Se actualizó el usuario con éxito"
        res.redirect('/usuarios_a/'+ msg)
      }
    }
  }
};

// Formulario de buscar cuenta
exports.formSearchAccount = (req, res) => {
  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
  });
};

// Enviar token si el usuario es valido
exports.sendToken = async (req, res) => {
  // verificar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/search-account");
  }

  // Usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiration = Date.now() + 3600000;

  // Guardarlos en la BD
  await usuario.save();

  // Url de reset
  const resetUrl = `https://${req.headers.host}/search-account/${usuario.token}`;

  res.redirect("/resetpass/" + usuario.token + "/" + email);
  console.log(resetUrl);
};

exports.resetPasswordForm = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  // no se encontro el usuario
  if (!usuario) {
    req.flash("error", "No válido");
    res.redirect("/search-account");
  }

  // Formulario para generar password
  res.render("reset-password", {
    pageName: "Restablecer contraseña",
    layout: "page-form",
  });
};

// Cambiar el password
exports.updatePassword = async (req, res) => {
  // Verifica token y fecha de expiracion-
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("search-account");
  }

  // Hashear el password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiration = null;

  // Guardamos el nuevo password
  await usuario.save();

  req.flash("success", "Tu contraseña se modifico correctamente");
  res.redirect("/login");
};

// Cerrar sesión
exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};



exports.upload = function (req, res) {
  res.render("upload", {
    title: "ejemplo de subida de imagen por HispaBigData",
  });
};

exports.loginUserTemp = (req, res) => {
  console.log(req.body);
  passport.authenticate("cliente_out", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log('info')
      console.log(err)
      return res.send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log('info2')
      return res.send(user.dataValues);
    });
  })(req, res);
};

exports.loginadmin = (req, res) => {
  console.log(req.body);
  passport.authenticate("admin_enter", function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log('info')
      console.log(err)
      return res.send(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      console.log('info2')
      return res.redirect('/dashboard');
    });
  })(req, res);
};
exports.verifMail = async(req, res) => {
  console.log(req.body);
		const	usuario = await Usuarios.findOne({where: {email: req.body.correo}});
    console.log(usuario)
			if (!usuario) {
				console.log("No hay:"+ usuario);
				return res.send('0');
			}else{
        return res.send('1');
			}
};
