const File = require("../models/files");
const FileDto = require("../dto//file.dto");
const Load = require("../db/load");

class FileService {
  static async upload(file, user) {
    const newFile = await File.build(
      new FileDto(
        file.filename,
        file.filename.slice(
          file.filename.lastIndexOf(".") + 1,
          file.filename.length
        ),
        file.mimetype,
        file.size,
        user.id,
        new Date()
      )
    );
    await newFile.save();
    return "Seccessfully uploaded";
  }

  static async getOneFile(id) {
    const file = await File.findByPk(id);
    if (!file) {
      return "File dosen't exist";
    }
    return file;
  }

  static async findAll(id, size, page) {
    let file = await File.findAll({ where: { userId: id } });
    file = file.slice(size*(page-1), size*page)
    if (!file) {
      return "Files dosen't exist";
    }
    return file;
  }

  static async delete(id) {
    const file = await File.findByPk(id);
    if (!file) {
      return "File dosen't exist";
    }
    await File.destroy({ where: { id } });
    await Load.deleteFile(file.filename);
    return "File deleted";
  }

  static async download(id) {
    const file = await File.findByPk(id);
    if (!file) {
      return "File dosen't exist";
    }
    const localFile = await Load.downloadFile(file.filename);
    return localFile;
  }

  static async update(id, file) {
    const currentFile = await File.findByPk(id);
    await Load.deleteFile(currentFile.filename);
    await File.update(
      {
        filename: file.filename,
        extension: file.filename.slice(
          file.filename.lastIndexOf(".") + 1,
          file.filename.length
        ),
        type: file.mimetype,
        size: file.size,
        uploadDate: new Date(),
      },
      { where: { id } }
    );
    return "Seccessfully updated";
  }
}

module.exports = FileService;
