const File = require("../models/files");
const FileDto = require("../dto//file.dto");
const Load = require("../db/load");

class FileService {
    static async upload (file) {
        const newFile = await File.build(new FileDto(file.filename, file.filename.slice(file.filename.lastIndexOf(".") + 1, file.filename.length), file.mimetype, file.size, new Date()));
        await newFile.save();
        return "Seccessfully uploaded";
    }

    static async getOneFile(id) {
        const file = await File.findByPk(id);
        if(!file){
            return "File dosen't exist";
        }
        return file;
    }

    static async delete(id) {
        const file = await File.findByPk(id);
        if(!file){
            return "File dosen't exist";
        }
        await File.destroy({where: { id }});
        await Load.deleteFile(file.filename);
        return "File deleted";
    }

    static async download(id) {
        const file = await File.findByPk(id);
        if(!file){
            return "File dosen't exist";
        }
        const localFile = await Load.downloadFile(file.filename);
        return localFile;
    }
}

module.exports = FileService;