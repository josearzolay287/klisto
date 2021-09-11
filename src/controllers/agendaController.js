const Modulo_BD = require("../models/modulos_");

exports.revisar_fecha_agenda = (req, res) => {
 // console.log(req)
  var fecha_a = req.body.fecha;
   Modulo_BD.Agendabyfecha(fecha_a).then((data) =>{
    let fechas = JSON.parse(data)
    console.log(fechas)

    return res.status(200).send({ fechas:fechas });
})
 };
