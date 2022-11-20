const FileService = require("../services/file.service");

class FileController {
    static async upload(req, res) {
        try {
            if (!req.file) {
                return res.status(400).send("Please attech file");
            }
            const result = await FileService.upload(req.file, req.user);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async getOneFile(req, res) {
        try {
            const result = await FileService.getOneFile(req.params.id);
            if (result === "File doesn't exist") {
                return res.status(400).send(result);
            }
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async findAll(req, res) {
        try {
            const size = req.query.list_size ? Number(req.query.list_size) : 10;
            const page = req.query.page ? Number(req.query.page) : 1;
            const result = await FileService.findAll(req.user.id, size, page);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async delete(req, res) {
        try {
            const result = await FileService.delete(req.params.id);
            if (result === "File doesn't exist") {
                return res.status(400).send(result);
            }
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async download(req, res) {
        try {
            const result = await FileService.download(req.params.id);
            if (result === "File doesn't exist") {
                return res.status(404).send("File doesn't exist");
            }
            res.download(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async update(req, res) {
        try {
            const result = await FileService.update(req.params.id, req.file);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FileController;
