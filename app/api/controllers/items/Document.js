
const documentModel = require('../../models/Items/Documents');

module.exports = {

    getAll: function (req, res, next) {
        documentModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the documents", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        documentModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the documents", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        documentModel.findById(req.params.id, function (err, documentInfo) {
            if (!documentInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " document retrieved successfully!!!", document: documentInfo })
            }
        });
    },

    create: function (req, res, next) {
        documentModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        documentModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        documentModel.findById(req.params.id, function (err, documentInfo) {
            if (!documentInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                documentModel.findByIdAndUpdate(documentInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", documents: { Info } })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        documentModel.findById(req.params.id, function (err, documentInfo) {
            if (!documentInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                documentModel.deleteOne((documentInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", documents: { Info } })
                })
            }
        });
    },

    deleteAll: function (req, res, next) {
        try {
            documentModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					