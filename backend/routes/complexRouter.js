import express from "express";
import { createComplexSchema } from "../schemas/complexSchemas.js";
import validateBody from "../decorators/validateBody.js";
import { createComplex } from "../controllers/complexControllers.js"

const complexRouter = express.Router();

complexRouter.post("/residential_complex", validateBody(createComplexSchema), createComplex);

export default complexRouter;