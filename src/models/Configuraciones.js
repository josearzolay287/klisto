const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');

const Configuraciones = db.define('configuraciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	
	valor: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});

Configuraciones.Usuarios= Configuraciones.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Configuraciones;

