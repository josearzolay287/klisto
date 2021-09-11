const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('./Usuarios');
const Publicaciones = require('./Publicaciones');
const Ventas = require('./Ventas');

const Wallet = db.define('wallet', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	saldo: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	estado: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	disponible: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	comprobante: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	
	
});
Wallet.Usuarios= Wallet.belongsTo(Usuarios);
Wallet.Publicaciones= Wallet.belongsTo(Publicaciones);
Wallet.Ventas= Wallet.belongsTo(Ventas);
// Métodos personalizados
module.exports = Wallet;

