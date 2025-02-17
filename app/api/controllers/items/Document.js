const documentModel = require('../../models/Items/Documents');

function groupBy(array, key) {
    const result = {};
    for (const item of array) {
        if (!item.partner?.[key]) {
            console.log("No data found");
            continue;
        }
        const groupKey = item.partner[key];

        if (!result[groupKey]) {
            result[groupKey] = 0;
        }

        result[groupKey]++;
    }
    return result;
}

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await documentModel.find({}).sort({ createdAt: -1 });
            const info = groupBy(result, "type");
            res.json({ status: "success", message: "List of the documents", data: result });
        } catch (err) {
            next(err);
        }
    },

    getData: async function (req, res, next) {
        try {
            const result = await documentModel.find({}).sort({ createdAt: -1 });
            res.json({ status: "success", message: "List of the documents", data: result });
        } catch (err) {
            next(err);
        }
    },

    searchByKeyWord: async function (req, res, next) {
        try {
            const searchFields = ['title', 'author', 'type', 'description', 'provenance'];
            const query = {
                $or: searchFields.map(field => ({ [field]: { $regex: req.params.keyWord, $options: 'i' } }))
            };
            const data = await documentModel.find(query);
            if (data.length === 0) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "List of the documents", data });
        } catch (err) {
            next(err);
        }
    },

    getOne: async function (req, res, next) {
        try {
            const documentInfo = await documentModel.findById(req.params.id);
            if (!documentInfo) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Document retrieved successfully", data: documentInfo });
        } catch (err) {
            next(err);
        }
    },

    create: async function (req, res, next) {
        try {
            const result = await documentModel.create(req.body);
            res.status(200).json({ status: "success", message: "Document added successfully", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    createMany: async function (req, res, next) {
        try {
            const result = await documentModel.insertMany(req.body);
            res.status(200).json({ status: "success", message: "Documents added successfully", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    },

    updateById: async function (req, res, next) {
        try {
            const updatedDoc = await documentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedDoc) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Updated successfully", data: updatedDoc });
        } catch (err) {
            next(err);
        }
    },

    deleteById: async function (req, res, next) {
        try {
            const deletedDoc = await documentModel.findByIdAndDelete(req.params.id);
            if (!deletedDoc) {
                return res.status(400).json({ status: "Failed", message: "No data found" });
            }
            res.json({ status: "success", message: "Deleted successfully", data: deletedDoc });
        } catch (err) {
            next(err);
        }
    },

    deleteAll: async function (req, res, next) {
        try {
            await documentModel.deleteMany({});
            res.status(200).json({ status: "success", message: "All documents deleted successfully" });
        } catch (err) {
            next(err);
        }
    }
};
