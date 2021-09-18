const Modulo_BD = require("../models/modulos_");

exports.showLandingPage = (req, res) => {
  let msg = false;
  if (req.query.msg) {
    msg = req.query.msg;
  }
  Modulo_BD.publicacionesAll().then((data)=>{
    let parse_publi = JSON.parse(data)
    console.log(parse_publi)
    res.render("home", {
          pageName: "Inicio",
          landingPage: true,
          home:true,
          msg,
          layout: false,
          parse_publi
        });
  })
         
};

exports.showRank = (req, res) => {
  Modulo_BD.obtenerSoundCD().then((resultadoS) => {
    var parsedSound = JSON.parse(resultadoS);
    //console.log(parsedSound)
    Modulo_BD.obtenerSoundNew().then((resultadoT) => {
      var parsed_new = JSON.parse(resultadoT);
      res.render("ranking", {
        pageName: "Inicio",
        landingPage: true,
        parsed_new,
        parsedSound,
        layout: false,
      });
    });
  });
};
exports.showRankDown = (req, res) => {
  //console.log(req.params)

  let archivo = req.params.id;
  var parametro_buscar = req.params.id_gate;
  var correo = req.params.correo;
  var id_usuario = req.params.id_usuario;
  Modulo_BD.obtenerSoundCD().then((resultadoS) => {
    var parsedSound = JSON.parse(resultadoS);
    //console.log(parsedSound)
    Modulo_BD.obtenerSoundNew().then((resultadoT) => {
      var parsed_new = JSON.parse(resultadoT);
      res.render("ranking", {
        pageName: "Inicio",
        parsed_new,
        parsedSound,
        landingPage: true,
        archivo,
        parametro_buscar,
        correo,
        id_usuario,
        layout: false,
      });
    });
  });
};

//LANDING PUBLICACIONES
exports.publi_landing = (req, res) => {
  //const user = res.locals.user;
   //console.log(user);
   Modulo_BD.publicacionesAll().then((data) =>{
    let publicaciones = JSON.parse(data)
    console.log(publicaciones)
    Modulo_BD.categoriasAct().then((cat) =>{
      let categorias = JSON.parse(cat)
   res.render("home", {
     pageName: "Mi cuenta",
     landingPage: true,
     layout: false,
     publicaciones_landing:true,
     publicaciones,
     categorias
   });
  })
})
 };

 exports.ver_publicacion = (req, res) => {
  let id_publicacion = req.params.id
  Modulo_BD.publicacionesbyId(id_publicacion).then((data) =>{
    let publicacion = JSON.parse(data)[0]
    console.log(publicacion)
    let id_user = publicacion.usuarioId;
    Modulo_BD.Sucursalesbyuser(id_user).then((respuesta) =>{
      let sucursales = JSON.parse(respuesta)
      console.log(sucursales)
      Modulo_BD.UsuariobyId(id_user).then((datauser) =>{
        let usuario = JSON.parse(datauser)[0]
   res.render("publicacion", {
     pageName: "Mi cuenta",
     landingPage: true,
     publicaciones_landing:true,
     publicacion_activa:true,
     publicacion,usuario,
     sucursales,
   });
  })
})
  
})
 };