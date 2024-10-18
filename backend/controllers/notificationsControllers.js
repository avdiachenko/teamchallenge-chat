import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  getApartment,
  getBuilding,
  getComplex,
} from "../services/complexServices.js";
import {
  addNotification,
  listNotificationsByFilter,
} from "../services/notificationsServices.js";

const createNotification = async (req, res) => {
  const user = req.user;
  let complex;
  const { residential_complex: complexAdmin } = req.query;
  const { residential_complex: complexModerator } = user;
  const { text, type, section } = req.body;
  if (complexAdmin) {
    complex = complexAdmin;
  } else {
    complex = complexModerator;
  }
  let building_id;

  if (user.role !== "moderator" && user.role !== "administrator") {
    throw HttpError(403, "You don't have access to this action!");
  }
  if (section) {
    const adress = section.toLowerCase();
    const [{ _id: residential_complex_id }] = await getComplex({
      name: complex,
    });

    const [{ _id }] = await getBuilding({
      residential_complex_id,
      address: adress,
    });

    building_id = _id;
  }

  const result = section
    ? await addNotification({
        text,
        type,
        residential_complex: complex,
        building_id,
      })
    : await addNotification({ text, type, residential_complex: complex });
  res.status(201).json(result);
};

const getNotifications = async (req, res) => {
  console.log(req.query);
  const user = req.user;
  console.log(user.role);
  if (user.role === "not_verified") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const { residential_complex: complexModerator, apartment_id, role } = user;
  // const { page = 1, limit = 20, type = "", building = false } = req.query;
  const {
    page = 1,
    limit = 20,
    type = "",
    section = "",
    residential_complex: complexAdmin,
  } = req.query;
  const skip = (page - 1) * limit;
  let complex = complexAdmin ? complexAdmin : complexModerator;
  // let _id;
  let id;
  if (section && role === "verified") {
    const addressfromQuery = section.toLowerCase();
    const [{ building_id: _id }] = await getApartment(apartment_id);
    console.log(_id);
    // _id = building_id;
    const [{ address }] = await getBuilding({ _id });
    console.log(address);
    if (addressfromQuery !== address) {
      throw HttpError(
        403,
        "You don't have access to this action! Please choose your section"
      );
    } else {
      id = _id;
    }
  } else if (section && role === "moderator") {
    const addressfromQuery = section.toLowerCase();
    const [{ _id: residential_complex_id }] = await getComplex({
      name: complexModerator,
    });

    const [{ _id }] = await getBuilding({
      residential_complex_id,
      address: addressfromQuery,
    });
    id = _id;
  }
  // if (building) {
  //   const [{ building_id }] = await getApartment(apartment_id);
  //   _id = building_id;
  // }

  const result = section
    ? type
      ? await listNotificationsByFilter(
          { residential_complex: complex, type, building_id: id },
          { skip, limit }
        )
      : await listNotificationsByFilter(
          { residential_complex: complex, building_id: id },
          { skip, limit }
        )
    : type
    ? await listNotificationsByFilter(
        { residential_complex: complex, type, building_id: { $exists: false } },
        { skip, limit }
      )
    : await listNotificationsByFilter(
        { residential_complex: complex, building_id: { $exists: false } },
        { skip, limit }
      );

  res.json(result);
};

const getNotificationsByRole = async (req, res) => {
  const user = req.user;
  const { residential_complex, role } = user;
  const { page = 1, limit = 20, type = "", section = "" } = req.query;
  const skip = (page - 1) * limit;
  if (role !== "moderator" && role !== "administrator") {
    throw HttpError(403, "You don't have access to this action!");
  }
  let id;
  if (section) {
    const adress = section.toLowerCase();

    const [{ _id: residential_complex_id }] = await getComplex({
      name: residential_complex,
    });

    const [{ _id }] = await getBuilding({
      residential_complex_id,
      address: adress,
    });
    id = _id;
  }

  const result = section
    ? type
      ? await listNotificationsByFilter(
          { residential_complex, type, building_id: id },
          { skip, limit }
        )
      : await listNotificationsByFilter(
          { residential_complex, building_id: id },
          { skip, limit }
        )
    : type
    ? await listNotificationsByFilter(
        { residential_complex, type, building_id: { $exists: false } },
        { skip, limit }
      )
    : await listNotificationsByFilter(
        { residential_complex, building_id: { $exists: false } },
        { skip, limit }
      );

  res.json(result);
};

export default {
  createNotification: ctrlWrapper(createNotification),
  getNotifications: ctrlWrapper(getNotifications),
  getNotificationsByRole: ctrlWrapper(getNotificationsByRole),
};
