
const audioModel = require('../../models/Items/Audios');

module.exports = {

    getAll: async function (req, res, next) {
        try {
            const result = await audioModel.find({}).sort({ createdAt: -1 }).exec();
            res.json({ status: "success", message: "List of the audios", data: result });
        } catch (err) {
            next(err);
        }
    },

    searchByKeyWord: async function (req, res, next) {
        const searchFields = ['title', 'author', 'type', 'description', 'provenance'];

        const query = {
            $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
        };
        try {
            const data = await audioModel.find(query).exec();
            if (data.length === 0) {
                return res.status(400).json({ status: "Failed", message: "No data found", data: null });
            }
            res.json({ status: "success", message: "List of the audios", data: data });
        } catch (err) {
            res.status(500).json({ status: "Error", message: "Internal Server Error", data: err });
        }

    },

    getOne: async function (req, res, next) {
        try {
            const audioInfo = await audioModel.findById(req.params.id);
            if (!audioInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found", data: null });
            }
            res.json({ status: "success", message: "Audio retrieved successfully!!!", data: audioInfo });
        } catch (err) {
            next(err);
        }
    },

    create: async function (req, res, next) {
        try {
            const result = await audioModel.create(req.body);
            res.status(201).json({ status: "success", message: "Document added successfully!!!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    createMany: async function (req, res, next) {
        try {
            const result = await audioModel.insertMany(req.body);
            res.status(201).json({ status: "success", message: "Documents added successfully!!!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    updateById: async function (req, res, next) {
        try {
            const updatedAudio = await audioModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedAudio) {
                return res.status(400).json({ status: "Failed", message: "No data found", data: null });
            }
            res.json({ status: "success", message: "Updated successfully!!!", data: updatedAudio });
        } catch (err) {
            next(err);
        }
    },

    deleteById: async function (req, res, next) {
        try {
            const deletedAudio = await audioModel.findByIdAndDelete(req.params.id);
            if (!deletedAudio) {
                return res.status(400).json({ status: "Failed", message: "No data found", data: null });
            }
            res.json({ status: "success", message: "Deleted successfully!!!", data: deletedAudio });
        } catch (err) {
            next(err);
        }
    },

    deleteAll: async function (req, res, next) {
        try {
            await audioModel.deleteMany({});
            res.status(200).json({ status: "success", message: "All documents deleted successfully" });
        } catch (err) {
            next(err);
        }
    }
}	
				