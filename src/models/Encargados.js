const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Encargados = db.define('encargados', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},
	apellido: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El apellido es obligatorio'
			}
		}
	},
	correo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
});

// Métodos personalizados
module.exports = Encargados;

