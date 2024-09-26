export interface ResidentialComplex {
  _id: string;
  name: string;
  images: string;
  parking: boolean;
  security: boolean;
  access_control: boolean;
  concierge: boolean;
  playground: boolean;
  closed_area: boolean;
  video_surveillance: boolean;
  description: string;
  floors: number;
  entrances: number;
  location: string;
}

export interface ResidentialComplexDetails {
  _id: string;
  name: string;
  images: string;
  parking: boolean;
  security: boolean;
  access_control: boolean;
  concierge: boolean;
  playground: boolean;
  closed_area: boolean;
  video_surveillance: boolean;
  description: string;
  floors: number;
  entrances: number;
  location: string;
  sections: number;
  apartments: number;
}
