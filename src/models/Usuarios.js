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
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	photo: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Agrega un correo válido'
			},
			notEmpty: {
				msg: 'El email es obligatorio'
			}
		},
		unique: {
			args: true,
			msg: 'Usuario ya registrado'
		}
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña es obligatoria'
			}
		}
	},
	name: {
		type: DataTypes.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'El nombre es obligatorio'
			}
		}
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
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
			usuario.userName = '@' + usuario.email.split('@')[0];
		}
	}
});

// Métodos personalizados
Usuarios.prototype.verifyPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = Usuarios;

