import Complex from "../models/Complex";
import Building from "../models/Building";
import Apartment from "../models/Apartment";

export function createComplex(complex) {
    Complex.create(complex);
}

export function createBuilding(building) {
    Building.create(building);
}

export function createApartment(apartment) {
    Apartment.create(apartment);
}