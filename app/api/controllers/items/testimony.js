
const testimonyModel = require('../../models/Items/Testimony');

module.exports = {

    getAll: function (req, res, next) {
        testimonyModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the testimonys", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        testimonyModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the testimonys", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        testimonyModel.findById(req.params.id, function (err, testimonyInfo) {
            if (!testimonyInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " testimony retrieved successfully!!!", data: testimonyInfo })
            }
        });
    },

    create: function (req, res, next) {
        testimonyModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        testimonyModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        testimonyModel.findById(req.params.id, function (err, testimonyInfo) {
            if (!testimonyInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                testimonyModel.findByIdAndUpdate(testimonyInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", data: Info })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        testimonyModel.findById(req.params.id, function (err, testimonyInfo) {
            if (!testimonyInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                testimonyModel.deleteOne((testimonyInfo), function (err, Info) {
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
            testimonyModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					