import axios from "axios";

import { ResidentialComplex } from "@/entities/residentialComplex/residentialComplex.types";

export const fetchResidentialComplexList = (): Promise<ResidentialComplex[]> =>
    axios.get("/api/residential_complex").then((response) => response.data);
