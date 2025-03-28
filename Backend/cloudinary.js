const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = new multer.diskStorage({
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
});

cloudinary.config({
    cloud_name: "ddsekpuoj",
    api_key:"589424296895362",
    api_secret: "XVr3xdHbYMOlcP6EvYB-VaifJgU"
});

const upload = multer({storage})

module.exports = { upload }