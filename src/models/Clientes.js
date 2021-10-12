const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');
const Encargados = require('./Encargados');

const Clientes = db.define('clientes', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	tipo: {
		type: DataTypes.STRING(90),
		allowNull: true,
	},
	direccion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	distrito: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	departamento: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
	
});
// El trabajador pertenece a una oficina
Clientes.Usuarios= Clientes.belongsTo(Usuarios);
// Métodos personalizados
module.exports = Clientes;

