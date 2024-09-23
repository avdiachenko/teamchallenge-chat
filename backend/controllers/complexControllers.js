import * as complexServices from "../services/complexServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

async function createComplex(req, res) {
    if(req.files.length == 0){
        throw HttpError(400, "No images");
    } else {
      let images = "";
      for (const file of req.files) {
        images += file.filename + " ";
      }
      let entrancesCount = 0;
      for (const building of req.body.buildings) {
        entrancesCount += building.entrances.length;
      }
      const complexID = await complexServices.createComplex({
        images: images,
        name: req.body.name,
        parking: req.body.parking,
        security: req.body.security,
        access_control: req.body.access_control,
        concierge: req.body.concierge,
        playground: req.body.playground,
        closed_area: req.body.closed_area,
        video_surveillance: req.body.video_surveillance,
        floors: req.body.floors,
        entrances: entrancesCount,
        description: req.body.description,
        location: req.body.location
      })

      for (const building of req.body.buildings) {
        const buildingID = await complexServices.createBuilding({
          residential_complex_id: complexID,
          address: building.address
        })
        for (const entrance of building.entrances) {
          for (
            let apartmentNum = entrance.apartment_min;
            apartmentNum <= entrance.apartment_max; 
            apartmentNum++
          ) {
              /*await*/ complexServices.createApartment({
                building_id: buildingID,
                number: apartmentNum,
                entrance: entrance.number
              })            
          }
        }
      }

      res.status(201).send();
    }
};

async function getAllComplexes(req, res) {
  const complexes = await complexServices.getAllComplexes();
  res.json(complexes);
};

async function deleteAllComplexes(req, res) {
  await complexServices.deleteAllComplexes();
  res.send();
}

export default {
  createComplex: ctrlWrapper(createComplex),
  getAllComplexes: ctrlWrapper(getAllComplexes),
  deleteAllComplexes: ctrlWrapper(deleteAllComplexes),
};