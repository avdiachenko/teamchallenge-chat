import mongoose from "mongoose";
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

export function getComplex(filter) {
  return Complex.find(filter);
}

export async function getComplexBuldings(complex_id) {
  const addresses = await Building.where({ residential_complex_id: complex_id }).select("address -_id");
  const addressesArray = addresses.map(a => a.address);
  return addressesArray;
}

export function getComplexBuldingCount(complex_id) {
  return Building.where({ residential_complex_id: complex_id }).countDocuments();
}

export async function getComplexApartmentCount(complex_id) {
  // const buildings = await Building.where({ residential_complex_id: complex_id }).find();
  // let count = 0;
  // for (const building of buildings) {    
  //   count += await Apartment.where({ building_id: building._id }).countDocuments();
  // }
  // return count;

  const apartmentCounts = await Building.aggregate()
    .match({ residential_complex_id: { $eq: complex_id.toString() } })
    .addFields({ _idString: { $toString: "$_id" }})
    .lookup({
      from: "apartments", // collection name in db
      "localField": "_idString",
      "foreignField": "building_id",
      as: "apartments"
    })
    .group({
      _id: null,
      count: { $sum: { $size: "$apartments" } }
    });
  const apartmentCount = apartmentCounts[0];
  console.log(apartmentCount);
  return apartmentCount.count;
}

export function getBuilding(filter) {
  return Building.find(filter);
}
