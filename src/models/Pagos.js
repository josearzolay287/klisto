const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');
const Publicaciones = require('./Publicaciones');

const Pagos = db.define('Pagos', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	monto: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	comprobante: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	fecha_de_pago: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	observaciones: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	id_publicaciones: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	id_ventas: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
});
Pagos.Usuarios= Pagos.belongsTo(Usuarios);
//Pagos.Publicaciones= Pagos.belongsTo(Publicaciones);
// Métodos personalizados
module.exports = Pagos;

