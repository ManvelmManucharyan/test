const FileService = require("../services/file.service");

class FileController {
  static async upload(req, res) {
    try {
        const result = await FileService.upload(req.file);
        res.send(result)
    } catch (error) {
      console.log(error);
    }
  }

  static async getOneFile(req, res) {
    try {
        const result = await FileService.getOneFile(req.params.id);
        res.send(result)
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    try {
        const result = await FileService.delete(req.params.id);
        res.send(result)
    } catch (error) {
      console.log(error);
    }
  }

  static async download(req, res) {
    try {
        const result = await FileService.download(req.params.id);
        res.download(result)
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = FileController;
