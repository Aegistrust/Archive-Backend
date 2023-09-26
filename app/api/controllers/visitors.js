
const visitorsModel = require('../models/visitors');

module.exports = {
	getById: function (req, res, next) {
		visitorsModel.findById(req.params.visitorId, function (err, visitorInfo) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "visitor found!!!", data: { visitors: visitorInfo } });
			}
		});
	},

	getAll: function (req, res, next) {
		let visitorsList = [];

		visitorsModel.find({}).sort({ createdAt: -1 }).exec(function (err, visitors) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "visitors list found!!!", data: { data: visitors } });
			}

		});
	},

	searchByPlateAndName: function (req, res, next) {
		console.log(req.params.search);
		visitorsModel.find({ $or: [{ "firstName": { '$regex': req.params.search, '$options': 'i' } }, { "lastName": { '$regex': req.params.search, '$options': 'i' } }, { "plateNumber": { '$regex': req.params.search, '$options': 'i' } }] }).sort({ createdAt: -1 }).exec(function (err, visitors) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "visitors list found!!!", data: { data: visitors } });
			}
		});
	},

	getByCheckIn: function (req, res, next) {
		const cond = { exitTime: null }
		visitorsModel.find(cond, function (err, visitors) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "Check-in Visitors", data: { data: visitors } });
			}

		});
	},

	searchCheckedInByPlateAndName: function (req, res, next) {
		const cond = { $and: [{ exitTime: null }, { $or: [{ "firstName": { '$regex': req.params.search, '$options': 'i' } }, { "lastName": { '$regex': req.params.search, '$options': 'i' } }, { "plateNumber": { '$regex': req.params.search, '$options': 'i' } }] }] }
		visitorsModel.find(cond, function (err, visitors) {
			if (err) {
				next(err);
			} else {
				res.json({ status: "success", message: "Check-in Visitors", data: { data: visitors } });
			}

		});
	},

	updateById: function (req, res, next) {
		visitorsModel.findByIdAndUpdate(req.params.visitorId, { id: req.body.id }, function (err, visitorInfo) {

			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "visitor updated successfully!!!", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		visitorsModel.findByIdAndRemove(req.params.visitorId, function (err, visitorInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "visitor deleted successfully!!!", data: null });
			}
		});
	},

	create: function (req, res, next) {
		visitorsModel.create(req.body, function (err, result) {
			if (err)
				res.status(400).send({ status: "error", message: err })
			else
				res.status(200).send({ status: "success", message: "visitor added successfully!!!", data: result })

		});
	},

	updateExit: function (req, res, next) {
		visitorsModel.findByIdAndUpdate(req.params.updateExit, { exitTime: Date.now() }, { new: true }, function (err, visitorInfo) {
			if (err)
				next(err);
			else {
				res.json({ status: "success", message: "Exit time updated successfully!!!", data: visitorInfo });

			}
		});
		console.log(req.params.updateExit);
	},

}					