
const imageModel = require('../../models/Items/Images');

module.exports = {

    getAll: function (req, res, next) {
        imageModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the Images", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        imageModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the Images", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        imageModel.findById(req.params.id, function (err, imageInfo) {
            if (!imageInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " image retrieved successfully!!!", data: imageInfo })
            }
        });
    },

    create: function (req, res, next) {
        imageModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        imageModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        imageModel.findById(req.params.id, function (err, imageInfo) {
            if (!imageInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                imageModel.findByIdAndUpdate(imageInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", Images: { Info } })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        imageModel.findById(req.params.id, function (err, imageInfo) {
            if (!imageInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                imageModel.deleteOne((imageInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", Images: { Info } })
                })
            }
        });
    },

    deleteAll: function (req, res, next) {
        try {
            imageModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					