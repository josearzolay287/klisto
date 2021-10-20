const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('../models/Usuarios')
const Calificaciones = db.define('calificaciones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	valor: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: 0
	},
	comentario: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});

Calificaciones.Usuarios= Calificaciones.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Calificaciones;

