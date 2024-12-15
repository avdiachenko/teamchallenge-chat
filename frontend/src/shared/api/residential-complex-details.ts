import axios from "axios";

import { ResidentialComplexDetails } from "@/entities/residentialComplex/residentialComplex.types";

export const fetchResidentialComplexDetails = (id: string): Promise<ResidentialComplexDetails> =>
    axios.get(`/api/residential_complex/${id}`).then((response) => response.data);
