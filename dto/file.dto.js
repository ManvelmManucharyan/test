class User {
    filename;
    extension;
    type;
    size;
    uploadDate;

    constructor(filename, extension, type, size, uploadDate){
        this.filename = filename;
        this.extension = extension;
        this.type = type;
        this.size = size;
        this.uploadDate = uploadDate;
    }
}

module.exports = User