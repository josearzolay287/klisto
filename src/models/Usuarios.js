const { DataTypes } = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userName: {
		type: DataTypes.STRING(60),
	},
	photo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(60),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING(60),
		allowNull: false,
	},
	lastName: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	tipo: {
		type: DataTypes.STRING(90),
		allowNull: true,
	},
	direccion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	token: {
		type: DataTypes.STRING
	},
	expiration: {
		type: DataTypes.DATE
	},
	telefono: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	banco: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	cuenta: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	pass_admin: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
			usuario.pass_admin = bcrypt.hashSync(usuario.pass_admin, bcrypt.genSaltSync(10));
			usuario.userName = '@' + usuario.email.split('@')[0];
		}
	}
});

// Métodos personalizados
Usuarios.prototype.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = Usuarios;

