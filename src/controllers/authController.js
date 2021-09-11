// Comprobar si el usuario esta logueado
exports.authenticatedUser = (req, res, next) => {

	// Autenticado
	if(req.isAuthenticated()) {
		return next();
	}

	// Si no esta autenticado
	return res.redirect('/login');

}