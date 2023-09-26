
const guestsModel = require('../models/guests');

module.exports = {

    getAll: function (req, res, next) {
        guestsModel.find({}).sort({ createdAt: -1 }).exec(function (err, guests) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "guests list found!!!", data: { data: guests } });
            }

        });
    }, 

    create: function (req, res, next) {
        guestsModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "guest added successfully!!!", data: result })

        });
    },

    updateById: function (req, res, next) {
        guestsModel.findById(req.params.id, function (err, guestInfo) {
            if (!guestInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                guestsModel.findByIdAndUpdate(guestInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", guests: { Info } })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        guestsModel.findById(req.params.id, function (err, guestInfo) {
            if (!guestInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                guestsModel.deleteOne((guestInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", guests: { Info } })
                })
            }
        });
    },

}					