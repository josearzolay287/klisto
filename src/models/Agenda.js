const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');
const Publicaciones = require('./Publicaciones');
const Encargados = require('./encargados');

const Agenda = db.define('Agenda', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	fecha_agenda: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	hora_cita_desde: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	hora_cita_hasta: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	lugar_servicio: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	nombre_del_tercero: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono_tercero: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	direccion_tercero: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	lugar_serv_propio: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	telefono_contacto: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	direccion_propio_otra: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
});
Agenda.Usuarios= Agenda.belongsTo(Usuarios);
Agenda.Publicaciones= Agenda.belongsTo(Publicaciones);
Agenda.Encargados= Agenda.belongsTo(Encargados);
// Métodos personalizados
module.exports = Agenda;

