const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Used_cupons = db.define('used_cupons', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_usuario: {
		type: DataTypes.INTEGER,
		allowNull: true,
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
	
	fecha_uso: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	usado_en: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
	tipo: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: ""
	},
});




module.exports = Used_cupons;

