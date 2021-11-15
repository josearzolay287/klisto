const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const gatesController = require('../controllers/gatesController');
const landingController = require('../controllers/landingController');
const walletController = require('../controllers/walletController');
const adminDash = require('../controllers/adminDash');
const passport = require('passport');
const FileController = require('../models/upload');
const fileController = new FileController();
const {Niubiz} = require('@curiosity/niubiz');
const EmailCtrl = require('../controllers/mailCtrl');
const AgendaCtrl = require('../controllers/agendaController');
const visa = new Niubiz({
  user: 'integraciones@niubiz.com.pe',
  password: '_7z3@8fF',
  merchantId: '456879853',
  env: 'dev',
});
const mercadopago = require('../controllers/mercadoPago');
const paypal = require('../controllers/paypal');



// Landing Page
router.get('/', landingController.showLandingPage);
// Landing Page


//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.get('/login/:product/:monto/:modo', userController.formLoginBack);
router.post('/login',passport.authenticate('local',{ failureRedirect: '/login',failureFlash: 'Usuario o clave invalido.' }), userController.logintemp);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);

// Crear cuenta
router.get('/register', userController.formCreateUser);
router.get('/reg_cliente', userController.formCreateUser_client);
router.get('/reg_negocio', userController.formCreateUser_empres);
router.post('/reg_cliente', userController.createUser_client);
router.post('/registrar_empresa', userController.createUser_empresa);
router.post('/verificar_usuario', userController.verifMail);
router.post('/inicia_sesion_modal', userController.loginUserTemp);

//email route
router.post('/subscribe', EmailCtrl.sendEmail);
router.get('/resetpass/:token/:mail', EmailCtrl.sendEmailResetPass);
router.get('/sendMail/:gate_link/:id_user/:msg', EmailCtrl.sendEmailFansPromotion);
router.get('/borra_cuenta/:id_user', EmailCtrl.sendEmail_borra_cuenta);
router.get('/send_retirar_fondos/:ref_num/:monto/:status', EmailCtrl.sendEmail_get_retiro);
router.get('/actualizo_membresia/:producto/:monto/:modo', EmailCtrl.actualizo_membresia);


// Buscar cuenrta
router.get('/search-account', userController.formSearchAccount);
router.post('/search-account', userController.sendToken);
router.get('/search-account/:token', userController.resetPasswordForm);
router.post('/search-account/:token', userController.updatePassword);
router.get('/forgot-password', userController.forgot_password);

// Actualizar Perfil
//router.get('/update-profile', authController.authenticatedUser, dashboardController.updateProfile);
router.post('/update-profile', authController.authenticatedUser, userController.UpdateUser);
router.post('/update_client', authController.authenticatedUser, dashboardController.guardar_cliente);

//SERVICIOS
router.get('/servicios',dashboardController.servicios);

//NEGOCIOS
router.get('/negocios',dashboardController.negocios_list);


//PARA EL LANDGIN ACA
router.get('/negocios/:id', dashboardController.negocio_view);
router.get('/afiliar', dashboardController.afiliar);
// Dashboard
router.get('/dashboard', authController.authenticatedUser, dashboardController.dashboard);
router.get('/micuenta',authController.authenticatedUser, dashboardController.micuenta);
router.get('/minegocio',authController.authenticatedUser, dashboardController.minegocio);
router.get('/minegocio/:msg',authController.authenticatedUser, dashboardController.minegocio);

router.get('/dash_cliente', authController.authenticatedUser,dashboardController.dash_cliente);
router.get('/dash_cliente/:msg', authController.authenticatedUser,dashboardController.dash_cliente);
router.get('/encargados/:id_sucursal',authController.authenticatedUser, dashboardController.encargados);
router.post('/agregar_encargado',authController.authenticatedUser, dashboardController.agregar_encargados);
router.get('/eliminar_encargado/:id_encargado/:id_sucursal',authController.authenticatedUser, dashboardController.delete_encargado);
router.get('/editar_sucursal/:id_sucursal',authController.authenticatedUser, dashboardController.editar_sucursal);

router.get('/editar_encargado/:id_encargado/:id_sucursal',authController.authenticatedUser, dashboardController.editar_encargado);
router.post('/guardar_editar_local',authController.authenticatedUser, dashboardController.guardar_editar_sucursal);
router.post('/editar_encargado',authController.authenticatedUser, dashboardController.guardar_editar_encargardo);

router.get('/create_sucursal',authController.authenticatedUser, dashboardController.crear_sucursal);
router.post('/crear_sucursal',authController.authenticatedUser, dashboardController.guardar_sucursal);
router.get('/delete_sucursal/:id/:tipo',authController.authenticatedUser, dashboardController.delete_sucursal);

router.post('/actualizar_negocio',authController.authenticatedUser, dashboardController.actualizar_negocio);


router.get('/mispublicaciones',authController.authenticatedUser, dashboardController.mispublicaciones);
router.get('/mispublicaciones/:msg',authController.authenticatedUser, dashboardController.mispublicaciones);
router.get('/crear_publicacion',authController.authenticatedUser, dashboardController.crearpublicacion);
router.post('/crear_publicacion',authController.authenticatedUser, dashboardController.guardar_publicacion);
router.get('/delete_publicacion/:id',authController.authenticatedUser, dashboardController.delete_publicacion);
router.get('/delete_publicacion/:id/:tipo',authController.authenticatedUser, dashboardController.delete_publicacion);
router.get('/editar_publicacion/:id',authController.authenticatedUser, dashboardController.editar_publicacion);
router.post('/editar_publicacion',authController.authenticatedUser, dashboardController.guardar_editar_publicacion);


router.get('/categorias',authController.authenticatedUser, dashboardController.categorias);
router.get('/categorias/:msg',authController.authenticatedUser, dashboardController.categorias);
router.get('/crear_categoria',authController.authenticatedUser, dashboardController.crear_categoria);
router.post('/crear_categoria',authController.authenticatedUser, dashboardController.guardar_categoria);
router.get('/editar_categoria/:id',authController.authenticatedUser, dashboardController.editar_categoria);
router.get('/delete_cate/:id',authController.authenticatedUser, dashboardController.delete_cate);
router.post('/editar_categoria',authController.authenticatedUser, dashboardController.guardar_editar_categoria);


router.get('/configuraciones',authController.authenticatedUser, dashboardController.configuraciones);
router.get('/configuraciones/:msg',authController.authenticatedUser, dashboardController.configuraciones);
router.get('/crear_configuraciones',authController.authenticatedUser, dashboardController.crear_configuraciones);
router.post('/crear_configuraciones',authController.authenticatedUser, dashboardController.guardar_configuraciones);
router.get('/editar_configuraciones/:id',authController.authenticatedUser, dashboardController.editar_configuraciones);
router.post('/editar_configuraciones',authController.authenticatedUser, dashboardController.guardar_editar_configuraciones);


router.get('/cupones',authController.authenticatedUser, dashboardController.getCupones);
router.get('/cupones/:msg',authController.authenticatedUser, dashboardController.getCupones);
router.get('/crear_cupones',authController.authenticatedUser, dashboardController.addCupon);
router.post('/crear_cupones',authController.authenticatedUser, dashboardController.save_cupon);
router.get('/edit_cupon/:id',authController.authenticatedUser, dashboardController.editCupon);
router.post('/editar_cupones',authController.authenticatedUser, dashboardController.saveCuponEdited);
router.get('/borrar_cupon/:id', authController.authenticatedUser, dashboardController.deleteCupon);
router.post('/usar_cupon', dashboardController.usar_cupon);

router.get('/usuarios_a',authController.authenticatedUser, dashboardController.usuarios_a);
router.get('/usuarios_a/:msg',authController.authenticatedUser, dashboardController.usuarios_a);
router.get('/crear_usuarios_a',authController.authenticatedUser, dashboardController.crear_usuarios_a);
router.post('/crear_usuarios_a',authController.authenticatedUser, userController.createUser);
router.get('/editar_usuarios_a/:id',authController.authenticatedUser, dashboardController.editar_usuarios_a);
router.post('/editar_usuarios_a',authController.authenticatedUser, userController.UpdateUser);
router.get('/delete_usuarios_a/:id/:tipo',authController.authenticatedUser, dashboardController.delete_usuarios_a);




router.get('/terminos', authController.authenticatedUser, dashboardController.terminos);
router.get('/terminos/:msg', authController.authenticatedUser, dashboardController.terminos);
router.post('/ayudas_save', authController.authenticatedUser, dashboardController.terminos_save);
router.get('/terminos_page', dashboardController.terminos_page);
router.get('/politicas_page', dashboardController.politicas_page);


//PUBLICIDAD
router.get('/videos_admin',authController.authenticatedUser, dashboardController.videos_admin);
router.get('/videos_admin/:msg',authController.authenticatedUser, dashboardController.videos_admin);
router.get('/crear_videos_admin',authController.authenticatedUser, dashboardController.crear_videos_admin);
router.post('/crear_videos_admin',authController.authenticatedUser, dashboardController.guardar_videos_admin);
router.get('/editar_videos_admin/:id',authController.authenticatedUser, dashboardController.editar_videos_admin);
router.post('/editar_videos_admin',authController.authenticatedUser, dashboardController.guardar_editar_videos_admin);
router.get('/borrar_videos_admin/:id',authController.authenticatedUser, dashboardController.delete_videos_admin);


//PUBLICACIONES
router.get('/ver_publicacion/:id', authController.authenticatedUser, dashboardController.ver_publicacion);
router.get('/publicaciones', landingController.publi_landing);
router.get('/publicacion/:id', landingController.ver_publicacion);

//Calificaciones
router.post('/calificar_suc', dashboardController.save_calificacion)
//AGENDAR
router.post('/guardar_agenda',dashboardController.guardar_agenda);
router.post('/consulta_bd', AgendaCtrl.revisar_fecha_agenda);

// Paserela
router.post('/pasarela_publicacion', authController.authenticatedUser, mercadopago.pasarela2);
router.get('/pasarela_publicacion/comprar', authController.authenticatedUser, mercadopago.pasarela2);
router.post('/process_payment', mercadopago.procesar);
router.get('/process_payment', mercadopago.procesar);
router.get('/visa/respuesta/success',  mercadopago.pagar);
router.get('/visa/respuesta/failure',  mercadopago.pagar);
router.get('/visa/respuesta/pending',  mercadopago.pagar);

// Ventas
router.get('/ventas', authController.authenticatedUser, dashboardController.misventas);
router.get('/ventas/:msg', authController.authenticatedUser, dashboardController.misventas);
router.get('/confirmar_venta/:id/:estado/:billetera/:id_agenda', authController.authenticatedUser, dashboardController.confirmar_venta);
router.get('/cancelar_venta/:id/:tipo/:id_agenda', authController.authenticatedUser, dashboardController.cancelar_venta);

// Compras
router.get('/miscompras', authController.authenticatedUser, dashboardController.miscompras);
router.get('/miscompras/:msg', authController.authenticatedUser, dashboardController.miscompras);
router.get('/confirmar_miscompras/:id/:estado/:billetera', authController.authenticatedUser, dashboardController.confirmar_miscompras);







// Billetera
router.get('/wallet', authController.authenticatedUser, walletController.walletDashboard);
router.get('/wallet/:msg', authController.authenticatedUser, walletController.walletDashboard);
router.get('/confirmar_venta/:id/:estado/:billetera', authController.authenticatedUser, walletController.confirmar_venta);
router.post('/pagar_admin', authController.authenticatedUser, walletController.pagar_admin);
router.post('/guardar_datos_pago_wallet', authController.authenticatedUser, walletController.guardar_pago_admin);
router.get('/pagos', authController.authenticatedUser, walletController.pagos_admin);
router.get('/editar_pago/:id', authController.authenticatedUser, walletController.editar_pago);
router.post('/editar_pago', authController.authenticatedUser, walletController.editar_pago_save);

//BILLETERA NEGOCIO
router.get('/pagos_negocio', authController.authenticatedUser, walletController.pagos_negocio);



router.get('/datos_wallet', authController.authenticatedUser, walletController.datos_pagos);
router.post('/guardar_datos_pago_wallet', authController.authenticatedUser, walletController.saveDatos);
router.get('/recargar_backcoin', authController.authenticatedUser, walletController.recargar_backcoin);
router.get('/pagar_backcoins/:id/:product/:amount/:modo/:back_pay', authController.authenticatedUser, walletController.confirmar_venta);
router.get('/retirar_fondos', authController.authenticatedUser, walletController.retirar_fondos_form);
router.post('/retirar_fondos', authController.authenticatedUser, walletController.retirar_fondos_save);
router.get('/mis_retiros', authController.authenticatedUser, walletController.retiros);


















router.post('/update-profile/:archivo', fileController.subirArchivo);


// Inicio de sesión con Facebook
router.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  })
);
 
//incio sesion con google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }), function(req, res) {
    console.log("aqui")
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect : '/dashboard',
   failureRedirect: '/login',
  failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    res.redirect('/dashboard');
  });
// router.get('/auth/facebook/callback',
 //	passport.authenticate('facebook', { failureRedirect: '/login' }),
 //	function(req, res) {
//		res.redirect('/dashboard');
//	}
//);

router.get('/auth/mixcloud',
  passport.authenticate('mixcloud'));

router.get('/auth/mixcloud/callback', 
  passport.authenticate('mixcloud', { 
    successRedirect : '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/dashboard');
  });

module.exports = router;