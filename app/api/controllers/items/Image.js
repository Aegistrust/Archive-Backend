const imageModel = require('../../models/Items/Images');

module.exports = {

    getAll: async function (req, res, next) {
        try {
            const result = await imageModel.find({}).sort({ createdAt: -1 });
            res.json({ status: "success", message: "List of the Images", data: result });
        } catch (err) {
            next(err);
        }
    },

    searchByKeyWord: async function (req, res, next) {
        try {
            const searchFields = ['title', 'author', 'type', 'description', 'provenance'];
            const query = {
                $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
            };
            const data = await imageModel.find(query);
            res.json({ status: "success", message: "List of the Images", data });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "No data found", data: err });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const imageInfo = await imageModel.findById(req.params.id);
            if (!imageInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Image retrieved successfully!", data: imageInfo });
        } catch (err) {
            next(err);
        }
    },

    create: async function (req, res, next) {
        try {
            const result = await imageModel.create(req.body);
            res.status(200).json({ status: "success", message: "Image added successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    CreateMany: async function (req, res, next) {
        try {
            const result = await imageModel.insertMany(req.body);
            res.status(200).json({ status: "success", message: "Images added successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    updateById: async function (req, res, next) {
        try {
            const updatedImage = await imageModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedImage) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Image updated successfully!", data: updatedImage });
        } catch (err) {
            next(err);
        }
    },

    deleteById: async function (req, res, next) {
        try {
            const deletedImage = await imageModel.findByIdAndDelete(req.params.id);
            if (!deletedImage) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Image deleted successfully!" });
        } catch (err) {
            next(err);
        }
    },

    deleteAll: async function (req, res, next) {
        try {
            await imageModel.deleteMany({});
            res.status(200).json({ status: "success", message: "All images deleted successfully!" });
        } catch (err) {
            next(err);
        }
    }
};
