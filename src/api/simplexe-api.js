import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_HOST_URL;



// const instance  = axios.create(
//     {
//         baseURL: process.env.VUE_APP_HOST_URL
//     }
// );


export const retrieveProgrammeLineaire = (programmeLineaireID) => {
    return axios.get(`/simplexe/${programmeLineaireID}`);
}



export const fetchAllProgrammeLineaire = () => {
    return axios.get('/simplexe/all');
}


export const getAllTableauxByProgLineaire = (progLineaireID) => {
    return axios.get(`/simplexe/tableau/all/${progLineaireID}`);
}

export const getInterpretationByProgLineaire = (progLineaireID) => {
    return axios.get(`/simplexe/interpretation/${progLineaireID}`);
}

export const postAllProgrammeLineaire = (simplexeData) => {
    return axios.post('/simplexe/saveall', simplexeData);
}


