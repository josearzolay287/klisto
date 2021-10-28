const { Op } = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt-nodejs");
const Usuarios = require("../models/Usuarios");
const Encargados = require("./Encargados");
const Sucursales = require("./Sucursales");
const Publicaciones = require("./Publicaciones");
const Categorias = require("./Categorias");
const Ventas = require("./Ventas");
const Wallet = require("./Wallet");
const Configuraciones = require("./Configuraciones");
const Ayuda = require("./Ayuda");
const Pagos = require("./Pagos");
const Agenda = require("./Agenda");
const Publicidad = require("./Publicidad");
const Clientes = require("./Clientes");
const Cupones = require("../models/Cupones");
const Used_cupons = require("./Used_cupons");
const Calificaciones = require("./Calificaciones");

module.exports = {
  //USUARIOS
  UsuariobyId(id) {
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        where: {
          id: id,
        },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  UsuariobyAll() {
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  UsuarioDelete(id) {
    return new Promise((resolve, reject) => {
      Usuarios.destroy({
        where: {
          id: id,
        },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
login(email, password) {
    return new Promise((resolve, reject) => {
      Usuarios.findAll({
        where: {
          email: email,
        },
      })
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });

  },
  actualizarUser(userid, name, email, photo1) {
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          name: name, email: email, photo: photo1
        },
        {
          where: {
            id: userid,
          },
        }
      )
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  },
 actualizarpassW(id, password) {
    //Actualizar clave
    // password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    ////console.log(password);
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          password: password
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((data) => {
          let data_set = JSON.stringify(data);
          resolve(data_set);
          //console.log(planes);
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  },

  actualizarnegocio(userid,
    nombre,
    telefono,
    descripcion,
    banco,
    cuenta,
    photo1) {
    return new Promise((resolve, reject) => {
      Usuarios.update(
        {
          name: nombre, telefono: telefono, descripcion: descripcion, banco: banco, cuenta: cuenta, photo: photo1
        },
        {
          where: {
            id: userid,
          },
        }
      )
        .then((data) => {
          Sucursales.update(
            {
              telefono: telefono, descripcion: descripcion, link: nombre
            },
            {
              where: {
                tipo: 'Principal',
                usuarioId: userid,
              },
            })
            .then((data_suc) => {
              let data_set = JSON.stringify(data);
              Sucursales.update(
                {
                  link: nombre
                },
                {
                  where: {
                    usuarioId: userid,
                  },
                })
                .then((data_suc) => {
                  let data_set = JSON.stringify(data);

                  resolve('Se actualizo todo bien');
                  //console.log(planes);
                }).catch((err) => {
                  //console.log(err);
                  reject(err)
                });
              //console.log(planes);
            }).catch((err) => {
              //console.log(err);
              reject(err)
            });
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },


  //SUCURSALER
  Sucursalesbyuser(id) {
    return new Promise((resolve, reject) => {
      Sucursales.findAll({
        where: {
          usuarioId: id,
        }, include: [
          {
            association: Sucursales.Encargados,
          }, {
            association: Sucursales.Usuarios,
          }

        ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  Sucursalesbylink(id) {
    return new Promise((resolve, reject) => {
      Sucursales.findAll({
        where: {
          link: id,
        }, include: [
          {
            association: Sucursales.Encargados,
          }, {
            association: Sucursales.Usuarios,
          }

        ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  SucursalesAll() {
    return new Promise((resolve, reject) => {
      Sucursales.findAll({
        include: [
          {
            association: Sucursales.Encargados,
          },
        ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  SucursalesbyuserEncargado(id) {
    return new Promise((resolve, reject) => {
      Sucursales.findAll({
        where: {
          usuarioId: id,
          tipo: 'Principal'
        }, include: [
          {
            association: Sucursales.Encargados,
          },

        ],
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  consultarSucursalesbyId(id) {
    return new Promise((resolve, reject) => {
      Sucursales.findAll({
        where: {
          id: id,
        }, include: [
          {
            association: Sucursales.Encargados,
          },

        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_editar_sucursal(id_sucursal, link, departamento, distrito, direccion, telefono, nombre_local, distritos_atendidos, dias_laborables, desde, hasta, break_desde, break_hasta) {
    let dist = distritos_atendidos.toString()
    let dias_laborablesS = dias_laborables.toString()
    return new Promise((resolve, reject) => {
      Sucursales.update({
        departamento: departamento, distrito: distrito, direccion: direccion, telefono: telefono, nombre: nombre_local, distritos: dist, dias_laborables: dias_laborablesS, desde: desde, hasta: hasta, link: link, hora_break_desde: break_desde, hora_break_hasta: break_hasta
      }, {
        where: {
          id: id_sucursal,
        },
      }).then((data_sucursal) => {
        let datas = JSON.stringify(data_sucursal);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },
  guardar_sucursal(id_usuario, link, departamento, distrito, direccion, telefono, nombre_local, distritos_atendidos, dias_laborables, desde, hasta, break_desde, break_hasta) {
    let dist = distritos_atendidos.toString()
    let dias_laborablesS = dias_laborables.toString()
    return new Promise((resolve, reject) => {
      Sucursales.create({
        departamento: departamento, distrito: distrito, direccion: direccion, telefono: telefono, tipo: 'Sucursal', nombre: nombre_local, distritos: dist, usuarioId: id_usuario, dias_laborables: dias_laborablesS, desde: desde, hasta: hasta, link: link, hora_break_desde: break_desde, hora_break_hasta: break_hasta
      }).then((data_encargado) => {
        let datas = JSON.stringify(data_encargado);
        resolve(datas);

      })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  eliminar_sucursal(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Sucursales.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },


//CLIENTE
  ClientebyId(id) {
    return new Promise((resolve, reject) => {
      Clientes.findAll({
        where: {
          usuarioId: id,
        },
      })
        .then((data) => {
          let data_p = JSON.stringify(data);
          resolve(data_p);
          ////console.log(id_Cliente);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  guardar_Client(id_usuario, departamento, distrito, direccion, telefono) {
    return new Promise((resolve, reject) => {
      Clientes.findOne({
        where: {
          usuarioId: id_usuario,
        },
      })
        .then((data) => {
          console.log(data)

          if (!data) {
            Clientes.create({
              departamento: departamento, distrito: distrito, direccion: direccion, telefono: telefono, tipo: 'Cliente', usuarioId: id_usuario
            }).then((data_encargado) => {
              let datas = JSON.stringify(data_encargado);
              resolve(datas);

            })
              .catch((err) => {
                ////console.log(err);
              });
          } else {
            Clientes.update({
              departamento: departamento, distrito: distrito, direccion: direccion, telefono: telefono, tipo: 'Cliente', usuarioId: id_usuario
            }, {
              where: {
                usuarioId: id_usuario,
              }
            }).then((data_encargado) => {
              let datas = JSON.stringify(data_encargado);
              resolve(datas);

            })
              .catch((err) => {
                ////console.log(err);
              });
          }

        })

    });
  },


  //ENCARGADOS-EMPLEADOS
  consultarEmpleadobyId(id) {
    return new Promise((resolve, reject) => {
      Encargados.findAll({
        where: {
          id: id,
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_encargardo(id_sucursal, nombre, apellido, correo, telefono, tipo) {
    return new Promise((resolve, reject) => {
      Encargados.create({
        nombre: nombre, apellido: apellido, correo: correo, telefono: telefono, tipo: tipo, sucursaleId: id_sucursal
      }).then((data_encargado) => {
        let datas = JSON.stringify(data_encargado);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  guardar_editar_encargardo(id_encargado, nombre, apellido, correo, telefono, tipo) {
    return new Promise((resolve, reject) => {
      Encargados.update({
        nombre: nombre, apellido: apellido, correo: correo, telefono: telefono, tipo: tipo
      }, {
        where: {
          id: id_encargado,
        },
      }).then((data_encargado) => {
        let datas = JSON.stringify(data_encargado);
        resolve(datas);

      })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },

  eliminar_encargado(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Encargados.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },

  
  //PUBLICACIONES
  publicacionesAll() {
    return new Promise((resolve, reject) => {
      Publicaciones.findAll({})
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  publicacionesAllLimit(limit, offset) {
    return new Promise((resolve, reject) => {
      Publicaciones.findAndCountAll()
        .then((data) => {
          let datas = JSON.stringify(data);

          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  publicaciones(id_usuario) {
    return new Promise((resolve, reject) => {
      Publicaciones.findAll({
        where: {
          usuarioId: id_usuario
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  publicacionesbyId(id) {
    return new Promise((resolve, reject) => {
      Publicaciones.findAll({
        where: {
          id: id,
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_publicacion(userid, photo, desde, hasta, titulo, precio, billetera, categoria, estado, descripcion, condiciones, preparacion, ejecucion, sucursales, empleados, costo_domicilio,domicilio) {
    let fotos = photo.toString()
    let sucursalesS = sucursales.toString()
    let empleadosS = empleados.toString()
    return new Promise((resolve, reject) => {
      Publicaciones.create({
        titulo: titulo, precio: precio, billetera: billetera, categoria: categoria, fotos: fotos, horario_desde: desde, horario_hasta: hasta, descripcion: descripcion, condiciones: condiciones, estado: estado, preparacion: preparacion, ejecucion: ejecucion, sucursales: sucursalesS, empleados: empleadosS, costo_domicilio: costo_domicilio, usuarioId: userid, domicilio: domicilio
      }).then((data_encargado) => {
        let datas = JSON.stringify(data_encargado);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  eliminar_publicacion(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Publicaciones.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },
  guardaredit_publicacion(id_publicacion, userid, photo, desde, hasta, titulo, precio, billetera, categoria, estado, descripcion, condiciones, preparacion, ejecucion, sucursales, empleados, costo_domicilio,domicilio) {
    let fotos = photo.toString()
    let sucursalesS = sucursales.toString()
    let empleadosS = empleados.toString()
    return new Promise((resolve, reject) => {
      Publicaciones.update({
        titulo: titulo, precio: precio, billetera: billetera, categoria: categoria, fotos: fotos, horario_desde: desde, horario_hasta: hasta, descripcion: descripcion, condiciones: condiciones, estado: estado, preparacion: preparacion, ejecucion: ejecucion, sucursales: sucursalesS, empleados: empleadosS, costo_domicilio: costo_domicilio, usuarioId: userid, domicilio: domicilio,
      }, {
        where: {
          id: id_publicacion
        }
      }).then((data_encargado) => {
        let datas = JSON.stringify(data_encargado);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },

  //AGENDA
  AgendaAll() {
    return new Promise((resolve, reject) => {
      Agenda.findAll({
        include: [
          {
            association: Agenda.Usuarios
          }, {
            association: Agenda.Publicaciones,
          }, {
            association: Agenda.Encargados,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_Agenda(fecha, id_publicacion, h_desde, h_hasta, id_encargado, lugar_servicio, nombre_del_tercero, telefono_tercero, direccion_tercero, lugar_serv_propio, comentario, distrito_domicilio) {
    return new Promise((resolve, reject) => {
      Agenda.create({
        fecha_agenda: fecha, hora_cita_desde: h_desde, hora_cita_hasta: h_hasta, lugar_servicio: lugar_servicio, nombre_del_tercero: nombre_del_tercero, telefono_tercero: telefono_tercero, direccion_tercero: direccion_tercero, lugar_serv_propio: lugar_serv_propio, comentario: comentario, encargadoId: id_encargado, publicacioneId: id_publicacion, direccion_propio_otra: distrito_domicilio
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },
  Agendabyfecha(fecha) {
    return new Promise((resolve, reject) => {
      Agenda.findAll({
        where: {
          fecha_agenda: fecha
        }
      }, {
        include: [
          {
            association: Agenda.Usuarios
          }, {
            association: Agenda.Publicaciones,
          }, {
            association: Agenda.Encargados,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          console.log(data.length);
          for (let i = 0; i < data.length; i++) {
            if (data[i].estado == null) {
              console.log("aqui")
              Agenda.destroy({
                where: {
                  fecha_agenda: fecha,
                },
              })
            }


            if (i == data.length) {
              Agenda.findAll({
                where: {
                  fecha_agenda: fecha
                }
              }, {
                include: [
                  {
                    association: Agenda.Usuarios
                  }, {
                    association: Agenda.Publicaciones,
                  }, {
                    association: Agenda.Encargados,
                  },
                ],
              })
                .then((upd) => {
                  let data2 = JSON.stringify(upd);
                  return resolve(data2);
                })
            }

          }
          resolve(datas);

        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
    });
  },


  //CATEGORIAS
  categorias() {
    return new Promise((resolve, reject) => {
      Categorias.findAll({})
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  categoriasAct() {
    return new Promise((resolve, reject) => {
      Categorias.findAll({
        where: {
          estado: 'Activa'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  categoriabyId(id_ct) {
    return new Promise((resolve, reject) => {
      Categorias.findAll({
        where: {
          id: id_ct
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_categoria(userid, categoria, estado) {
    return new Promise((resolve, reject) => {
      Categorias.create({
        nombre: categoria, estado: estado, usuarioId: userid
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  guardaredit_categoria(id_categoria, categoria, estado, userid) {
    return new Promise((resolve, reject) => {
      Categorias.update({
        nombre: categoria, estado: estado, usuarioId: userid
      }, {
        where: {
          id: id_categoria
        }
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  eliminar_cate(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Categorias.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },


  //Ventas - Wallet
  Wallet() {
    return new Promise((resolve, reject) => {
      Wallet.findAll({})
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  WalletbyIduser(usuarioId) {
    return new Promise((resolve, reject) => {
      Wallet.findAll({
        where: {
          usuarioId: usuarioId
        }, order: [
          ['updatedAt', 'DESC'],
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_wallet_ventas(monto, estado, comprobante, publicacionId, usuarioId, monto_wallet, id_comprador, id_agenda, costo_domicilio, cupon) {
    return new Promise((resolve, reject) => {
      Ventas.create({
        monto: monto, estado: "Por confirmar", comprobante: comprobante, id_comprador: id_comprador, publicacioneId: publicacionId, costo_domicilio: costo_domicilio, usuarioId: usuarioId, AgendaId: id_agenda, observacion: cupon
      }).then((data_venta) => {
        console.log(data_venta)
        Agenda.update({ estado: "Por confirmar" }, {
          where: {
            id: id_agenda
          }
        })
        Wallet.findAll({
          where: {
            usuarioId: usuarioId
          }
        })
          .then((data) => {
            //  console.log(data[0].id)
            //   console.log(data_venta.id)
            if (data.length == 0) {
              console.log("entro aqui")
              Wallet.create({
                saldo: monto_wallet, estado: 'En espera', ventaId: data_venta.id, publicacioneId: publicacionId, usuarioId: usuarioId
              }).then((data_) => {

                let datas = JSON.stringify(data_);
                resolve(datas);

              })
            } else {
              console.log("entro aqui else")
              let saldo_actual = data[0].saldo;
              console.log(saldo_actual)
              let nuevo_saldo = parseFloat(saldo_actual) + parseFloat(monto_wallet)
              Wallet.update({
                saldo: nuevo_saldo, estado: 'Activo', ventaId: data_venta.id, publicacioneId: publicacionId, usuarioId: usuarioId
              }, {
                where: {
                  id: data[0].id
                }
              }).then((data_) => {

                let datas = JSON.stringify(data_);
                resolve(datas);
              })
            }
          })

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  VentasAll() {
    return new Promise((resolve, reject) => {
      Ventas.findAll({
        include: [
          {
            association: Ventas.Publicaciones,
          }, {
            association: Ventas.Usuarios,
          }, {
            association: Ventas.Agenda,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  VentasbyIduser(usuarioId) {
    return new Promise((resolve, reject) => {
      Ventas.findAll({
        where: {
          usuarioId: usuarioId
        }, include: [
          {
            association: Ventas.Publicaciones,
          }, {
            association: Ventas.Agenda,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  VentabyId_confirmar(id, id_agenda) {
    return new Promise((resolve, reject) => {
      Ventas.update({
        estado: 'Confirmada'
      }, {
        where: {
          id: id
        }
      })
        .then((data) => {
          Agenda.update({
            estado: 'Confirmada'
          }, {
            where: {
              id: id_agenda
            }
          })
            .then((data) => {
              let datas = JSON.stringify(data);
              resolve("Actualizada la venta con exito");
              ////console.log(id_usuario);
            })
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  VentabyId_realizada(id, billetera, userid, id_agenda) {
    return new Promise((resolve, reject) => {
      Ventas.update({
        estado: 'Realizada'
      }, {
        where: {
          id: id
        }
      })
        .then((data_venta) => {
          console.log(data_venta)
          Wallet.findAll({
            where: {
              usuarioId: userid
            }
          })
            .then((data) => {
              console.log(data[0].id)
              console.log("entro aqui")
              let disponible_actual = data[0].disponible;
              console.log(disponible_actual)
              if (disponible_actual == null) {
                disponible_actual = 0
              }
              let disponible_nuevo = parseFloat(disponible_actual) + parseFloat(billetera)
              console.log(disponible_nuevo)
              Wallet.update({
                disponible: disponible_nuevo
              }, {
                where: {
                  id: data[0].id
                }
              }).then((data_) => {
                Agenda.update({
                  estado: 'Realizada'
                }, {
                  where: {
                    id: id_agenda
                  }
                })
                  .then((data_agenda) => {
                    let datas = JSON.stringify(data_);
                    resolve(datas);
                  })

              })
            })
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  CancelarVenta(venta_id, tipo, id_agenda) {
    return new Promise((resolve, reject) => {
      Ventas.update({
        estado: 'Cancelada', cancelado: tipo,
      }, {
        where: {
          id: venta_id
        }
      })
        .then((data_venta) => {
          console.log(data_venta)
                Agenda.update({
                  estado: 'Cancelada'
                }, {
                  where: {
                    id: id_agenda
                  }
                })
                  .then((data_agenda) => {
                    let datas = JSON.stringify(data_agenda);
                    resolve(datas);
                  }).catch((err) => {
                   reject(err)
                  });             
        })
        .catch((err) => {
          reject(err)
        });
    });
  },

  //Compras
  VentasbyIdComprador(usuarioId) {
    return new Promise((resolve, reject) => {
      Ventas.findAll({
        where: {
          id_comprador: usuarioId
        }, include: [
          {
            association: Ventas.Publicaciones,
          },
          {
            association: Ventas.Agenda,
          },
        ], order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },


  //PAGOS
  guardar_pago_a(userid, id_ventas, id_publicaciones, monto, estado, observaciones, fecha_pago, photo) {
    return new Promise((resolve, reject) => {
      Pagos.create({
        monto: monto, estado: estado, comprobante: photo, fecha_de_pago: fecha_pago, observaciones: observaciones, id_publicaciones: id_publicaciones, id_ventas: id_ventas, usuarioId: userid
      }).then((data_venta) => {
        console.log(data_venta)
        Wallet.findAll({
          where: {
            usuarioId: userid
          }
        })
          .then((data) => {
            console.log(data[0].id)
            console.log(data_venta.id)
            let disponible_actual = data[0].disponible;
            console.log(disponible_actual)
            let nuevo_disponible = parseFloat(disponible_actual) - parseFloat(monto)
            console.log(nuevo_disponible)
            if (estado == "Pagado") {
              Wallet.update({
                disponible: nuevo_disponible.toFixed(2)
              }, {
                where: {
                  usuarioId: userid
                }
              }).then(() => {
                let array = id_ventas.split(',')
                for (let i = 0; i < array.length; i++) {
                  console.log(array[i])
                  Ventas.update({
                    wallet: estado
                  }, {
                    where: {
                      id: array[i]
                    }
                  })
                  if (i == array.length || i == array.length - 1) {
                    console.log("aqi")
                    resolve("datas");
                  }
                }
              })


            } else {
              Wallet.update({
                comprobante: monto
              }, {
                where: {
                  usuarioId: userid
                }
              }).then(() => {
                let array = id_ventas.split(',')
                for (let i = 0; i < array.length; i++) {
                  console.log(array[i] + "i")
                  Ventas.update({
                    wallet: estado
                  }, {
                    where: {
                      id: array[i]
                    }
                  })
                  if (i == array.length || i == array.length - 1) {
                    console.log("aqi")
                    resolve("datas");
                  }
                }
              })


            }
          })

      })
        .catch((err) => {
          console.log(err);
        })

    });
  },
  PagosAll() {
    return new Promise((resolve, reject) => {
      Pagos.findAll({
        include: [
          {
            association: Pagos.Usuarios,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  PagosbyId(id) {
    return new Promise((resolve, reject) => {
      Pagos.findAll({
        where: {
          id: id
        }, include: [
          {
            association: Pagos.Usuarios,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_pago_e(id_pago, id_ventas, userid, monto, estado, observaciones, fecha_pago, photo) {
    return new Promise((resolve, reject) => {
      Pagos.update({
        monto: monto, estado: estado, comprobante: photo, fecha_de_pago: fecha_pago, observaciones: observaciones
      }, {
        where: {
          id: id_pago
        }
      }).then((data_venta) => {
        console.log(data_venta)
        Wallet.findAll({
          where: {
            usuarioId: userid
          }
        })
          .then((data) => {
            console.log(data[0].id)
            console.log(data_venta.id)
            let disponible_actual = data[0].disponible;
            console.log(disponible_actual)
            let nuevo_disponible = parseFloat(disponible_actual) - parseFloat(monto)
            console.log(nuevo_disponible)
            if (estado == "Pagado") {
              Wallet.update({
                disponible: nuevo_disponible.toFixed(2)
              }, {
                where: {
                  usuarioId: userid
                }
              }).then(() => {
                let array = id_ventas.split(',')
                for (let i = 0; i < array.length; i++) {
                  console.log(array[i])
                  Ventas.update({
                    wallet: estado
                  }, {
                    where: {
                      id: array[i]
                    }
                  })
                  if (i == array.length || i == array.length - 1) {
                    console.log("aqi")
                    resolve("datas");
                  }
                }
              })


            } else {
              Wallet.update({
                comprobante: monto
              }, {
                where: {
                  usuarioId: userid
                }
              }).then(() => {
                let array = id_ventas.split(',')
                for (let i = 0; i < array.length; i++) {
                  console.log(array[i] + "i")
                  Ventas.update({
                    wallet: estado
                  }, {
                    where: {
                      id: array[i]
                    }
                  })
                  if (i == array.length || i == array.length - 1) {
                    console.log("aqi")
                    resolve("datas");
                  }
                }
              })


            }
          })

      })
        .catch((err) => {
          console.log(err);
        })

    });
  },
  PagosbyIdUser(id) {
    return new Promise((resolve, reject) => {
      Pagos.findAll({
        where: {
          usuarioId: id
        }, include: [
          {
            association: Pagos.Usuarios,
          },
        ],
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },

  //configuraciones
  configuraciones() {
    return new Promise((resolve, reject) => {
      Configuraciones.findAll({})
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  configuracionesAct() {
    return new Promise((resolve, reject) => {
      Configuraciones.findAll({
        where: {
          estado: 'Activa'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  configuracionDev() {
    return new Promise((resolve, reject) => {
      Configuraciones.findOne({attributes: ['valor'],
        where: {
          estado: 'Activa',
          nombre: 'Devolución'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  configuracionesbyId(id_ct) {
    return new Promise((resolve, reject) => {
      Configuraciones.findAll({
        where: {
          id: id_ct
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_configuraciones(userid, nombre, estado, valor) {
    return new Promise((resolve, reject) => {
      Configuraciones.create({
        nombre: nombre, estado: estado, valor: valor, usuarioId: userid
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  guardaredit_configuraciones(id_configuracion, configuracion, estado, valor, userid) {
    return new Promise((resolve, reject) => {
      Configuraciones.update({
        nombre: configuracion, estado: estado, valor: valor, usuarioId: userid
      }, {
        where: {
          id: id_configuracion
        }
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  conf_horas_reserva() {
    return new Promise((resolve, reject) => {
      Configuraciones.findOne({
        attributes: ['valor'],
        where: {
          estado: 'Activa',
          nombre: 'Horas_Reserva'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  conf_horas_cancelar() {
    return new Promise((resolve, reject) => {
      Configuraciones.findOne({
        attributes: ['valor'],
        where: {
          estado: 'Activa',
          nombre: 'Horas_Cancelar'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },

  //PUBLICIDAD
  Publicidad() {
    return new Promise((resolve, reject) => {
      Publicidad.findAll({})
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  PublicidadAct() {
    return new Promise((resolve, reject) => {
      Publicidad.findOne({
        where: {
          estado: 'Activa'
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  PublicidadActDestino(destino) {
    return new Promise((resolve, reject) => {
      Publicidad.findOne({
        where: {
          estado: 'Activa',
          destino: destino
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  publicidadbyId(id_ct) {
    return new Promise((resolve, reject) => {
      Publicidad.findAll({
        where: {
          id: id_ct
        }
      })
        .then((data) => {
          let datas = JSON.stringify(data);
          resolve(datas);
          ////console.log(id_usuario);
        })
        .catch((err) => {
          ////console.log(err);
        });
    });
  },
  guardar_publicidad(userid, nombre, estado, valor, destino) {
    return new Promise((resolve, reject) => {
      Publicidad.create({
        nombre: nombre, estado: estado, imagen: valor,destino:destino, usuarioId: userid
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  guardaredit_publicidad(id_configuracion, configuracion, estado, valor, userid,destino) {
    return new Promise((resolve, reject) => {
      Publicidad.update({
        nombre: configuracion, estado: estado, imagen: valor,destino:destino, usuarioId: userid
      }, {
        where: {
          id: id_configuracion
        }
      }).then((data_) => {
        let datas = JSON.stringify(data_);
        resolve(datas);

      })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  eliminar_publicidad(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Publicidad.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },

  // AYUDA
  obtenerAyuda() {
    return new Promise((resolve, reject) => {
      Ayuda.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let respuesta = JSON.stringify(res);
          resolve(respuesta);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  },
  saveAyuda(id_user, tipo, terminos, politicas_privacidad, id_tipo) {
    return new Promise((resolve, reject) => {
      Ayuda.findOne({
        where: {
          id: id_tipo,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Ayuda.create({
            id_usuario: id_user,
            tipo: tipo,
            terminos: terminos,
            politicas: politicas_privacidad,
          })
            .then((res) => {
              let respuesta = JSON.stringify(res);
              resolve(respuesta);
              ////console.log(respuesta);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Ayuda.update(
            {
              id_usuario: id_user,
              tipo: tipo,
              terminos: terminos,
              politicas: politicas_privacidad,
            },
            {
              where: {
                id: id_tipo,
              },
            }
          )
            .then((resp) => {
              let res = JSON.stringify(resp);
              resolve("0");
              // //console.log(res);
            })
            .catch((err) => {
              //console.log(err);
            });
        }
      });
    });
  },
  obtenerAyudaById(id) {
    return new Promise((resolve, reject) => {
      Ayuda.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  },

  deleteAyuda(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Ayuda.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      });
    });
  },


  //CUPONES
  totalcupones() {
    return new Promise((resolve, reject) => {
      Cupones.findAll()
        .then((res) => {
          let about = JSON.stringify(res);
          resolve(about);
          ////console.log(JSON.stringify(users));
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  guardarCupon(id_usuario,nombre_cupon,valor,fecha_inicio, fecha_final,cantidad,  tipo, especial) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Cupones.findOne({
        where: {
          nombre_cupon: nombre_cupon,
        },
      }).then((res) => {
        //console.log(res);
        if (!res) {
          // Item not found, create a new one
          Cupones.create({
            id_usuario: id_usuario,
            nombre_cupon: nombre_cupon,
            valor: valor,
            fecha_inicio: fecha_inicio,
            fecha_final: fecha_final,
            cantidad: cantidad,
            cantidad_actual: cantidad,
            tipo: tipo,especial:especial
          })
            .then((res) => {
              let about = JSON.stringify(res);
              resolve(about);

              //console.log(about);
            })
            .catch((err) => {
              //console.log(err);
              reject(err)
            });
        } else {
          resolve("0");
        }
      }).catch((err) => {
        //console.log(err);
        reject(err)
      });
    });
  },
  obtenerCuponforedit(id) {
    return new Promise((resolve, reject) => {
      Cupones.findAll({
        where: {
          id: id,
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  saveEditedCupon(
    id,
    nombre_cupon,
    valor,
    fecha_inicio,
    fecha_final,
    cantidad,
    tipo,especial
  ) {
    let now = new Date();
    fecha = now.toString();
    //console.log(fecha_inicio);
    //console.log(fecha_final);
    return new Promise((resolve, reject) => {
      Cupones.update(
        {
          nombre_cupon: nombre_cupon,
          valor: valor,
          fecha_inicio: fecha_inicio,
          fecha_final: fecha_final,
          cantidad: cantidad,
          cantidad_actual: cantidad,
          tipo: tipo,especial:especial
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  deleteCupon(parametro_buscar) {
    return new Promise((resolve, reject) => {
      Cupones.destroy({
        where: {
          id: parametro_buscar,
        },
      }).then(() => {
        //let gates= JSON.stringify(users)
        resolve("respuesta exitosa");
        ////console.log(JSON.stringify(users));
      }).catch((err) => {
        //console.log(err);
        reject(err)
      });
    });
  },
  consultarCupon(consultar) {
    return new Promise((resolve, reject) => {
      Cupones.findAll({
        where: {
          [Op.or]: [{ nombre_cupon: consultar }],
        },
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          //console.log(ress);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  UpdateUsedCupon(id, cantidad) {
    let now = new Date();
    fecha = now.toString();
    return new Promise((resolve, reject) => {
      Cupones.update(
        { cantidad_actual: cantidad },
        {
          where: {
            id: id,
          },
        }
      )
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  CuponUsado(id_usuario, nombre_cupon, valor, fecha_uso, usado_en, tipo, especial) {
    return new Promise((resolve, reject) => {
      Used_cupons.create({
        id_usuario: id_usuario,
        nombre_cupon: nombre_cupon,
        valor: valor,
        fecha_uso: fecha_uso,
        usado_en: usado_en,
        tipo: tipo,
        especial: especial
      })
        .then((about) => {
          let aboutes = JSON.stringify(about);
          resolve(aboutes);
          // //console.log(aboutes);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  obtenerCuponesUsados(id_usuario) {
    return new Promise((resolve, reject) => {
      Used_cupons.findAll({
        where: {
          id_usuario: id_usuario,
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          ////console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },
  consultarCuponesUsados(usuario_id, nombre_cupon) {
    return new Promise((resolve, reject) => {
      Used_cupons.findOne({
        where: {
          id_usuario: usuario_id,
          nombre_cupon: nombre_cupon,
          especial:'SI'
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["updatedAt", "DESC"],
        ],
      })
        .then((res) => {
          let ress = JSON.stringify(res);
          resolve(ress);
          ////console.log(id);
        })
        .catch((err) => {
          //console.log(err);
          reject(err)
        });
    });
  },

  //Calificaciones
  guardarCalificacion(id_usuario,valor, comentario, id_sucursal) {
        return new Promise((resolve, reject) => {      
          Calificaciones.create({
            valor: valor,
            comentario: comentario,
            usuarioId: id_usuario,
            sucursaleId: id_sucursal
          })
            .then((resp) => {
              let cal = JSON.stringify(resp);
              resolve(cal);
              //console.log(about);
            })
            .catch((err) => {
              console.log(err);
              reject(err)
            });
          });
  },
  obtenerCalificacion(id_sucursal) {
    return new Promise((resolve, reject) => {      
      Calificaciones.findAll({where:{
        sucursaleId: id_sucursal
      }
        
      })
        .then((resp) => {
          let cal = JSON.stringify(resp);
          resolve(cal);
          //console.log(about);
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        });
      });
},


};
