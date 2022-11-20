class User {
    filename;
    extension;
    type;
    size;
    userId;
    uploadDate;

    constructor(filename, extension, type, size, userId, uploadDate){
        this.filename = filename;
        this.extension = extension;
        this.type = type;
        this.size = size;
        this.userId = userId;
        this.uploadDate = uploadDate;
    }
}

module.exports = User