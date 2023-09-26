
const videosModel = require('../../models/Items/Videos');

module.exports = {

    getAll: function (req, res, next) {
        videosModel.find({}).sort({ createdAt: -1 }).exec(function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "List of the videos", data: result });
            }
        });
    },

    searchByKeyWord: function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };

        videosModel.find(query).exec(function (err, data) {
            if (err) {
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            } else {
                res.json({ status: "success", message: "List of the videos", data: data });
            }
        });
    },

    getOne: function (req, res, next) {
        videosModel.findById(req.params.id, function (err, videoInfo) {
            if (!videoInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                res.json({ status: "success", message: " video retrieved successfully!!!", video: videoInfo })
            }
        });
    },

    create: function (req, res, next) {
        videosModel.create(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })

        });
    },

    CreateMany: function (req, res, next) {
        videosModel.insertMany(req.body, function (err, result) {
            if (err)
                res.status(400).send({ status: "error", message: err })
            else {
                console.log("goooood");
                res.status(200).send({ status: "success", message: "Document added successfully!!!", data: result })
            }
        });
    },

    updateById: function (req, res, next) {
        videosModel.findById(req.params.id, function (err, videoInfo) {
            if (!videoInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                videosModel.findByIdAndUpdate(videoInfo._id, (req.body), { new: true }, function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", videos: { Info } })
                })
            }
        });
    },

    deleteById: function (req, res, next) {
        videosModel.findById(req.params.id, function (err, videoInfo) {
            if (!videoInfo)
                res.json({ status: "Faild", message: "No data found", data: err }).status(400);
            else {
                videosModel.deleteOne((videoInfo), function (err, Info) {
                    if (err)
                        console.log(err);
                    else
                        res.json({ status: "success", message: " deleted successfully!!!", videos: { Info } })
                })
            }
        });
    },

    deleteAll: function (req, res, next) {
        try {
            videosModel.deleteMany({}).exec(function (err, result) {
                if (err) {
                    console.log(err);
                } else
                    res.status(200).send({ status: "success", message: "Document deleted successfully" })
            })
        } catch (error) {

        }
    },

}					