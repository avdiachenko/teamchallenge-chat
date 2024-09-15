import express from "express";
import { createComplexSchema } from "../schemas/complexSchemas.js";
import validateBody from "../decorators/validateBody.js";
import complexControllers from "../controllers/complexControllers.js"
const { createComplex, getAllComplexes, deleteAllComplexes } = complexControllers;
import uploadImage from "../middlewares/uploadImage.js"

const complexRouter = express.Router();

const log = (req, res, next) => {
    console.log(req.files, req.body);
    next();
}
const buildingsToJSON = (req, res, next) => {
    req.body.buildings = JSON.parse(req.body.buildings);
    if (!Array.isArray(req.body.buildings)) {
        console.log(typeof req.body.buildings);
        
        req.body.buildings = [req.body.buildings];
    }
    next();
}   

// TODO lock behind auth
complexRouter.post("/residential_complex", uploadImage.any("images"), buildingsToJSON, log, validateBody(createComplexSchema), createComplex);
complexRouter.get("/residential_complex", getAllComplexes);
complexRouter.get("/delete_residential_complex", deleteAllComplexes);

export default complexRouter;