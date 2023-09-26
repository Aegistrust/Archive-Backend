
const audioModel = require('../../models/Items/Audios');

module.exports = {

    getAll: function (req, res, next) {
        audioModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the audios", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        audioModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the audios", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        audioModel.findById(req.params.id, function (err, audioInfo) {
            if (!audioInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " audio retrieved successfully!!!", audio: audioInfo })
            }
        });
    },

    create: function (req, res, next) {
        audioModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        audioModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        audioModel.findById(req.params.id, function (err, audioInfo) {
            if (!audioInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                audioModel.findByIdAndUpdate(audioInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", data: Info })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        audioModel.findById(req.params.id, function (err, audioInfo) {
            if (!audioInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                audioModel.deleteOne((audioInfo), function (err, Info) {
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
            audioModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					