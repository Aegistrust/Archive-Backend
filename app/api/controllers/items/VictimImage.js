
const victimModel = require('../../models/Items/victimImages');

module.exports = {

    getAll: function (req, res, next) {
        victimModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the victims", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        victimModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the victims", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        victimModel.findById(req.params.id, function (err, victimInfo) {
            if (!victimInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " Victim retrieved successfully!!!", data: victimInfo })
            }
        });
    },

    create: function (req, res, next) {
        victimModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        victimModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        victimModel.findById(req.params.id, function (err, victimInfo) {
            if (!victimInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                victimModel.findByIdAndUpdate(victimInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", data: Info })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        victimModel.findById(req.params.id, function (err, victimInfo) {
            if (!victimInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                victimModel.deleteOne((victimInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", data: Info })
                })
            }
        });
    },

    deleteAll: function (req, res, next) {
        try {
            victimModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					