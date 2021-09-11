const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');

const Publicidad = db.define('Publicidad', {
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
	imagen: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
});

Publicidad.Usuarios= Publicidad.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Publicidad;

