const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Cupones = db.define('cupones', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El id_usuario es obligatorio'
			}
		}
	},
	nombre_cupon: {
		type: DataTypes.TEXT,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
	},

	valor: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_inicio: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	fecha_final: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cantidad: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	cantidad_actual: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	especial: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	
	
});

// Métodos personalizados
module.exports = Cupones;

