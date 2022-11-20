const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uniqid = require("uniqid");


class Load {
    static storage = multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync("files", { recursive: true });
            cb(null, "files");
        },
        filename: (req, file, cb) => {
            file.originalname = `${uniqid()}${uniqid()}${file.originalname}`;
            cb(null, file.originalname);
        }
    });
    
    static upload = multer({ storage: this.storage });

    static async deleteFile(filename) {
        fs.unlinkSync(path.join("files", `${filename}`), (err) => {
            if (err) throw err;
        });
    }

    static downloadFile(filename) {
        return path.join(`${__dirname.slice(0, __dirname.lastIndexOf("/"))}/files`, filename);
    }

}

module.exports = Load;