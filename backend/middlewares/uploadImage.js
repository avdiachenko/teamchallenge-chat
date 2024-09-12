import multer from "multer";
import path from "path";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const uploadImage = multer({
    limits:800000,
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"upload/images")
        },
        filename:(req,file,cb)=>{
            let ext = path.extname(file.originalname);

            cb(null,`${makeid(16)}.${ext}`)
        }
    }),
    fileFilter:(req,file,cb)=>{
        const allowedFileType = ["jpg", "jpeg", "png"];
        if(allowedFileType.includes(file.mimetype.split("/")[1])){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }
})
module.exports = uploadImage;