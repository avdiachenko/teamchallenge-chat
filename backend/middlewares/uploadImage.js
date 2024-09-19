import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadToCloudinary } from "../services/cloudinary.js";

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

const uploadImageToTmp = multer({
    limits:800000,
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"tmp")
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

const uploadImagesToCloudinary = async (req, res, next) => {
    if(req.files.length == 0){
        throw HttpError(400, "No images");
    } else {
        try {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const url = await uploadToCloudinary(file.destination, file.filename);
                
                fs.unlink(file.path, (err) => {
                    if (err) throw err;
                    console.log('image was deleted');
                }); 
                file.filename = file.path = url;
                file.destination = "";
            }
        } catch (error) {
            console.log("While uploading image ", error);
        }
    }
    next()
}

export default {
    uploadImagesToTmp: uploadImageToTmp,
    uploadImageToCloudinary: uploadImagesToCloudinary
};