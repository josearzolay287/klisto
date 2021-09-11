const Gates = require("../models/modulos_");
const Sequelize = require("sequelize");
const path = require("path");
let fs = require("fs");
const scdl = require("soundcloud-downloader").default;
//var mediaserver = require('mediaserver');
//var multer = require('multer');

exports.viewGate = (req, res) => {
  ////////console.log(req.user);
  let id_buscar = req.params.id;
  var id_user = req.user.id;

  Gates.obtenerUserforGate(id_user).then((resultado) => {
    let parsed_user = JSON.parse(resultado)[0];
    let cont = parsed_user.length;
    //////console.log(parsed_user);
    Gates.obtenerGate(id_buscar, id_user).then((resultado) => {
      let parsed = JSON.parse(resultado)[0];
      let cont = parsed.length;
      //////console.log(parsed);
      res.render("gate", {
        pageName: "Gate",
        gate: parsed,
        user: parsed_user,
        cont_gates: cont,
        layout: false,
      });
    });
  });
};
exports.viewGatePersonalizado = (req, res) => {
  let req_buscar = req.params.enlace;
  //	var id_user = req.user.id;
  //////console.log(req_buscar);
  Gates.obtenerGatePersonalizado(req_buscar).then((resultado) => {
    let parsed = JSON.parse(resultado)[0];
    let id_user = parsed.id_usuario;

    //////console.log(parsed);
    Gates.obtenerUserforGate(id_user).then((resultado) => {
      let parsed_user = JSON.parse(resultado)[0];
      //let cont= parsed_user.length
      //////console.log(parsed_user);
      let bondGate = false;
      let backstore = false;
      if (parsed.tipo_create == "bondgate") {
        bondGate = true;
      }
      if (parsed.tipo_create == "backstore") {
        backstore = true;
      }

      res.render("gate", {
        pageName: parsed.titulo,
        gate: parsed,
        user: parsed_user,
        bondGate,
        backstore,
        layout: false,
      });
    });
  });
};

exports.formCreateFileGate = (req, res) => {
  const user = res.locals.user;
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      ////////console.log(Fecha1)

      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          //////console.log("hay fecha");
          hay_not = true;
        }
      } else {
        //////console.log("hay activo");
        hay_not = true;
        break;
      }
    }

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      ////////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        ////////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuesta) => {
          let parsed = JSON.parse(respuesta);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            const enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            ////////console.log(parsed)
          }
          res.render("create-gate", {
            pageName: "Crear File Gate",
            dashboardPage: true,
            fileGate: true,
            array,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            parsed_lmit,
            notPhoto,
            user,
          });
        });
      });
    });
  });
};

exports.formEditFileGate = (req, res) => {
  const user = res.locals.user;
  const id_user = res.locals.user.id;
  var parametro_buscar = req.params.id;
  var backstore,
    fileGate,
    bondGate = false;

  Gates.obtenerGate(parametro_buscar, id_user).then((resultado) => {
    let parsed = JSON.parse(resultado)[0];
    let cont = parsed.length;
    if (parsed.tipo_create === "filegate") {
      fileGate = true;
    }
    if (parsed.tipo_create === "bondgate") {
      bondGate = true;
    }
    if (parsed.tipo_create === "backstore") {
      backstore = true;
    }
    //////console.log(parsed);
    res.render("create-gate-edit", {
      pageName: "Edit File Gate",
      gate: parsed,
      dashboardPage: true,
      fileGate: true,
      user,
      backstore,
      fileGate,
      bondGate,
      //cont_gates:total_gates,
    });
  });
};

exports.formCreateBondGate = (req, res) => {
  const user = res.locals.user;

  if (user.basic) {
    return res.redirect("/dashboard");
  }
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      //////console.log(Fecha1);

      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          //////console.log("hay fecha");
          hay_not = true;
        }
      } else {
        ////console.log("hay activo");
        hay_not = true;
        break;
      }
    }

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      //////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        //////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuesta) => {
          let parsed = JSON.parse(respuesta);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            const enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            //////console.log(parsed)
          }
          res.render("create-gate", {
            pageName: "Crear Bond Gate",
            dashboardPage: true,
            bondGate: true,
            notPhoto,
            parsed_lmit,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            user,
          });
        });
      });
    });
  });
};

exports.formBackstore = (req, res) => {
  const user = res.locals.user;

  if (!user.gold) {
    return res.redirect("dashboard");
  }
  var photo = req.user.photo;
  let notPhoto = true;
  if (photo == "0") {
    notPhoto = false;
  }
  Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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
      ////console.log(Fecha1);

      var AnyoFecha = Fecha1.getFullYear();
      var MesFecha = Fecha1.getMonth();
      var DiaFecha = Fecha1.getDate();

      if (parsed_lmit[i].estado == "Activa") {
        if (AnyoFecha == AnyoHoy && MesFecha == MesHoy && DiaFecha == DiaHoy) {
          break;
        } else {
          ////console.log("hay fecha");
          hay_not = true;
        }
      } else {
        ////console.log("hay activo");
        hay_not = true;
        break;
      }
    }

    Gates.obtenerGatesbyUser(user.id).then((respuesta) => {
      let parsed_g = JSON.parse(respuesta);
      total_gates = parsed_g.length;
      //////console.log(total_gates);
      let total_descargas = 0;
      for (let i = 0; i < total_gates; i++) {
        total_descargas += parseInt(parsed_g[i].descargas);
        //////console.log(plan_basico_Mensual)
        //const element = array[index];
      }
      Gates.obtenerSuscripbyUserG(user.id).then((data) => {
        let parsed_s = JSON.parse(data);
        total_sus = parsed_s.length;
        Gates.totalGates().then((respuesta) => {
          let parsed = JSON.parse(respuesta);
          let array = [];
          for (let i = 0; i < parsed.length; i++) {
            const enlace_perzonalizado = parsed[i].enlace_perzonalizado;
            array.push(enlace_perzonalizado);
            //////console.log(parsed)
          }
          res.render("create-gate", {
            pageName: "BackStore",
            dashboardPage: true,
            backstore: true,
            notPhoto,
            parsed_lmit,
            hay_not,
            total_gates,
            total_descargas,
            total_sus,
            user,
          });
        });
      });
    });
  });
};

exports.createGate = (req, res) => {
  var id_user = req.user.id;
  const user = res.locals.user;
  ////console.log(req.body);
  const {
    url_demo,
    gender,
    other_gender,
    url_track,
    artist_name,
    music_title,
    music_desc,
    music_price,
    color,
    color_titulo,
    color_descripcion,
    show_watermarker,
    desing_social,
    user_logo,
    privacity,
    gate_link,
    promotion,
    suscribir_youtube,
    omitir_youtube,
    url_youtube,
    nombre_youtube,
    like_facebook,
    compartir_facebook,
    omitir_facebook,
    url_facebook,
    seguir_twitter,
    compartir_twitter,
    omitir_twitter,
    url_twitter,
    seguir_soundcloud,
    compartir_soundcloud,
    repost_souncloud,
    omitir_souncloud,
    url_souncloud,
    seguir_instagram,
    omitir_instagram,
    url_instagram,
    seguir_spotify,
    omitir_spotify,
    url_spotify,
    seguir_deezer,
    guardar_deezer,
    omitir_deezer,
    url_deezer,
    seguir_tiktok,
    omitir_tiktok,
    url_tiktok,
    seguir_mixcloud,
    repost_mixcloud,
    like_mixcloud,
    omitir_mixcloud,
    url_mixcloud,
    fecha_programa,
    archivo1,
    img_flyer,
    tipo_create,
  } = req.body;

  const SOUNDCLOUD_URL = url_demo;
  let link  = SOUNDCLOUD_URL
  link_ = link.split('/')

  if (typeof SOUNDCLOUD_URL === "undefined" || link_[2] != "soundcloud.com" || link_[2] != "soundcloud.es") {
    let genero = gender;
    Gates.insertargates({
      url_demo,
      genero,
      other_gender,
      url_track,
      artist_name,
      music_title,
      music_desc,
      music_price,
      color,
      color_titulo,
      color_descripcion,
      show_watermarker,
      desing_social,
      user_logo,
      privacity,
      gate_link,
      promotion,
      suscribir_youtube,
      omitir_youtube,
      url_youtube,
      nombre_youtube,
      like_facebook,
      compartir_facebook,
      omitir_facebook,
      url_facebook,
      seguir_twitter,
      compartir_twitter,
      omitir_twitter,
      url_twitter,
      seguir_soundcloud,
      compartir_soundcloud,
      repost_souncloud,
      omitir_souncloud,
      url_souncloud,
      seguir_instagram,
      omitir_instagram,
      url_instagram,
      seguir_spotify,
      omitir_spotify,
      url_spotify,
      seguir_deezer,
      guardar_deezer,
      omitir_deezer,
      url_deezer,
      seguir_tiktok,
      omitir_tiktok,
      url_tiktok,
      seguir_mixcloud,
      repost_mixcloud,
      like_mixcloud,
      omitir_mixcloud,
      url_mixcloud,
      fecha_programa,
      archivo1,
      img_flyer,
      tipo_create,
      id_user,
    })
      .then((respuesta) => {
        //	////console.log(respuesta);
        let backstore = false;
        let bondGate = false;
        let fileGate = false;
        if (tipo_create == "filegate") {
          fileGate = true;
        }
        if (tipo_create == "bondgate") {
          bondGate = true;
        }
        if (tipo_create == "backstore") {
          backstore = true;
        }
        if (promotion == "Si") {
          let msg = "Enlace personalizado";
          //////console.log(msg)
          res.redirect("/sendMail/" + gate_link + "/" + id_user + "/" + msg);
        } else {
          res.redirect("/dashboard/filegate");
        }
      })
      .catch((err) => {
        return res.status(500).send("Error actualizando" + err);
      });
  } else {
    ////console.log(SOUNDCLOUD_URL);
    //const CLIENT_ID = 'asdhkalshdkhsf'
    scdl.getInfo(SOUNDCLOUD_URL).then((stream) => {
      var titulo = stream.title;
      let genero = gender;
      //stream.pipe(fs.createWriteStream('audio.mp3'))
      ////console.log(stream);
      //////console.log(genero)

      Gates.insertargates({
        url_demo,
        genero,
        other_gender,
        url_track,
        artist_name,
        music_title,
        music_desc,
        music_price,
        color,
        color_titulo,
        color_descripcion,
        show_watermarker,
        desing_social,
        user_logo,
        privacity,
        gate_link,
        promotion,
        suscribir_youtube,
        omitir_youtube,
        url_youtube,
        nombre_youtube,
        like_facebook,
        compartir_facebook,
        omitir_facebook,
        url_facebook,
        seguir_twitter,
        compartir_twitter,
        omitir_twitter,
        url_twitter,
        seguir_soundcloud,
        compartir_soundcloud,
        repost_souncloud,
        omitir_souncloud,
        url_souncloud,
        seguir_instagram,
        omitir_instagram,
        url_instagram,
        seguir_spotify,
        omitir_spotify,
        url_spotify,
        seguir_deezer,
        guardar_deezer,
        omitir_deezer,
        url_deezer,
        seguir_tiktok,
        omitir_tiktok,
        url_tiktok,
        seguir_mixcloud,
        repost_mixcloud,
        like_mixcloud,
        omitir_mixcloud,
        url_mixcloud,
        fecha_programa,
        archivo1,
        img_flyer,
        tipo_create,
        id_user,
      })
        .then((respuesta) => {
          let parsed_ = JSON.parse(respuesta);
          var id_gate = parsed_.id;
          var title = stream.title;
          var id_track = stream.id;
          var permalink_url = stream.permalink_url;

          Gates.SaveSoundC(
            id_user,
            id_gate,
            title,
            id_track,
            permalink_url
          ).then((data) => {
            let parsed_s = JSON.parse(data);
            var id_save = parsed_s.id;
            Gates.UpdateRelationGate(id_save, id_gate);
            if (promotion == "Si") {
              let msg = "Enlace personalizado";
              //////console.log(msg)
              res.redirect(
                "/sendMail/" + gate_link + "/" + id_user + "/" + msg
              );
            } else {
              res.redirect("/dashboard/filegate");
            }
          });
        })
        .catch((err) => {
          return res.status(500).send("Error actualizando" + err);
        });
    });
  }
};

exports.updateGate = (req, res) => {
  var id_user = req.user.id;
  ////console.log(req.body);
  const {
    id_gate,
    url_demo,
    gender,
    other_gender,
    url_track,
    artist_name,
    music_title,
    music_desc,
    music_price,
    color,
    color_titulo,
    color_descripcion,
    show_watermarker,
    desing_social,
    user_logo,
    privacity,
    gate_link,
    promotion,
    suscribir_youtube,
    omitir_youtube,
    url_youtube,
    nombre_youtube,
    like_facebook,
    compartir_facebook,
    omitir_facebook,
    url_facebook,
    seguir_twitter,
    compartir_twitter,
    omitir_twitter,
    url_twitter,
    seguir_soundcloud,
    compartir_soundcloud,
    repost_souncloud,
    omitir_souncloud,
    url_souncloud,
    seguir_instagram,
    omitir_instagram,
    url_instagram,
    seguir_spotify,
    omitir_spotify,
    url_spotify,
    seguir_deezer,
    guardar_deezer,
    omitir_deezer,
    url_deezer,
    seguir_tiktok,
    omitir_tiktok,
    url_tiktok,
    seguir_mixcloud,
    repost_mixcloud,
    like_mixcloud,
    omitir_mixcloud,
    url_mixcloud,
    fecha_programa,
    archivo1,
    img_flyer,
    tipo_create,
  } = req.body;

  //////console.log(url_demo+"-"+gender+"-"+other_gender+"-"+url_track+"-"+artist_name+"-"+music_title+"-"+music_desc+"-"+music_price+"-"+color+"-"+show_watermarker+"-"+desing_social+"-"+user_logo+"-"+privacity+"-"+gate_link+"-"+promotion+"-"+suscribir_youtube+"-"+omitir_youtube+"-"+url_youtube+"-"+nombre_youtube+"-"+like_facebook+"-"+compartir_facebook+"-"+omitir_facebook+"-"+url_facebook+"-"+seguir_twitter+"-"+compartir_twitter+"-"+omitir_twitter+"-"+url_twitter+"-"+seguir_soundcloud+"-"+compartir_soundcloud+"-"+repost_souncloud+"-"+omitir_souncloud+"-"+url_souncloud+"-"+seguir_instagram+"-"+omitir_instagram+"-"+url_instagram+"-"+seguir_spotify+"-"+omitir_spotify+"-"+url_spotify+"-"+seguir_deezer+"-"+guardar_deezer+"-"+omitir_deezer+"-"+url_deezer+"-"+seguir_tiktok+"-"+omitir_tiktok+"-"+seguir_mixcloud+"-"+repost_mixcloud+"-"+like_mixcloud+"-"+omitir_mixcloud+"-"+url_mixcloud);

  Gates.updategates({
    id_gate,
    url_demo,
    gender,
    other_gender,
    url_track,
    artist_name,
    music_title,
    music_desc,
    music_price,
    color,
    color_titulo,
    color_descripcion,
    show_watermarker,
    desing_social,
    user_logo,
    privacity,
    gate_link,
    promotion,
    suscribir_youtube,
    omitir_youtube,
    url_youtube,
    nombre_youtube,
    like_facebook,
    compartir_facebook,
    omitir_facebook,
    url_facebook,
    seguir_twitter,
    compartir_twitter,
    omitir_twitter,
    url_twitter,
    seguir_soundcloud,
    compartir_soundcloud,
    repost_souncloud,
    omitir_souncloud,
    url_souncloud,
    seguir_instagram,
    omitir_instagram,
    url_instagram,
    seguir_spotify,
    omitir_spotify,
    url_spotify,
    seguir_deezer,
    guardar_deezer,
    omitir_deezer,
    url_deezer,
    seguir_tiktok,
    omitir_tiktok,
    url_tiktok,
    seguir_mixcloud,
    repost_mixcloud,
    like_mixcloud,
    omitir_mixcloud,
    url_mixcloud,
    fecha_programa,
    archivo1,
    img_flyer,
    tipo_create,
    id_user,
  })
    .then((respuesta) => {
      //	////console.log(respuesta);
    })
    .catch((err) => {
      return res.status(500).send("Error actualizando" + err);
    });
  //redirect('/dashboard');
  let msg = tipo_create + " actualizado con exito";
  res.redirect("/dashb/" + msg);
};

exports.getGates = async (req, res) => {
  var photo = req.user.photo;
  let parametro_buscar = req.params.gates;
  let product = req.params.productUdpt;
  var id_user = req.user.id;
  let msg = false;
  let notPhoto = true;
  let fileGateget = true;
  let bondGateget = false;
  let backstoreget = false;
  //////console.log(req.session)

  if (req.params.msg) {
    msg = req.params.msg;
    ////console.log(msg);
  }
  if (typeof product === "undefined") {
    product = false;
  }
  if (typeof parametro_buscar === "undefined") {
    parametro_buscar = "filegate";
  }

  if (parametro_buscar === "bondgate") {
    fileGateget = false;
    bondGateget = true;
  }
  if (parametro_buscar === "backstore") {
    fileGateget = false;
    backstoreget = true;
  }

  if (photo == "0") {
    notPhoto = false;
  }

  var total_gates = "";

  //////console.log(req.params.gates);
  Gates.obtenerGates(parametro_buscar, id_user).then((resultado) => {
    let parsed = JSON.parse(resultado);
    let cont = parsed.length;
    Gates.obtenernotificacionesbyLimit3().then((resultado2) => {
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
        //	////console.log(Fecha1)

        var AnyoFecha = Fecha1.getFullYear();
        var MesFecha = Fecha1.getMonth();
        var DiaFecha = Fecha1.getDate();

        if (parsed_lmit[i].estado == "Activa") {
          if (
            AnyoFecha == AnyoHoy &&
            MesFecha == MesHoy &&
            DiaFecha == DiaHoy
          ) {
            break;
          } else {
            ////console.log("hay fecha");
            hay_not = true;
          }
        } else {
          ////console.log("hay activo");
          hay_not = true;
          break;
        }
      }

      Gates.obtenerGatesbyUser(id_user).then((respuesta) => {
        let parsed_g = JSON.parse(respuesta);
        total_gates = parsed_g.length;
        //////console.log(total_gates);
        let total_descargas = 0;
        for (let i = 0; i < total_gates; i++) {
          total_descargas += parseInt(parsed_g[i].descargas);
          //////console.log(plan_basico_Mensual)
          //const element = array[index];
        }
        Gates.obtenerSuscripbyUserG(id_user).then((data) => {
          let parsed_s = JSON.parse(data);
          total_sus = parsed_s.length;

          res.render("dashboard", {
            gates: parsed,
            product,
            parsed_lmit,
            notificaciones: true,
            dashboardPage: true,
            total_gates,
            notPhoto,
            total_descargas,
            notificaciones_parsed: parsed,
            total_sus,
            parsed_s,
            hay_not,
            fileGateget,
            bondGateget,
            backstoreget,
            msg,
          });
        });
      });
    });
  });
};

exports.deleteGate = async (req, res) => {
  let parametro_buscar = req.params.id_;
  if (typeof parametro_buscar === "undefined") {
    parametro_buscar = "filegate";
  }
  Gates.deleteGate(parametro_buscar).then((resultado) => {
    //let parsed = JSON.parse(resultado);
    //let cont= parsed.length
    ////console.log(resultado);
    res.redirect("/dashboard/filegate");
  });
};

exports.downloadGate = (req, res) => {
  ////console.log(req.params);

  let archivo = req.params.id;
  var parametro_buscar = req.params.id_gate;
  var correo = req.params.correo;
  var id_usuario = req.params.id_usuario;
  //////console.log(parametro_buscar)
  var fileName = String(archivo); // The default name the browser will use
  //var filePath =__dirname + '/../public/assets/uploads/'; // Or format the path using the `id` rest param
  //////console.log(fileName)
  var filePath = path.join(__dirname, "/../public/assets/uploads/", fileName);

  //let absPath = path.join(__dirname, '/my_files/', filename);
  ////console.log(filePath);
  Gates.guardarSuscripcionGate(
    "suscripcion_gate",
    correo,
    parametro_buscar,
    id_usuario
  ).then((resultado) => {
    if (resultado == "0") {
      ////console.log("Email ya registrado en sistema");
    }
  });
  Gates.obtenerGateforDown(parametro_buscar).then((resultado) => {
    let parsed = JSON.parse(resultado)[0];
    let cont = parsed.length;
    let down = parsed.descargas;
    let mails = parsed.correos;

    let cont_down = parseInt(down) + 1;
    let cont_mails = parseInt(mails) + 1;
    ////console.log(cont_mails);
    Gates.actualizarGateDownload(parametro_buscar, cont_down, cont_mails).then(
      (resultado) => {
        console.log(resultado)
        res.download(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    );
  });

  //res.download(filePath);
};
