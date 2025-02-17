const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	create: async function (req, res, next) {
		try {
			await userModel.create(req.body);
			res.json({ status: "success", message: "User added successfully!!!", data: null });
		} catch (error) {
			next(error)
		}
	},

	authenticate: async function (req, res, next) {
		try {
			const userInfo = await userModel.findOne({ email: req.body.email });
	
			if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
				const token = jwt.sign({ _id: userInfo._id }, process.env.TOKEN_SECRET);
				res.status(200).send({ 
					status: "success", 
					message: "User found!!!", 
					data: { user: userInfo, token: token } 
				});
			} else {
				res.status(400).send({ 
					status: "error", 
					message: "Invalid email/password!!!", 
					data: null 
				});
			}
		} catch (err) {
			next(err);
		}
	},
	

}					
