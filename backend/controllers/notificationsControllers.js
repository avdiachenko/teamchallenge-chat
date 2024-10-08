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
  const { residential_complex } = user;
  const { text, type, section } = req.body;
  let building_id;

  if (user.role !== "moderator" && user.role !== "administrator") {
    throw HttpError(403, "You don't have access to this action!");
  }
  if (section) {
    const adress = section.toLowerCase();
    const [{ _id: residential_complex_id }] = await getComplex({
      name: residential_complex,
    });

    const [{ _id }] = await getBuilding({
      residential_complex_id,
      address: adress,
    });

    building_id = _id;
  }

  const result = section
    ? await addNotification({ text, type, residential_complex, building_id })
    : await addNotification({ text, type, residential_complex });
  res.status(201).json(result);
};

const getNotifications = async (req, res) => {
  console.log(req.query);
  const user = req.user;
  console.log(user.role);
  if (user.role === "not_verified") {
    throw HttpError(403, "You don't have access to this action!");
  }
  const { residential_complex, apartment_id } = user;
  const { page = 1, limit = 20, type = "", building = false } = req.query;
  const skip = (page - 1) * limit;
  let _id;
  if (building) {
    const [{ building_id }] = await getApartment(apartment_id);
    _id = building_id;
  }

  const result = building
    ? type
      ? await listNotificationsByFilter(
          { residential_complex, type, building_id: _id },
          { skip, limit }
        )
      : await listNotificationsByFilter(
          { residential_complex, building_id: _id },
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

const getNotificationsByRole = async (req, res) => {
  console.log(req.query);
  const user = req.user;
  const { residential_complex } = user;
  const { page = 1, limit = 20, type = "", section = "" } = req.query;
  const skip = (page - 1) * limit;
  let _id;
  if (section) {
    const adress = section.toLowerCase();
    const { _id: residential_complex_id } = getComplex({
      name: residential_complex,
    });
    const [{ _id }] = await getBuilding({
      residential_complex_id,
      address: adress,
    });
  }

  const result = building
    ? type
      ? await listNotificationsByFilter(
          { residential_complex, type, building_id: _id },
          { skip, limit }
        )
      : await listNotificationsByFilter(
          { residential_complex, building_id: _id },
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
};
