import complexServices from "../services/complexServices";

export const createComplex = async (req, res) => {
    if(!req.file){
        throw HttpError(400, "No image");
    }
    else{
      const complexID = complexServices.createComplex({
        images: req.file.filename,
        parking: req.body.parking,
        security: req.body.security,
        access_control: req.body.access_control,
        concierge: req.body.concierge,
        playground: req.body.playground,
        closed_area: req.body.closed_area,
        video_surveillance: req.body.video_surveillance,
        description: req.body.description,
        location: req.body.location
      })

      for (const building of req.body.buildings) {
        const buildingID = complexServices.createBuilding({
          residential_complex_id: complexID,
          address: building.address
        })
        for (const entrance of building.entrances) {
          for (
            let apartmentNum = entrance.apartment_min;
            apartmentNum <= entrance.apartment_max; 
            apartmentNum++
          ) {
              complexServices.createApartment({
                building_id: buildingID,
                entrance: entrance
              })            
          }
        }
      }

      res.status(201).send();
    }
};