const videosModel = require('../../models/Items/Videos');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const result = await videosModel.find({}).sort({ createdAt: -1 });
            res.json({ status: "success", message: "List of the testimonies", data: result });
        } catch (err) {
            next(err);
        }
    },

    searchByKeyWord: async (req, res) => {
        try {
            const searchFields = ['title', 'author', 'type', 'description', 'provenance'];
            const query = {
                $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } })),
            };
            const data = await videosModel.find(query);
            res.json({ status: "success", message: "List of the testimonies", data });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "No data found", error: err });
        }
    },

    getOne: async (req, res) => {
        try {
            const testimonyInfo = await videosModel.findById(req.params.id);
            if (!testimonyInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Testimony retrieved successfully", data: testimonyInfo });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "Error retrieving testimony", error: err });
        }
    },

    create: async (req, res) => {
        try {
            const result = await videosModel.create(req.body);
            res.status(200).json({ status: "success", message: "Testimony added successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    createMany: async (req, res) => {
        try {
            const result = await videosModel.insertMany(req.body);
            res.status(200).json({ status: "success", message: "Testimonies added successfully!", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    updateById: async (req, res) => {
        try {
            const updatedInfo = await videosModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Updated successfully!", data: updatedInfo });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "Error updating testimony", error: err });
        }
    },

    deleteById: async (req, res) => {
        try {
            const deletedInfo = await videosModel.findByIdAndDelete(req.params.id);
            if (!deletedInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Deleted successfully!", data: deletedInfo });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "Error deleting testimony", error: err });
        }
    },

    deleteAll: async (req, res) => {
        try {
            await videosModel.deleteMany({});
            res.status(200).json({ status: "success", message: "All testimonies deleted successfully!" });
        } catch (err) {
            res.status(400).json({ status: "Failed", message: "Error deleting testimonies", error: err });
        }
    },
};
