const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');

const Ayuda = db.define('ayuda', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,

	},
	terminos: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	politicas: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	preguntas: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	respuestas: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
	
});


Ayuda.Usuarios= Ayuda.belongsTo(Usuarios);

// Métodos personalizados
module.exports = Ayuda;

