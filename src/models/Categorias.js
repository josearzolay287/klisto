const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');

const Categorias = db.define('categorias', {
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
	
});

Categorias.Usuarios= Categorias.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Categorias;

