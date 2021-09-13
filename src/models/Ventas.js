const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');
const Publicaciones = require('./Publicaciones');
const Agenda = require('./Agenda');

const Ventas = db.define('ventas', {
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
	id_comprador: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	wallet: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	costo_domicilio: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});
Ventas.Usuarios= Ventas.belongsTo(Usuarios);
Ventas.Publicaciones= Ventas.belongsTo(Publicaciones);
Ventas.Agenda= Ventas.belongsTo(Agenda);
// Métodos personalizados
module.exports = Ventas;

