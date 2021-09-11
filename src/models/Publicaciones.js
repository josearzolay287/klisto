const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');

const Publicaciones = db.define('publicaciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	titulo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	precio: {
		type: DataTypes.INTEGER,
		allowNull: true,

	},
	categoria: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	fotos: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	horario_desde: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	horario_hasta: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	condiciones: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	billetera: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	sucursales: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	empleados: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	preparacion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	ejecucion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});
Publicaciones.Usuarios= Publicaciones.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Publicaciones;

