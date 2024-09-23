import Complex from "../models/Complex.js";
import Building from "../models/Building.js";
import Apartment from "../models/Apartment.js";

export async function createComplex(complex) {
  const res = await Complex.create(complex);
  return res._id;
}

export async function createBuilding(building) {
  const res = await Building.create(building);
  return res._id;
}

export async function createApartment(apartment) {
  const res = await Apartment.create(apartment);
  return res._id;
}

export async function getAllComplexes() {
  return await Complex.find();
}

export async function deleteAllComplexes() {
  await Complex.deleteMany({});
  await Building.deleteMany({});
  await Apartment.deleteMany({});
  // TODO delete relevant images
}

export function getApartment(filter) {
  return Apartment.find(filter);
}
