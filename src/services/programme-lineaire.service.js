import {
  postAllProgrammeLineaire,
  retrieveProgrammeLineaire,
} from "../api/simplexe-api";

export const getProgrammeLineaire = (programmeLineaireID) => {
  return retrieveProgrammeLineaire(programmeLineaireID)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllProgrammeLineaire = () => {};

export const saveProgrammeLineaire = (simplexeData) => {
  return postAllProgrammeLineaire(simplexeData)
    .then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        return response;
        // redirect to the result page with the id
      }
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
